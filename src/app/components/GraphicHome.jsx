"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { axioInstance } from "../utils/axioInstance";
import Loading from "./Loading";

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
        const response = await axioInstance.get(
          `/graph/${urlEndpoint}`
        ); // Llama a la API

        // Establece los datos y el layout según lo recibido
        const graphData = response.data.data; // Ajusta esto según la estructura real de tu respuesta
        const graphLayout = response.data.layout;
        

        setData(graphData); // Establecer los datos de la gráfica
        setLayout(graphLayout); // Establecer el layout de la gráfica
      } catch (error) {
        console.error("Error fetching graph data:", error);
      } finally {
        setLoading(false); // Actualiza el estado de carga
      }
    };

    fetchGraphData(); // Llama a la función
  }, [urlEndpoint]);

  if (loading) {
    return <Loading/>; // Mensaje de carga
  }

  return (
  <Plot
    
    config={{ responsive: true }}
    
    data={data}
    layout={layout}
    style={{ width: "auto", height: "auto" ,borderRadius:'15px'}}
  />
  
  );
};

export default GraphicHome;
