import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            <ul className="navbar-links">
                <li><Link to="/correos">Correos</Link></li>
                <li><Link to="/historial">Historial</Link></li>
                <li><Link to="/estado">Estado Actual</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;

