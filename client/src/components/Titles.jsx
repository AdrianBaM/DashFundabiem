import React from 'react';
import { Link } from 'react-router-dom';
import "../index.css";
import image1 from '../assets/Meso.png';
import image2 from '../assets/FUNDABIEM.png';

export function Navigation() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <img src={image1} alt="Logo" className="custom-image" />
        </li>
        <li>
          <Link to="/tasks">Historial</Link>
        </li>
        <li>
          <Link to="/tasks-dash">Dashboard</Link>
        </li>
        <li>
          <Link to="/tasks-mqtt">MQTT</Link>
        </li>
        <li>
          <img src={image2} alt="Logo" className="custom-image2" />
        </li>
      </ul>
    </nav>
  );
}