import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss'

const Header = () => {
    return (
        <>
            <header className="header-container">
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/peliculas">Películas</Link></li>
                    <li><Link to="/peliculas/crear">Crear película</Link></li>
                </ul>
                <div className="search-container">
                    <input type="text" name="search" placeholder="Buscar película"/>
                    <button>Buscar</button>
                </div>
            </header>
        </>
    )
};

export default Header;