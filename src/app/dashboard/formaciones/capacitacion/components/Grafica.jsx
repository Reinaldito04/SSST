'use client'
import { axioInstance } from '@/app/utils/axioInstance';
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

function GraphComponent() {
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const response = await axioInstance.get('/capacitacion/getGraph');
        setGraphData(response.data); // Setear los datos de la gráfica
      } catch (error) {
        console.error('Error fetching graph data:', error);
      }
    };

    fetchGraphData();
  }, []);

  return (
    <div>
      {graphData ? (
        <Plot
          data={graphData.data}
          layout={graphData.layout}
          config={{ responsive: true }}
    
 
    style={{ width: "auto", height: "auto" }}
        />
      ) : (
        <p>Loading graph...</p>
      )}
    </div>
  );
}

export default GraphComponent;
