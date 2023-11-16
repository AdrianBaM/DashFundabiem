import React from 'react';
import { Link } from 'react-router-dom';
import "../index.css";
import image1 from '../assets/Meso.png';
import imageAdrian from '../assets/imageAdrian.jpg';
import imageJosue from '../assets/imageJouse.jpg';
import imageLuis from '../assets/imageLuis.jpg';
import imageEsdras from '../assets/imageEsdras.jpg';

export function About() {
  return (
    <div className="about-section">
      <div className="header">
        <img src={image1} alt="Logo" />
        <div>v2023.11.17</div>
        <div>Grupo 10</div>
        <h1>Nuestro Equipo</h1>
      </div>
      <div className="team">
        <div className="member">
          <img src={imageAdrian} alt="Adrian" />
          <h2>Adrian Barragan</h2>
        </div>
        <div className="member">
          <img src={imageEsdras} alt="Esdras" />
          <h2>Esdras Palacios</h2>
        </div>
        <div className="member">
          <img src={imageJosue} alt="Jousué" />
          <h2>Jousué Ulin</h2>
        </div>
        <div className="member">
          <img src={imageLuis} alt="Luis" />
          <h2>Luis Ventura</h2>
        </div>
      </div>
    </div>
  );
}
