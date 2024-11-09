import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';

const Historial = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [fechaInicio, setFechaInicio] = useState('');

  useEffect(() => {
    if (fechaInicio) {
      obtenerNotificaciones(fechaInicio);
    }
  }, [fechaInicio]);

  const obtenerNotificaciones = async (fecha) => {
    try {
      const response = await axios.get(`/notificaciones?fechaInicio=${fecha}`);
      console.log('Respuesta del backend:', response.data);
      setNotificaciones(response.data);
    } catch (error) {
      console.error('Error al obtener las notificaciones:', error);
    }
  };

  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div>
      <h1>Historial de Notificaciones</h1>
      <label>
        Fecha de Inicio:
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
        />
      </label>
      <ul>
        {notificaciones.length > 0 ? (
          notificaciones.map((notificacion) => (
            <li key={notificacion.id}>
              {notificacion.contenido} - {formatearFecha(notificacion.fecha)}
              <br />
              <strong>Enviado a:</strong> {notificacion.Empleado?.email || 'No disponible'}
            </li>
          ))
        ) : (
          <p>No se encontraron notificaciones.</p>
        )}
      </ul>
    </div>
  );
};

export default Historial;




