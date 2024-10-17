"use client";

import React, { useState, useEffect } from "react";
import styles from "@/app/dashboard/administradores/consultar/styles/Tabla.module.css";
import CustomButton from "@/app/components/CustomBotton";
import { axioInstance } from "@/app/utils/axioInstance";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Loading";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        const response = await axioInstance.get("/incendios/getIncendios");
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

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  const routerModify = () => {
    if (activeRow !== null) {
      const selectedRow = currentData[activeRow];
      router.push(
        `/dashboard/inspecciones/sistemaContraIncendios/modificar?id=${encodeURIComponent(selectedRow.IDIncendio)}&nombre=${encodeURIComponent(selectedRow.Nombre)}&planificado=${encodeURIComponent(selectedRow.Planificado)}&ejecutado=${encodeURIComponent(selectedRow.Ejecutado)}`
      );
    } else {
      toast.error("Por favor, seleccione una fila");
    }
  };
  
  return (
    <div className={styles.tableContainer}>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"

      />
      <input
        type="text"
        placeholder="Buscar Nombre..."
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Seleccionar</th>
            <th>ID</th>
            <th>Actividad</th>
            <th>Planificado</th>
            <th>Ejecutado</th>
            <th>Porcentaje</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={activeRow === index}
                  onChange={() => {
                    if (activeRow === index) {
                      setActiveRow(null);
                    } else {
                      setActiveRow(index);
                    }
                  }}
                />
              </td>
              <td>{row.IDIncendio}</td>
              <td>{row.Nombre}</td>
              <td>{row.Planificado}</td>
              <td>{row.Ejecutado}</td>
              <td>{row.Porcentaje} %</td>
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
            label="Modificar"
            backgroundColor="#5B5B5B"
            textColor="#ffffff"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",

              justifyContent: "center",
              padding: "10px 40px",
            }}
            onClick={routerModify}
          />
          <CustomButton
            label="Ver Estatus"
            backgroundColor="#EE3333"
            textColor="#ffffff"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",

              justifyContent: "center",
              padding: "10px 40px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Tabla;
