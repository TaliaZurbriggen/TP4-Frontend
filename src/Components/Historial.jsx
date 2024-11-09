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
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h1 className="text-center mb-4">Historial de Notificaciones</h1>
        <div className="mb-4">
          <label className="form-label fw-bold">Fecha de Inicio:</label>
          <input
            type="date"
            className="form-control"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </div>
        {notificaciones.length > 0 ? (
          <table className="table table-striped table-bordered shadow">
            <thead className="table-dark">
              <tr>
                <th>Contenido</th>
                <th>Fecha</th>
                <th>Enviado a</th>
              </tr>
            </thead>
            <tbody>
              {notificaciones.map((notificacion) => (
                <tr key={notificacion.id}>
                  <td>{notificacion.contenido}</td>
                  <td>{formatearFecha(notificacion.fecha)}</td>
                  <td>{notificacion.Empleado?.email || 'No disponible'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-muted mt-4">No se encontraron notificaciones.</p>
        )}
      </div>
    </div>
  );
};

export default Historial;





