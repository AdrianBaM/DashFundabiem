import React, { useEffect } from 'react';
import { connect } from 'mqtt';

export function HeartRateMonitor() {

  const brokerUrl = 'ws://192.168.1.76:1883';

  const client = connect(brokerUrl);
  
  client.on('connect', () => {
    console.log('Conexión MQTT establecida.');
  });
  
  client.on('error', (error) => {
    console.error('Error de conexión MQTT:', error);
  });

  return (
    <div>
      <p>Verifica la consola del navegador para ver si se ha conectado al broker MQTT.</p>
    </div>
  );
}