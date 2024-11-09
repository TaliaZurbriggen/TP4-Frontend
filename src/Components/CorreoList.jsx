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
            fetchCorreos();
        } catch (error) {
            console.error('Error al eliminar correo:', error);
        }
    };

    useEffect(() => {
        fetchCorreos();
    }, [actualizar]);

    return (
        <div className="mt-4">
            <h3 className="mb-3">Lista de Correos</h3>
            <table className="table table-striped table-bordered shadow">
                <thead className="table-dark">
                    <tr>
                        <th>Correo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {correos.length > 0 ? (
                        correos.map((correo) => (
                            <tr key={correo.id}>
                                <td>{correo.email}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleEliminarCorreo(correo.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" className="text-center">No hay correos disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CorreoList;









