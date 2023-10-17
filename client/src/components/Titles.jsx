import React from 'react';
import { Link } from 'react-router-dom';
import "../index.css";
import image1 from '../assets/Meso.png';
import image2 from '../assets/FUNDABIEM.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

export function Navigation() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <img src={image1} alt="Logo" className="custom-image" />
        </li>
        <li>
          <FontAwesomeIcon icon={faBook} /> {/* Muestra el ícono */}
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