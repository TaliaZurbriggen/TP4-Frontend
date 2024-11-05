import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

const CorreoList = ({ actualizar }) => {
    const [correos, setCorreos] = useState([]);

    const fetchCorreos = async () => {
        try {
            const response = await axios.get('/mails');
            setCorreos(response.data);
        } catch (error) {
            console.error('Error al obtener correos:', error);
        }
    };

    const handleEliminarCorreo = async (id) => {
        try {
            await axios.delete(`/mails/${id}`);
            fetchCorreos(); // Actualiza la lista después de eliminar
        } catch (error) {
            console.error('Error al eliminar correo:', error);
        }
    };

    useEffect(() => {
        fetchCorreos();
    }, [actualizar]);

    return (
        <div>
            <h2>Lista de correos</h2>
            <table>
                <thead>
                    <tr>
                        <th>Correo</th>
                        
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {correos.map((correo) => (
                        <tr key={correo.id}>
                            <td>{correo.email}</td>
                            
                            <td><button onClick={() => handleEliminarCorreo(correo.id)}>Eliminar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CorreoList;








