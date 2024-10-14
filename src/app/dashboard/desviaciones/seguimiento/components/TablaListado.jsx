"use client";

import React, { useState, useEffect } from "react";
import styles from "@/app/dashboard/administradores/consultar/styles/Tabla.module.css";
import CustomButton from "@/app/components/CustomBotton";
import { axioInstance } from "@/app/utils/axioInstance";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2"; // Importar SweetAlert2
import withReactContent from "sweetalert2-react-content"; // SweetAlert2 para React
import { toast, ToastContainer } from "react-toastify"; // Importar React Toastify
import "react-toastify/dist/ReactToastify.css"; // Importar los estilos de Toastify

const MySwal = withReactContent(Swal); // Crear la instancia de MySwal

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
        const response = await axioInstance.get("/desviaciones/getSeguimiento");
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

  const handleRowSelect = (row) => {
    setActiveRow(row);
  };

  const handleModify = () => {
    if (activeRow) {
      MySwal.fire({
        title: "¿Deseas modificar la desviación?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, modificar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push(`/dashboard/desviaciones/seguimiento?id=${activeRow.IDDesviacion}`);
        }
      });
    } else {
      toast.warn("Debe seleccionar una fila para modificar."); // Notificación de advertencia
    }
  };

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.tableContainer}>
      <ToastContainer/>
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

            <th>Modificar</th>
            <th>ID</th>
            <th>Descripción Hallazgo</th>
            <th>Area</th>
            <th>Detección</th>
            <th>Seguimiento</th>
            <th>Avance</th>
            <th>Responsable</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <tr key={index}>

              <td>
                <input
                  type="radio"
                  name="selectRow"
                  onChange={() => handleRowSelect(row)}
                  checked={activeRow?.IDDesviacion === row.IDDesviacion}
                />
              </td>
              <td>{row.IDDesviacion}</td>
              <td>{row.Descripcion}</td>
              <td>{row.Area}</td>
              <td>{row.Deteccion}</td>
              <td>{row.Seguimiento}</td>
              <td>{row.Avance} %</td>
              <td>{row.Responsable}</td>
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
        <div
          className=""
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
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              justifyContent: "center",
              padding: "10px 40px",
            }}
            onClick={handleModify} // Llamada a la nueva función de modificar
          />
          <CustomButton
            label="Ver Estadística"
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
              alert("Administrador Registrado");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Tabla;
