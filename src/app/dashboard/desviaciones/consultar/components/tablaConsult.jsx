"use client";

import React, { useState, useEffect } from "react";
import styles from "@/app/dashboard/administradores/consultar/styles/Tabla.module.css";
import CustomButton from "@/app/components/CustomBotton";
import { axioInstance } from "@/app/utils/axioInstance";
import { useRouter } from "next/navigation";
function Tabla() {
  const router = useRouter();
  const [activeRow, setActiveRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]); // Estado para almacenar los datos
  const [loading, setLoading] = useState(true); // Estado para manejar el loading
  const [error, setError] = useState(null); // Estado para manejar errores
  const itemsPerPage = 5; // Cambia este valor según cuántos elementos quieras por página

  // useEffect para obtener los datos del endpoint
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axioInstance.get("/desviaciones/getDesviaciones");
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error al obtener los datos");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtrar los datos según el término de búsqueda
  const filteredData = data.filter((row) =>
    row.Descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>{error}</p>;

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
            <tr key={index}>
              <td>{row.ID}</td>
              <td>{row.Descripcion}</td>
              <td>{row.CausaRaiz}</td>
              <td>{row.TipoInspeccion}</td>
              <td>{row.Severidad}</td>
              <td>{row.Frecuencia}</td>
              <td>{row.Nivel}</td>
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
              router.push('/dashboard/desviaciones/seguimiento/listado')
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
    </div>
  );
}

export default Tabla;
