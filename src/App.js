import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import CorreosPage from './Components/CorreosPage';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/correos" element={<CorreosPage />} />
        <Route path="/notificaciones" element={<h2>Página de Notificaciones</h2>} />
        <Route path="/historial" element={<h2>Página de Historial</h2>} />
        <Route path="/estado" element={<h2>Página de Estado Actual</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
