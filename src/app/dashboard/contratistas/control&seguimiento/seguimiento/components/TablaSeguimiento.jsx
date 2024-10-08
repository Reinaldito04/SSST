"use client";

import React, { useState, useEffect } from "react";
import styles from "@/app/dashboard/administradores/consultar/styles/Tabla.module.css";
import CustomButton from "@/app/components/CustomBotton";
import { axioInstance } from "@/app/utils/axioInstance";
import { useSearchParams } from "next/navigation";
function Tabla() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]); // Estado para almacenar los datos del backend
  const [loading, setLoading] = useState(true); // Estado para mostrar una carga mientras se obtienen los datos
  const itemsPerPage = 5;

  const searchParam = useSearchParams()
  const id = searchParam.get('id')

  // Función para obtener los datos del backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axioInstance.get(`/contratistas/seguimientoContratist/${id}`); // Cambia '1' por el ID que necesites
        setData(response.data); // Actualiza los datos con la respuesta del backend
        setLoading(false); // Deja de mostrar el loading
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]); // Ejecuta una vez cuando se carga el componente

  // Filtrar los datos según el término de búsqueda
  const filteredData = data.filter((row) =>
    row.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Empresa Contratista</th>
            <th>Anexo A</th>
            <th>Anexo B</th>
            <th>PDT/ART</th>
            <th>Planificado</th>
            <th>Ejecutado</th>
            <th>% Cumpl</th>
            <th>Evaluacion Final</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>{row.id}</td>
                <td>{row.Nombre}</td>
                <td>{row.AnexoA}</td>
                <td>{row.AnexoB}</td>
                <td>{row.PDTART}</td>
                <td>{row.Planificado}</td>
                <td>{row.Ejecutado}</td>
                <td>{row.Cumplimiento}</td>
                <td>{row.EvalFinal}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className="">
        <div
          className=""
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            alignItems: "center",
            width: "100%",
            marginTop: "150px",
            marginBottom: "10px",
          }}
        >
          <CustomButton
            label="Exportar Excel"
            backgroundColor="#0EB200"
            textColor="#ffffff"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              justifyContent: "center",
              padding: "10px 40px",
            }}
            onClick={() => {
              alert("Exportando Excel...");
            }}
          />
          <CustomButton
            label="Ver Gráfica"
            backgroundColor="#EE3333"
            textColor="#ffffff"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              justifyContent: "center",
              padding: "10px 40px",
            }}
            onClick={() => {
              alert("Mostrando gráfica...");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Tabla;
