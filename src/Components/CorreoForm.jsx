import React, { useState } from 'react';
import axios from '../axiosConfig';

const CorreoForm = ({ onCorreoAgregado }) => {
    const [email, setEmail] = useState('');

    const handleAgregarCorreo = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/mails', { email });
            onCorreoAgregado();
            setEmail('');
        } catch (error) {
            console.error('Error al agregar correo:', error);
        }
    };

    return (
        <form onSubmit={handleAgregarCorreo} className="mb-4">
            <div className="input-group">
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ingrese la dirección de correo..."
                    required
                />
                <button type="submit" className="btn btn-primary ms-2">Agregar</button>
            </div>
        </form>
    );
};

export default CorreoForm;





