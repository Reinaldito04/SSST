"use client";
import { axioInstance } from "@/app/utils/axioInstance";
import React, { useEffect, useState } from "react";
import styles from "@/app/dashboard/administradores/consultar/styles/Tabla.module.css";
import CustomButton from "@/app/components/CustomBotton";

function Tabla() {
  const [activeRow, setActiveRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]); // Estado para almacenar los datos
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axioInstance.get("/contratistas/all"); // Ajusta la ruta según tu API
        setData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((row) =>
    row.NombreContr.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

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
            <th>Telefono</th>
            <th>Dirección</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <tr key={index}>
              <td>{row.id}</td> {/* Asume que hay un campo 'id' en los datos */}
              <td>{row.RIF}</td>
              <td>{row.NombreContr}</td>
              <td>{row.GerenciaContr}</td>
              <td>{row.TelefonoContr}</td>
              <td>{row.DireccionContr}</td>
              <td>{row.EmailContr}</td>
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
