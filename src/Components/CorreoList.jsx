import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CorreoList() {
    const [correos, setCorreos] = useState([]);

    const fetchCorreos = async () => {
        try {
            const response = await axios.get('/api/mails');
            setCorreos(response.data);
        } catch (error) {
            console.error('Error al obtener correos:', error);
        }
    };

    const handleEliminarCorreo = async (id) => {
        try {
            await axios.delete(`/api/mails/${id}`);
            fetchCorreos();
        } catch (error) {
            console.error('Error al eliminar correo:', error);
        }
    };

    useEffect(() => {
        fetchCorreos();
    }, []);

    return (
        <div>
            <h2>Lista de correos</h2>
            <ul>
                {correos.map((correo) => (
                    <li key={correo.id}>
                        {correo.email}
                        <button onClick={() => handleEliminarCorreo(correo.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CorreoList;
