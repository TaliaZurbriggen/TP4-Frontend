import React, { useState } from 'react';
import axios from 'axios';

const Notificaciones = () => {
  const [umbral, setUmbral] = useState('');

  const handleUmbralChange = (event) => {
    setUmbral(event.target.value);
  };

  const enviarNotificacion = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/notificaciones', { umbral });
      alert(response.data.message); 
    } catch (error) {
      console.error('Error al enviar notificación:', error);
      alert('Hubo un error al enviar la notificación.');
    }
  };

  return (
    <div>
      <h2>Notificaciones</h2>
      <p>Introduce el umbral deseado para enviar la notificación:</p>
      <input
        type="number"
        value={umbral}
        onChange={handleUmbralChange}
        placeholder="Umbral para notificación (%)"
      />
      <button onClick={enviarNotificacion}>Enviar Notificación</button>
    </div>
  );
};

export default Notificaciones;


