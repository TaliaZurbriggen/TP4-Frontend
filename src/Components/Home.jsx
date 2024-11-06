import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

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
                const nuevasFechas = sortedData.map(item =>
                    new Date(item.fecha).toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' })
                );
                const nuevasDistancias = sortedData.map(item =>
                    Math.min(Math.round((item.distancia_promedio / 200) * 100), 100)
                );

                setFechas(nuevasFechas);
                setDistancias(nuevasDistancias);

                const ultimoRegistro = nuevasDistancias[nuevasDistancias.length - 1];
                setEstadoTacho(ultimoRegistro);
            } catch (error) {
                console.error('Error al obtener datos de la API:', error);
            }
        };

        fetchData();
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
