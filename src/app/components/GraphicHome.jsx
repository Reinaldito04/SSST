"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Carga dinámica del componente Plotly
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const GraphicHome = ({ urlEndpoint }) => {
  const [data, setData] = useState([]);
  const [layout, setLayout] = useState({});
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga

  useEffect(() => {
    // Cargar los datos de la API
    const fetchGraphData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/graph/${urlEndpoint}`
        ); // Llama a la API
        const jsonData = await response.json(); // Convierte la respuesta a JSON

        // Establece los datos y el layout según lo recibido
        const graphData = jsonData.data;
        const graphLayout = jsonData.layout;

        setData(graphData); // Establecer los datos de la gráfica
        setLayout(graphLayout); // Establecer el layout de la gráfica
      } catch (error) {
        console.error("Error fetching graph data:", error);
      } finally {
        setLoading(false); // Actualiza el estado de carga
      }
    };

    fetchGraphData(); // Llama a la función
  }, []);

  if (loading) {
    return <div>Cargando gráfico...</div>; // Mensaje de carga
  }

  return (
    <Plot
      data={data}
      layout={layout}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default GraphicHome;
