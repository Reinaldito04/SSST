"use client";

import React, { useState } from "react";
import styles from "@/app/dashboard/administradores/consultar/styles/Tabla.module.css";
import CustomButton from "@/app/components/CustomBotton";
function Tabla() {
  const [activeRow, setActiveRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5; // Cambia este valor según cuántos elementos quieras por página

  const data = [
    {
      codigo: 1,
      RIF: "J-123456789",
      Nombre: "Invermaur, C.A.",
      GerenciaContratante: "SSGG",
      NContrato: "12345678",
      InicioContrato: "19-06-2024",
      FinalizaciónContrato: "19-07-2024",
    },
    {
      codigo: 2,
      RIF: "J-123456789",
      Nombre: "MMGROUP",
      GerenciaContratante: "SSGG",
      NContrato: "12345678",
      InicioContrato: "19-06-2024",
      FinalizaciónContrato: "19-07-2024",
    },

    // Agrega más filas aquí si lo deseas
  ];

  const filteredData = data.filter((row) =>
    row.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
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
            <th>N° Contrato</th>
            <th>Inicio de Contrato</th>
            <th>Finalización de Contrato</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>{row.codigo}</td>
                <td>{row.RIF}</td>
                <td>{row.Nombre}</td>
                <td>{row.GerenciaContratante}</td>
                <td>{row.NContrato}</td>
                <td>{row.InicioContrato} </td>
                <td> {row.FinalizaciónContrato} </td>
              </tr>
            </React.Fragment>
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
