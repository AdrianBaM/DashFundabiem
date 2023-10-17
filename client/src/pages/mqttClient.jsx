import React, { useEffect, useState } from 'react';
import { Client } from 'paho-mqtt';

export function MqttClient() {
  const [pulsoCardiaco, setPulsoCardiaco] = useState('Conectando...'); // Inicializar con un mensaje de "Conectando..."

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

  return (
    <div>
      <p>
        {pulsoCardiaco}
      </p>
    </div>
  );
}
