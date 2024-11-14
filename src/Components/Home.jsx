import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import '../App.css';

function Home() {
    const [estadoTacho, setEstadoTacho] = useState(0);
    const [fechas, setFechas] = useState([]);
    const [distancias, setDistancias] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/basurero/datos-sheet');
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                const sortedData = data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

                // Seleccionamos directamente los últimos 12 registros
                const fechasSeleccionadas = sortedData.slice(-12).map(item =>
                    new Date(item.fecha).toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' })
                );
                const distanciasSeleccionadas = sortedData.slice(-12).map(item => {
                    if (item.distancia_promedio > 40) {
                        return 100;  // Basurero lleno
                    } else {
                        return Math.min(Math.round((1 - item.distancia_promedio / 40) * 100), 100);
                    }
                });

                setFechas(fechasSeleccionadas);
                setDistancias(distanciasSeleccionadas);

                if (distanciasSeleccionadas.length > 0) {
                    setEstadoTacho(distanciasSeleccionadas[distanciasSeleccionadas.length - 1]);
                }
            } catch (error) {
                console.error('Error al obtener datos de la API:', error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 30000);

        return () => clearInterval(interval); 
    }, []); 

    const data = {
        labels: fechas,
        datasets: [
            {
                label: 'Tendencia del llenado (%)',
                data: distancias,
                borderColor: 'rgb(255, 99, 132)',
                fill: false,
                tension: 0.1
            }
        ]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                max: 100
            }
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2>Estado actual:</h2>
                <div style={{
                    position: 'relative',
                    width: '320px',
                    height: '400px',
                    margin: '0 auto'
                }}>
                    <img
                        src="tacho.png"
                        alt="Icono del tacho de basura"
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'block'
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '0',
                            left: '0',
                            width: '100%',
                            height: `${estadoTacho}%`,
                            backgroundColor: 'rgba(255, 0, 0, 0.5)',
                            transition: 'height 0.3s ease'
                        }}
                    ></div>
                </div>
                <p>El tacho de basura se encuentra a un {estadoTacho}%</p>
            </div>
            <div style={{ width: '80%', maxWidth: '800px', margin: '20px auto' }}>
                <Line data={data} options={options} />
            </div>
        </div>
    );
}

export default Home;





