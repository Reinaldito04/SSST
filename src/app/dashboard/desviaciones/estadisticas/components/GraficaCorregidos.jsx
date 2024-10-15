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
  const corregidos = data.map(item => parseFloat(item.porcentaje_corregidas).toFixed(1)); // Redondear a 1 decimal
  
  // Configuración del gráfico
  const corregido = {
    x: lugares,
    y: corregidos.map(value => parseFloat(value)), // Convertir de nuevo a número para el eje y
    text: corregidos.map(value => `${value}%`), // Mostrar el porcentaje redondeado en las etiquetas
    textposition: 'auto', // Posición automática de los textos
    name: 'Corregido',
    type: 'bar',
    marker: { color: 'blue' },
    hovertemplate: '%{text}<extra></extra>' // Muestra los porcentajes en el hover
  };

  return (
    <div className="container">
      <Plot
        config={{ responsive: true }}
        style={{ width: "auto", height: "auto" }}
        data={[corregido]}
        layout={{
          barmode: 'group',
          yaxis: { title: 'Desviaciones Corregidas (%)' }, // Título del eje con porcentaje
          legend: { orientation: 'h', x: 0.5, xanchor: 'center' }
        }}
      />
    </div>
  );
};

export default ObservacionesGrafica;
