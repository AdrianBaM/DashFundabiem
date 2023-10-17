import React, { useState, useEffect } from 'react';
import { Client } from 'paho-mqtt';
import axios from 'axios';
import image1 from '../assets/imagen1.png';
import image2 from '../assets/imagen2.png';
import image3 from '../assets/imagen3.png';
import { createTask } from '../api/tasks.api';

export function Home() {
  const [pulsoCardiaco, setPulsoCardiaco] = useState(null);
  useEffect(() => {
    const client = new Client('ws://192.168.1.76:9001/', 'dash-client');

    client.onConnectionLost = (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log(`Conexión perdida: ${responseObject.errorMessage}`);
      }
    };

    client.onMessageArrived = (message) => {
        console.log(`Mensaje recibido en el tema ${message.destinationName}: ${message.payloadString}`);
        
        // Extrae la cadena de pulso directamente
        const pulsoPart = message.payloadString.split('Pulso: ')[1];
      
        setPulsoCardiaco(pulsoPart);
    };

    client.connect({
      onSuccess: () => {
        console.log('Conexión al broker MQTT exitosa');
        client.subscribe('g1/pulso');
      },
      useSSL: false,
      userName: 'esdras',
      password: 'grupo10',
    });

    return () => {
      client.disconnect();
    };
  }, []);
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

  const iniciarTerapia = (index, dispositivo) => {
    const updatedCards = [...cards];
    updatedCards[index].state = 2;
    updatedCards[index].dispositivo = dispositivo;
    setCards(updatedCards);

    const tiempo = cards[index].tiempo;
    const tiempoEnMinutos = parseInt(tiempo, 10);
    const tiempoEnSegundos = tiempoEnMinutos * 60;

    updatedCards[index].displayTime = tiempo + ':00';
    updatedCards[index].tiempoRestante = tiempoEnSegundos;
    updatedCards[index].temporizadorActivo = true;
    setCards(updatedCards);
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
        const updatedCards = [...cards];
        updatedCards[index].temporizadorActivo = false;
        setCards(updatedCards);
      }
    });

    return () => {
      intervalIds.forEach((intervalId) => clearInterval(intervalId));
    };
  }, [cards]);

  const [state, setState] = useState(1);

  const handleSliderChange = () => {
    setState((prevState) => {
      if (prevState === 1) return 2;
      else if (prevState === 2) return 3;
      else return 1;
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
                Iniciar
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
                    placeholder="Tiempo"
                    value={card.tiempo}
                    onChange={(e) => {
                      const updatedCards = [...cards];
                      updatedCards[index].tiempo = e.target.value;
                      setCards(updatedCards);
                    }}
                  />
                </div>
                <div className="buttons-column">
                  <button className="iniciar" onClick={() => iniciarTerapia(index)}>
                    Iniciar
                  </button>
                  <button className="cancelar" onClick={() => cancelarProceso(index)}>
                    Cancelar
                  </button>
                </div>
              </div>
            )}
            {card.state === 2 && (
              <>
                <div className="numero-paciente">Código de paciente: {card.numeroPaciente}</div>
                <br /> <br />
                <button className="parar" onClick={() => pararTerapia(index)}>
                  Parar
                </button>
              </>
            )}
          </div>
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
              <button className="abrir" onClick={() => abrirAlgo(index)}>
                Abrir
              </button>
              <button className="cerrar" onClick={() => cerrarAlgo(index)}>
                Cerrar
              </button>
            </div>
          </div>
          <div className="timer">
            Tiempo restante: {Math.floor(card.tiempoRestante / 3600)}:{Math.floor((card.tiempoRestante % 3600) / 60)}:{card.tiempoRestante % 60 < 10 ? '0' : ''}{card.tiempoRestante % 60}
          </div>
          <div className="pulso-cardiaco">
            Pulso Cardiaco: {pulsoCardiaco !== null ? pulsoCardiaco : 'Cargando...'}
          </div>
        </div>
      ))}
    </div>
  );
}
             
