"use client";

import React, { useState, useEffect } from "react";
import styles from "@/app/dashboard/administradores/consultar/styles/Tabla.module.css";
import { axioInstance } from "@/app/utils/axioInstance";
import CustomButton from "@/app/components/CustomBotton";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css"; // Estilos de las notificaciones

import { ToastContainer, toast } from "react-toastify"; // Para notificaciones

function Tabla() {
  const MySwal = withReactContent(Swal);
  const [activeRow, setActiveRow] = useState(null); // Estado para almacenar el ID de la fila seleccionada
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]); // Estado para almacenar los datos de la API
  const itemsPerPage = 5; // Cambia este valor según cuántos elementos quieras por página
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axioInstance.get("/cronograma/getCronograma");
        setData(response.data); // Usa response.data directamente
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error fetching data: " + error.message); // Alertar en caso de error
      }
    };

    fetchData();
  }, []); // Se ejecuta una vez al montar el componente

  const filteredData = data.filter((row) =>
    row.Observacion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowSelection = (id) => {
    setActiveRow(id); // Guardar el ID de la fila seleccionada
  };

  const handleModify = () => {
    if (activeRow) {
      MySwal.fire({
        title: "¿Deseas modificar el cronograma?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, modificar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push(`/dashboard/cronograma/cumplimiento?id=${activeRow}`);
        }
      });
    } else {
      toast.warn("Debe seleccionar una fila para modificar."); // Notificación de advertencia
    }
  };
  return (
    <div className={styles.tableContainer}>
      <ToastContainer /> {/* Componente de notificación */}
      <input
        type="text"
        placeholder="Buscar Observacion..."
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Select</th> {/* Nueva columna para seleccionar la fila */}
            <th>ID</th>
            <th>Fecha</th>
            <th>InpE</th>
            <th>InpP</th>
            <th>Observacion</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row) => (
            <tr key={row.ID} onClick={() => handleRowSelection(row.ID)}>
              <td>
                <input
                  type="radio"
                  name="selectRow"
                  checked={activeRow === row.ID}
                  onChange={() => handleRowSelection(row.ID)}
                />
              </td>
              <td>{row.ID}</td>
              <td>{row.Fecha}</td>
              <td>{row.InpE}</td>
              <td>{row.InpP}</td>
              <td>{row.Observacion}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className="container-fluid"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <CustomButton
          onClick={handleModify} // Al hacer clic, ejecuta la función para modificar
          label="Modificar"
          backgroundColor="#161A6A"
          textColor="#FFFFFF"
          style={{
            width: "20%",
          }}
        />

        <CustomButton
          label="Ver Gráfica"
          backgroundColor="#EE3333"
          textColor="#FFFFFF"
          style={{
            width: "20%",
          }}
        />
        <CustomButton
          label="Agregar"
          backgroundColor="#2F2F2F"
          textColor="#FFFFFF"
          style={{
            width: "20%",
          }}
          onClick={
            () => router.push("/dashboard/cronograma/cumplimiento")
          }
        />
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
