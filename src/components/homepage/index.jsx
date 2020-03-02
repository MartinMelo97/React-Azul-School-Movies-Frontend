import React from 'react';
import './index.scss';
import logo from '../../assets/logo.png'

const Homepage = () => (
    <>
        <div className="welcome-container">
            <img src={logo} alt="AzulSchoolLogo"/>
            <p className="welcome-text">
                Bienvenido a la plataforma de películas más grande
                de toda Azul School
            </p>
            <button className="welcome-button">Ver películas</button>
        </div>
    </>
)

export default Homepage;