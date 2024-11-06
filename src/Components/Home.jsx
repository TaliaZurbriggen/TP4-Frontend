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
                const response = await fetch('http://localhost:4000/api/basurero/datos-sheet'); // Corrige la URL aquí
                
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();

                const sortedData = data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
                const nuevasFechas = sortedData.map(item => new Date(item.fecha).toLocaleString());
                
                // Convertir la distancia promedio en porcentaje de llenado, limitado entre 0 y 100
                const nuevasDistancias = sortedData.map(item => {
                    const porcentajeLlenado = 100 - (item.distancia_promedio / 200) * 100;
                    return Math.max(0, Math.min(100, porcentajeLlenado));
                });

                setFechas(nuevasFechas);
                setDistancias(nuevasDistancias);

                const ultimoRegistro = nuevasDistancias[nuevasDistancias.length - 1];
                setEstadoTacho(Math.round(ultimoRegistro));
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
        <div className="home">
            <div className="contenido">
                <div className="estado-actual">
                    <h2>Estado actual:</h2>
                    <img
                        src="./tacho.png"
                        alt="Icono del tacho de basura"
                        style={{
                            filter: `grayscale(${100 - estadoTacho}%)`
                        }}
                    />
                    <p>El tacho de basura se encuentra a un {estadoTacho}%</p>
                </div>
                <div className="grafico">
                    <Line data={data} options={options} />
                </div>
            </div>
        </div>
    );
}

export default Home;


