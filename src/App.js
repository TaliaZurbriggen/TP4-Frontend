import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx';
import CorreosPage from './Components/CorreosPage.jsx';
import Home from './Components/Home.jsx'; 

function App() {
    const [actualizar, setActualizar] = useState(false);

    const handleCorreoAgregado = () => {
        setActualizar(!actualizar);  // Cambia el estado para actualizar la lista
    };

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/correos" element={<CorreosPage onCorreoAgregado={handleCorreoAgregado} actualizar={actualizar} />} />
                <Route path="/estado" element={<Home />} /> 
            </Routes>
        </Router>
    );
}

export default App;



