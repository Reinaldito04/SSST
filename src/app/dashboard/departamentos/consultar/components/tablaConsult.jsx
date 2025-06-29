"use client";

import React, { useState, useEffect } from "react";
import styles from "@/app/dashboard/administradores/consultar/styles/Tabla.module.css";
import CustomButton from "@/app/components/CustomBotton";
import { axioInstance } from "@/app/utils/axioInstance";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Loading";

function Tabla() {
  const router = useRouter();
  const [activeRow, setActiveRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 5;

  // useEffect para obtener los datos del endpoint
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axioInstance.get("/departments");
        setData(response.data.data); // Accedemos a response.data.data que contiene el array de departamentos
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
    row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <Loading/>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.tableContainer}>
      <input
        type="text"
        placeholder="Buscar departamento..."
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Creado</th>
            <th>Actualizado</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.display_name}</td>
              <td>{row.description}</td>
              <td>{row.active ? 'Activo' : 'Inactivo'}</td>
              <td>{new Date(row.created_at).toLocaleDateString()}</td>
              <td>{new Date(row.updated_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between mt-2">
 <div className={styles.recordCount}>
        Visualizando {startIndex + 1} a {Math.min(endIndex, totalRecords)} de {totalRecords} registros.
      </div>
        <CustomButton
        
          label="Crear departamento"
          onClick={() => router.push("/dashboard/departamentos/crear")}
        />
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