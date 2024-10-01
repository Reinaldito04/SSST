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
      DescripciónHallazgo: "Almacenamiento Inadecuado",
      Area: "Piso 2",
      CausaRaiz: "Factores Humanos",
      TipoInspección: "SOL",
      Severidad: "3",
      Frecuencia: "c",
      Nivel: "MEDIO",
    },
    {
      codigo: 1,
      DescripciónHallazgo: "Almacenamiento Inadecuado",
      Area: "Piso 2",
      CausaRaiz: "Factores Humanos",
      TipoInspección: "SOL",
      Severidad: "3",
      Frecuencia: "c",
      Nivel: "MEDIO",
    },

    // Agrega más filas aquí si lo deseas
  ];

  const filteredData = data.filter((row) =>
    row.DescripciónHallazgo.toLowerCase().includes(searchTerm.toLowerCase())
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
        placeholder="Buscar hallazgo..."
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción Hallazgo</th>
            <th>Causa Raiz</th>
            <th>Tipo de Inspección</th>
            <th>Severidad</th>
            <th>Frecuencia</th>
            <th>Nivel</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>{row.codigo}</td>
                <td>{row.DescripciónHallazgo}</td>
                <td>{row.CausaRaiz}</td>
                <td>{row.TipoInspección}</td>
                <td>{row.Severidad}</td>
                <td>{row.Frecuencia} </td>
                <td> {row.Nivel} </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className="">
        <div className=""
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "10px",
          alignItems: "center",
          width: "100%",
          marginTop: "50px",
          marginBottom: "10px",
        }}
        >
          <CustomButton
            label="Seguimiento"
            backgroundColor="#5B5B5B"
            textColor="#ffffff"
            style={
                {
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
               
                  justifyContent: "center",
                  padding: "10px 40px",
                }
            }
            onClick={() => {
              alert("Administrador Registrado");
            }}
          />
           <CustomButton
            label="Ver Estadistica"
            backgroundColor="#EE3333"
            textColor="#ffffff"
            style={
                {
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                
                  justifyContent: "center",
                  padding: "10px 40px",
                }
            }
            onClick={() => {
              alert("Administrador Registrado");
            }}
          />
        </div>
      </div>
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
