import React from 'react';
import { Link } from 'react-router-dom';
import "../index.css";
import image1 from '../assets/Logo-Meso-Color_medio.png';
import image2 from '../assets/FUNDABIEM.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons';

export function About() {
    return (
      <div className="about-section">
        <h1>Adrian Barragan</h1>
        <h1>Esdras Palacios</h1>
        <h1>Jousué Ulin</h1>
        <h1>Luis Ventura</h1>
      </div>
    );
  }