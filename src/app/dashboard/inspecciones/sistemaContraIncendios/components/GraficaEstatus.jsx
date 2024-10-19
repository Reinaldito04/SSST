'use client';
import React, { useEffect, useState, useMemo } from 'react';
import Plot from 'react-plotly.js';
import { axioInstance } from '@/app/utils/axioInstance';
import Loading from '@/app/components/Loading';
import Swal from 'sweetalert2';

const GraficaEstatus = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Solicitar datos desde el backend
    axioInstance
      .get('/incendios/getIncendios') // Cambia esto por la URL correcta
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al cargar los datos de la gráfica.',
        });
      });
  }, []);

  const chartData = useMemo(() => {
    const nombre = data.map(item => item.Nombre);
    const planificado = data.map(item => item.Planificado);
    const ejecutado = data.map(item => item.Ejecutado);
    const porcentaje = data.map(item => item.Porcentaje);

    const tracePlanificado = {
      x: nombre,
      y: planificado,
      type: 'bar',
      name: 'Planificado',
      marker: { color: '#FF0000' },
    };
    const traceEjecutado = {
      x: nombre,
      y: ejecutado,
      type: 'bar',
      name: 'Ejecutado',
      marker: { color: '#00FF00' },
    };
    const tracePorcentaje = {
      x: nombre,
      y: porcentaje,
      type: 'bar',
      name: 'Porcentaje',
      marker: { color: '#0000FF' },
    };

    return [tracePlanificado, traceEjecutado, tracePorcentaje];
  }, [data]);

  if (loading) {
    return <Loading />; // Muestra el componente de carga
  }

  return (
    <div className="container">
      <Plot
        data={chartData}
        layout={{
          barmode: 'group',
        
        
          legend: { orientation: 'h', x: 0.5, xanchor: 'center' },
        }}
        config={{ responsive: true }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default GraficaEstatus;
