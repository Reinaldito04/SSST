'use client'
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { axioInstance } from '@/app/utils/axioInstance';
import Loading from '@/app/components/Loading';

const ObservacionesGrafica = () => {

  const [data, setData] = useState([]);
  const [loading,setLoading]=useState(true)

  useEffect(() => {
    // Solicitar datos desde el backend
    axioInstance.get('/desviaciones/resumen') // Cambia esto por la URL correcta
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading/>; // Muestra un mensaje de carga
  }
  // Procesar los datos para extraer las observaciones de riesgo por nivel
  const lugares = data.map(item => item.area);
  const bajo = data.map(item => item.nivel_riesgo.bajo);
  const medio = data.map(item => item.nivel_riesgo.medio);
  const alto = data.map(item => item.nivel_riesgo.alto);

  const traceBajo = {
    x: lugares,
    y: bajo,
    name: 'Bajo',
    type: 'bar',
    marker: { color: 'blue' }
  };

  const traceMedio = {
    x: lugares,
    y: medio,
    name: 'Medio',
    type: 'bar',
    marker: { color: 'yellow' }
  };

  const traceAlto = {
    x: lugares,
    y: alto,
    name: 'Alto',
    type: 'bar',
    marker: { color: 'red' }
  };

  return (
    <div className="container">
  <Plot
    config={{ responsive: true }}
    style={{ width: "auto", height: "auto" }}

    data={[traceBajo, traceMedio, traceAlto]}
      layout={{
        barmode: 'group',
        yaxis: { title: 'Nº de Observaciones' },
        legend: { orientation: 'h', x: 0.5, xanchor: 'center' }
      }}
    />
    </div>
  
  );
};

export default ObservacionesGrafica;
