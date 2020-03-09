import React from 'react';
import './index.scss';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const Homepage = () => (
    <>
        <div className="welcome-container">
            <img src={logo} alt="AzulSchoolLogo"/>
            <p className="welcome-text">
                Bienvenido a la plataforma de películas más grande
                de toda Azul School.
            </p>
                <button className="welcome-button">
                    <Link to="/peliculas">
                        Ver películas
                    </Link>
                </button>
        </div>
    </>
)

export default Homepage;