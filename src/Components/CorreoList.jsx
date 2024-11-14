import React, { useEffect } from 'react';
import { useCorreo } from '../contexts/CorreoContext';  // Importa el hook del contexto

const CorreoList = () => {
    const { correos, fetchCorreos, eliminarCorreo } = useCorreo();  // Obtén los correos y funciones

    useEffect(() => {
        fetchCorreos();  // Obtén los correos al montar el componente
    }, [fetchCorreos]);  // Al estar memoizada, no se ejecutará infinitamente

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
                                        onClick={() => eliminarCorreo(correo.id)}
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












