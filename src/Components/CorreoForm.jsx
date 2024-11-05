import React, { useState } from 'react';
import axios from '../axiosConfig';

const CorreoForm = ({ onCorreoAgregado }) => {
    const [email, setEmail] = useState('');

    const handleAgregarCorreo = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/mails', { email });
            onCorreoAgregado(); // Llama a la función para actualizar la lista
            setEmail(''); // Limpia el campo de entrada
        } catch (error) {
            console.error('Error al agregar correo:', error);
        }
    };

    return (
        <form onSubmit={handleAgregarCorreo}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingrese la dirección de correo..."
                required
            />
            <button type="submit">Agregar</button>
        </form>
    );
};

export default CorreoForm;





