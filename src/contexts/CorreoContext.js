import React, { createContext, useState, useContext, useCallback } from 'react';
import axios from '../axiosConfig';


const CorreoContext = createContext();


export const CorreoProvider = ({ children }) => {
    const [correos, setCorreos] = useState([]);


    const fetchCorreos = useCallback(async () => {
        try {
            const response = await axios.get('/mails');
            setCorreos(response.data);
        } catch (error) {
            console.error('Error al obtener correos:', error);
        }
    }, []);  

    const agregarCorreo = async (email) => {
        try {
            await axios.post('/mails', { email });
            fetchCorreos();  
        } catch (error) {
            console.error('Error al agregar correo:', error);
        }
    };

    const eliminarCorreo = async (id) => {
        try {
            await axios.delete(`/mails/${id}`);
            fetchCorreos(); 
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
