import React from 'react';
import { Link } from 'react-router-dom';
import "../index.css";
import image1 from '../assets/Logo-Meso-Color_medio.png';
import image2 from '../assets/FUNDABIEM.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons';

export function Navigation() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <img src={image1} alt="Logo" className="custom-image" />
        </li>
        <li>
          <FontAwesomeIcon icon={faTachometerAlt} />
          <Link to="/tasks-dash">Panel de control</Link>
        </li>
        <li>
          <FontAwesomeIcon icon={faBook} /> 
          <Link to="/tasks">Bitácora</Link>
        </li>
        <li>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <Link to="/tasks-search">Búsqueda</Link>
        </li>
        <li>
          <FontAwesomeIcon icon={faUser} />
          <Link to="/about">Acerca de</Link>
        </li>
        <li>
          <img src={image2} alt="Logo" className="custom-image2" />
        </li>
      </ul>
    </nav>
  );
}