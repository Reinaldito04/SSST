"use client";

import React, { useState, useEffect } from "react";
import styles from "@/app/dashboard/administradores/consultar/styles/Tabla.module.css";
import { axioInstance } from "@/app/utils/axioInstance";
import Loading from "@/app/components/Loading";

function Tabla() {
  const [activeRow, setActiveRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]); // Estado para almacenar los datos de la API
  const itemsPerPage = 5; // Cambia este valor según cuántos elementos quieras por página
  const [loading,setLoading]= useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axioInstance.get("/contratistas/consultContratist");
        setData(response.data); // Usa response.data directamente
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error fetching data: " + error.message); // Alertar en caso de error
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Se ejecuta una vez al montar el componente

  const filteredData = data.filter((row) =>
    row.NombreContr.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  if (loading) return <Loading/>
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.tableContainer}>
      <input
        type="text"
        placeholder="Buscar Contratista..."
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>RIF</th>
            <th>Nombre</th>
            <th>Gerencia Contratante</th>
            <th>N° Contrato</th>
            <th>Inicio de Contrato</th>
            <th>Finalización de Contrato</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <tr key={row.id}> {/* Cambia key a row.id */}
              <td>{row.id}</td>
              <td>{row.RIF}</td>
              <td>{row.NombreContr}</td>
              <td>{row.GerenciaContr}</td>
              <td>{row.NContrato}</td>
              <td>{row.FechaInicio}</td>
              <td>{row.FechaFin}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className={styles.recordCount}>
        Visualizando {startIndex + 1} a {endIndex} de {totalRecords} registros.
      </div>
      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <button className={styles.currentPage}>{currentPage}</button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Tabla;
