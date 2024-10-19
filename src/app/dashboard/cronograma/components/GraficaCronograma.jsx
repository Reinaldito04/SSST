"use client";
import React, { useEffect, useState, useMemo } from "react";
import Plot from "react-plotly.js";
import { axioInstance } from "@/app/utils/axioInstance";
import Loading from "@/app/components/Loading";
import Swal from "sweetalert2";

const GraficaCronograma = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Solicitar datos desde el backend
    axioInstance
      .get("/cronograma/getCronogramaByMonth") // Cambia esto por la URL correcta
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al cargar los datos de la gráfica.",
        });
      });
  }, []);

  const chartData = useMemo(() => {
    const Mes = data.map((item) => item.Mes);
    const InpE_total = data.map((item) => item.InpE_total);
    const InpP_total = data.map((item) => item.InpP_total);

    // Calcular el total para cada mes
    const totalMes = InpE_total.map((value, index) => value + InpP_total[index]);

    // Calcular totales globales
    const totalInpE = InpE_total.reduce((acc, value) => acc + value, 0);
    const totalInpP = InpP_total.reduce((acc, value) => acc + value, 0);
    const totalGeneral = totalInpE + totalInpP;

    




    const traceInpE = {
      x: Mes,
      y: InpE_total,
      name: "Ejecutada",
      type: "bar",
    };

    const traceInpP = {
      x: Mes,
      y: InpP_total,
      name: "Planificada",
      type: "bar",
    };

    return [traceInpE, traceInpP];
  }, [data]);

  if (loading) {
    return <Loading />; // Muestra el componente de carga
  }

  return (
    <div className="container">
      <Plot
        data={chartData}
        layout={{
          barmode: "group",
      
          legend: { orientation: "h", x: 0.5, xanchor: "center" },
        }}
        config={{ responsive: true }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default GraficaCronograma;
