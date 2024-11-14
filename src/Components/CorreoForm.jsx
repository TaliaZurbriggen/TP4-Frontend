import React, { useState } from 'react';
import { useCorreo } from '../contexts/CorreoContext';  

const CorreoForm = () => {
    const [email, setEmail] = useState('');
    const { agregarCorreo } = useCorreo();  

    const handleAgregarCorreo = async (e) => {
        e.preventDefault();
        await agregarCorreo(email);  
        setEmail('');  
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






