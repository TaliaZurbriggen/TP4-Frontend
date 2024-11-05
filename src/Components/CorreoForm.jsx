import React, { useState } from 'react';
import axios from 'axios';

function CorreoForm({ onCorreoAdded }) {
    const [correo, setCorreo] = useState('');

    const handleAgregarCorreo = async () => {
        try {
            await axios.post('/api/mails', { correo });
            onCorreoAdded(); 
            setCorreo('');
        } catch (error) {
            console.error('Error al agregar correo:', error);
        }
    };

    return (
        <div>
            <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="Ingrese la dirección de correo..."
            />
            <button onClick={handleAgregarCorreo}>Agregar</button>
        </div>
    );
}

export default CorreoForm;