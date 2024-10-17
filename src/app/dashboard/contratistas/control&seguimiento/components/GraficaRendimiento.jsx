'use client'
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { axioInstance } from '@/app/utils/axioInstance';
import Loading from '@/app/components/Loading';

const RendimientoChart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axioInstance.get('/contratistas/rendimiento'); // Cambia la URL según sea necesario
                setData(data);
            } catch (err) {
                setError('Error al cargar los datos');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <Loading/>;
    if (error) return <div>{error}</div>;

    // Mapear los datos para las series de la gráfica
    const contratistas = data.map(item => item.Contratista);
    const planificado = data.map(item => parseInt(item.Planificado, 10));
    const ejecutado = data.map(item => parseInt(item.Ejecutado, 10));
    const cumplimiento = data.map(item => parseFloat(item.Cumplimiento).toFixed(2));

    return (
        <Plot
            data={[
                {
                    x: contratistas,
                    y: planificado,
                    type: 'bar',
                    name: 'Horas Planificadas',
                    marker: { color: '#1f77b4' }, // Color de barras planificadas
                },
                {
                    x: contratistas,
                    y: ejecutado,
                    type: 'bar',
                    name: 'Horas Ejecutadas',
                    marker: { color: '#2ca02c' }, // Color de barras ejecutadas
                },
                {
                    x: contratistas,
                    y: cumplimiento,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: '% Cumplimiento',
                    yaxis: 'y2',
                    marker: { color: '#ff7f0e' }, // Color de línea de cumplimiento
                },
            ]}
            layout={{
                title: 'Rendimiento de Contratistas',
                barmode: 'group',
                xaxis: {
                    title: 'Contratistas',
                },
                yaxis: {
                    title: 'Horas',
                },
                yaxis2: {
                    title: '% Cumplimiento',
                    overlaying: 'y',
                    side: 'right',
                    range: [0, 100], // Rango de cumplimiento en porcentaje
                },
                margin: { t: 50, l: 50, r: 50, b: 50 },
                showlegend: true,
            }}
            config={{
                responsive: true,
            }}
            style={{ width: '100%', height: '100%' }}
        />
    );
};

export default RendimientoChart;
