import React, { useState, useEffect } from 'react';
import { Client, Message  } from 'paho-mqtt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faBan, faHeart, faStop, faStopwatch, faSync } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import image1 from '../assets/imagen1.png';
import image2 from '../assets/imagen2.png';
import image3 from '../assets/imagen3.png';
import { createTask } from '../api/tasks.api';

export function Home() {
  const [pulsosCardiacos, setPulsosCardiacos] = useState({
    g1: null,
    g2: null,
    g3: null,
  });
  const [client, setClient] = useState(null);

  useEffect(() => {
    const client = new Client('ws://192.168.1.100:9001/', 'dash-client');

    client.onConnectionLost = (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log(`Conexión perdida: ${responseObject.errorMessage}`);
      }
    };

    client.onMessageArrived = (message) => {
      console.log(`Mensaje recibido en el tema ${message.destinationName}: ${message.payloadString}`);

      // Extrae la cadena de pulso directamente
      const pulsoPart = message.payloadString.split('Pulso: ')[1];

      // Actualiza el estado de acuerdo con el tema del mensaje
      if (message.destinationName === 'g1/pulso') {
        setPulsosCardiacos((prevState) => ({
          ...prevState,
          g1: pulsoPart,
        }));
      } else if (message.destinationName === 'g2/pulso') {
        setPulsosCardiacos((prevState) => ({
          ...prevState,
          g2: pulsoPart,
        }));
      } else if (message.destinationName === 'g3/pulso') {
        setPulsosCardiacos((prevState) => ({
          ...prevState,
          g3: pulsoPart,
        }));
      }
      if (message.destinationName === 'g3/contador') {
        const contadorValue = parseInt(message.payloadString, 10); // Parsear el valor a entero
        const updatedCards = [...cards];
        updatedCards[2].conteoVueltas = contadorValue; // Actualizar el estado con el valor recibido
        setCards(updatedCards);
      }
    };

    client.connect({
      onSuccess: () => {
        console.log('Conexión al broker MQTT exitosa');
        try {
          client.subscribe('g3/pulso');
          client.subscribe('g1/pulso');
          client.subscribe('g2/pulso');
          client.subscribe('g3/contador'); 
        } catch (error) {
          console.error('Error durante la suscripción MQTT:', error);
        }
      },
      useSSL: false,
      //userName: 'uttaMeso',
      //password: '3829jxa2',

      userName: 'esdras',
      password: 'grupo10',
    });

    setClient(client);

    return () => {
      client.disconnect();
    };
  }, []);
  
  const abrir = (index) => {
    if (client) {
      const message = new Message('A');
      message.destinationName = `g${index + 1}/control`;
      client.send(message);
    }
  };
  
  const cerrar = (index) => {
    if (client) {
      const message = new Message('C');
      message.destinationName = `g${index + 1}/control`;
      client.send(message);
    }
  };

  const iniciar = () => {
    if (client) {
      const message = new Message('I');
      message.destinationName = 'g3/control';
      client.send(message);
    }
  };
  
  const [cards, setCards] = useState([
    {
      state: 0,
      numeroPaciente: '',
      tiempo: '',
      displayTime: '',
      tiempoRestante: 0,
      temporizadorActivo: false,
      dispositivo: 0,
    },
    {
      state: 0,
      numeroPaciente: '',
      tiempo: '',
      displayTime: '',
      tiempoRestante: 0,
      temporizadorActivo: false,
      dispositivo: 0,
    },
    {
      state: 0,
      numeroPaciente: '',
      tiempo: '',
      displayTime: '',
      tiempoRestante: 0,
      temporizadorActivo: false,
      dispositivo: 0,
      conteoVueltas: '',
    },
  ]);
  const images = [image1, image2, image3];

  const borrarValores = (index) => {
    const updatedCards = [...cards];
    updatedCards[index] = {
      state: 0,
      numeroPaciente: '',
      tiempo: '',
      displayTime: '',
      tiempoRestante: 0,
      temporizadorActivo: false,
    };
    setCards(updatedCards);
  };

  const iniciarProceso = (index) => {
    const updatedCards = [...cards];
    updatedCards[index].state = 1;
    setCards(updatedCards);
  };

  const cancelarProceso = (index) => {
    const updatedCards = [...cards];
    updatedCards[index].state = 0;
    setCards(updatedCards);
  };

  const iniciarTerapia = (index) => {
    const updatedCards = [...cards];
    updatedCards[index].state = 2;
    updatedCards[index].dispositivo = index === 2 ? 9 : index === 1 ? 8 : 7;
    setCards(updatedCards);
  
    const tiempo = cards[index].tiempo;
    const tiempoEnMinutos = parseInt(tiempo, 10);
    const tiempoEnSegundos = tiempoEnMinutos * 60;
  
    updatedCards[index].displayTime = tiempo + ':00';
    updatedCards[index].tiempoRestante = tiempoEnSegundos;
    updatedCards[index].temporizadorActivo = true;
    setCards(updatedCards);
  
    if (client) {
      const message = new Message('I');
      const destination = index === 2 ? 'g3/control' : index === 1 ? 'g2/control' : 'g1/control';
      message.destinationName = destination;
      client.send(message);
    }
  };

  const pararTerapia = (index) => {
    const updatedCards = [...cards];
    const card = updatedCards[index];
  
    // Recopila los datos relevantes
    const numeroPaciente = card.numeroPaciente;
    const tiempo = card.tiempo;
    let dispositivo = 0; // Por defecto, dispositivo 0
  
    if (index === 0) {
      dispositivo = 7; // ID del Guante Izquierdo
    } else if (index === 1) {
      dispositivo = 8; // ID del Guante Derecho
    } else if (index === 2) {
      dispositivo = 9; // ID de la Rueda de Zennit
    }
  
    // Detiene la terapia
    card.state = 0;
    card.displayTime = '';
    card.temporizadorActivo = false;
    setCards(updatedCards);
  
    // Llama a la función para guardar los datos
    guardarDatos(numeroPaciente, tiempo, dispositivo);
  
    if (client) {
      const message = new Message('F');
      const destination = index === 2 ? 'g3/control' : index === 1 ? 'g2/control' : 'g1/control';
      message.destinationName = destination;
      client.send(message);
    }
  };
  

  const guardarDatos = (numeroPaciente, tiempo, dispositivo) => {
    const fecha = new Date().toISOString();
    const fechaFormateada = fecha.split('T')[0]; // Formatear la fecha
  
    let dispositivoNombre = '';
    if (dispositivo === 7) {
      dispositivoNombre = '1';
    } else if (dispositivo === 8) {
      dispositivoNombre = '2';
    } else if (dispositivo === 9) {
      dispositivoNombre = '3';
    }
  
    const datos = {
      numeroPaciente,
      tiempo: `00:${tiempo}:00`, // Formatear el tiempo
      fecha: fechaFormateada, // Usar la fecha formateada
      Dispositivo: dispositivoNombre,
    };
  
    console.log('Datos a enviar:', datos);
  
    // Llama a la función para guardar los datos en la base de datos
    createTask(datos)
      .then((response) => {
        console.log('Respuesta del servidor:', response);
      })
      .catch((error) => {
        console.error('Error al enviar datos:', error);
      });
  };

  useEffect(() => {
    let intervalIds = [];
  
    cards.forEach((card, index) => {
      if (card.temporizadorActivo && card.tiempoRestante > 0) {
        const intervalId = setInterval(() => {
          const updatedCards = [...cards];
          updatedCards[index].tiempoRestante -= 1;
          setCards(updatedCards);
        }, 1000);
        intervalIds.push(intervalId);
      } else if (card.temporizadorActivo && card.tiempoRestante === 0) {
        // Aquí agregamos la misma lógica que en pararTerapia
        const updatedCards = [...cards];
        const numeroPaciente = card.numeroPaciente;
        const tiempo = card.tiempo;
        let dispositivo = 0;
  
        if (index === 0) {
          dispositivo = 7;
        } else if (index === 1) {
          dispositivo = 8;
        } else if (index === 2) {
          dispositivo = 9;
        }
  
        updatedCards[index].state = 0;
        updatedCards[index].displayTime = '';
        updatedCards[index].temporizadorActivo = false;
        setCards(updatedCards);
  
        guardarDatos(numeroPaciente, tiempo, dispositivo);
  
        if (client) {
          const message = new Message('F');
          const destination = index === 2 ? 'g3/control' : index === 1 ? 'g2/control' : 'g1/control';
          message.destinationName = destination;
          client.send(message);
        }
  
        // Llamamos a la función borrarValores
        borrarValores(index);
      }
    });
  
    return () => {
      intervalIds.forEach((intervalId) => clearInterval(intervalId));
    };
  }, [cards]);

  const [state, setState] = useState(1);

  const handleSliderChange = () => {
    setState((prevState) => {
      let newState;
  
      if (prevState === 1) newState = 2;
      else if (prevState === 2) newState = 3;
      else newState = 1;
  
      if (client) {
        const message = new Message(newState.toString());
        message.destinationName = 'g1/control'; 
        client.send(message);
      }
  
      return newState;
    });
  };

  return (
  <div className="container">
    {cards.map((card, index) => (
      <div key={index} className={`card ${card.state === 2 ? 'estado-2' : ''} ${card.state === 1 ? 'estado-1' : ''}`}>
        <div className="image">
          <img src={images[index]} alt={`Imagen ${index + 1}`} />
        </div>
        <div className="center">
          {card.state === 0 && (
            <button className="iniciar" onClick={() => iniciarProceso(index)}>
              <FontAwesomeIcon icon={faPlay} /> Iniciar
            </button>
          )}
          {card.state === 1 && (
            <div className="form">
              <div className="input-column">
                <input
                  type="text"
                  placeholder="Número de Paciente"
                  value={card.numeroPaciente}
                  onChange={(e) => {
                    const updatedCards = [...cards];
                    updatedCards[index].numeroPaciente = e.target.value;
                    setCards(updatedCards);
                  }}
                />
                <br /> <br />
                <input
                  type="text"
                  placeholder="Tiempo en minutos"
                  value={card.tiempo}
                  onChange={(e) => {
                    const updatedCards = [...cards];
                    updatedCards[index].tiempo = e.target.value;
                    setCards(updatedCards);
                  }}
                />
              </div>
              <div className="buttons-column">  
                <button className="iniciar" onClick={() => { iniciarTerapia(index)}}>
                  <FontAwesomeIcon icon={faPlay} /> Empezar
                </button>
                <button className="cancelar" onClick={() => cancelarProceso(index)}>
                  <FontAwesomeIcon icon={faBan} /> Cancelar
                </button>
              </div>
            </div>
          )}
          {card.state === 2 && (
            <>
              <div className="numero-paciente">Código de paciente: {card.numeroPaciente}</div>
              <br /> <br />
              <button className="parar" onClick={() => { pararTerapia(index); borrarValores(index); }}>
                <FontAwesomeIcon icon={faStop} /> Parar
              </button>
            </>
          )}
        </div>
        {index < 2 && (
          <div className='form2'>
            <div className="slider-container">
              <div className={`slider-track state-${state}`} onClick={handleSliderChange}>
                <div className="slider-button" />
              </div>
              <div className="state-label">
                {state === 1 && 'Suave'}
                {state === 2 && 'Medio'}
                {state === 3 && 'Fuerte'}
              </div>
            </div>
            <div className="new-row">
              <button className="abrir" onClick={() => abrir(index)}>
                Abrir
              </button>
              <button className="cerrar" onClick={() => cerrar(index)}>
                Cerrar
              </button>
            </div>
          </div>
        )}
        <div className="timer">
          <FontAwesomeIcon icon={faStopwatch} /> {Math.floor(card.tiempoRestante / 3600)}:{Math.floor((card.tiempoRestante % 3600) / 60)}:{card.tiempoRestante % 60 < 10 ? '0' : ''}{card.tiempoRestante % 60}
        </div>
        <div className="pulso-cardiaco">
          <FontAwesomeIcon icon={faHeart} beat /> {pulsosCardiacos[`g${index + 1}`] !== null ? pulsosCardiacos[`g${index + 1}`] : 'Cargando...'} BPM
        </div>
        <div className="conteo-vueltas">
          {card.state === 2 && index === cards.length - 1 && (
            <>
              <FontAwesomeIcon icon={faSync} spin /> Conteo de vueltas: {card.conteoVueltas}
            </>
          )}
        </div>
      </div>
    ))}
  </div>
  );
}
