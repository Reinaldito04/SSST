"use client";
import { useState, useEffect } from "react";
import { axioInstance } from "@/app/utils/axioInstance";

function CardDashboard({ title, subtitle, ruta }) {
  const [data, setData] = useState({ cantidad: 0 }); // Inicializa data con una propiedad cantidad

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axioInstance.get(`/information/${ruta}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // No olvides llamar a la función fetchData
  }, [ruta]);

  return (
    <div
      className="card"
      style={{
        width: "auto",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title"> {title} </h5>
        <div className="d-flex flex-column ">
          <h1 className="display-3 fw-bolder mb-0">{data.cantidad}</h1> {/* Accede a data.cantidad */}
          <p className="text-muted">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

export default CardDashboard;
