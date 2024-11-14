import React, { createContext, useState, useContext, useCallback } from 'react';
import axios from '../axiosConfig';

// Crear el contexto
const CorreoContext = createContext();

// Proveedor del contexto
export const CorreoProvider = ({ children }) => {
    const [correos, setCorreos] = useState([]);

    // Usa useCallback para memorizar la función fetchCorreos
    const fetchCorreos = useCallback(async () => {
        try {
            const response = await axios.get('/mails');
            setCorreos(response.data);
        } catch (error) {
            console.error('Error al obtener correos:', error);
        }
    }, []);  // El segundo argumento vacío asegura que no se re-cree

    const agregarCorreo = async (email) => {
        try {
            await axios.post('/mails', { email });
            fetchCorreos();  // Actualiza la lista de correos después de agregar
        } catch (error) {
            console.error('Error al agregar correo:', error);
        }
    };

    const eliminarCorreo = async (id) => {
        try {
            await axios.delete(`/mails/${id}`);
            fetchCorreos(); // Refresca la lista después de eliminar
        } catch (error) {
            console.error('Error al eliminar correo:', error);
        }
    };

    return (
        <CorreoContext.Provider value={{ correos, fetchCorreos, agregarCorreo, eliminarCorreo }}>
            {children}
        </CorreoContext.Provider>
    );
};

export const useCorreo = () => useContext(CorreoContext);
