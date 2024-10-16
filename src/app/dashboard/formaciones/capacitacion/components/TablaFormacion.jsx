"use client";
import React, { useState, useEffect } from "react";
import styles from "@/app/dashboard/administradores/consultar/styles/Tabla.module.css";
import { axioInstance } from "@/app/utils/axioInstance";
import InputComponent from "@/app/dashboard/desviaciones/crear/components/InputsModify";
import CustomButton from "@/app/components/CustomBotton";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify"; // Para notificaciones
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "react-toastify/dist/ReactToastify.css"; // Estilos de las notificaciones

function Tabla() {
  const [activeRow, setActiveRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const itemsPerPage = 5;
  const router = useRouter();
  const MySwal = withReactContent(Swal);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axioInstance.get(
          "/capacitacion/getCapacitacion"
        );
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data: " + error.message); // Notificación de error
      }
    };

    fetchData();
  }, []);

  const handleFilter = () => {
    const filtered = data.filter((row) => {
      const rowDate = new Date(row.Fecha);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      const isWithinRange =
        (!start || rowDate >= start) && (!end || rowDate <= end);

      return isWithinRange;
    });

    setFilteredData(filtered);
    setCurrentPage(1);
  };

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
        title: "¿Deseas modificar la capacitación?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, modificar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push(`/dashboard/formaciones/capacitacion?id=${activeRow.id}`);
        }
      });
    } else {
      toast.warn("Debe seleccionar una fila para modificar."); // Notificación de advertencia
    }
  };

  return (
    <div className={styles.tableContainer}>
      <ToastContainer /> {/* Componente de notificación */}
      <div className={styles.filterContainer}>
        <div className="d-flex">
          <div className="col-md-3">
            <InputComponent
              label="Desde : "
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="col-md-3 mx-auto">
            <InputComponent
              label="Hasta :"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="col-md-3 mx-auto">
            <CustomButton
              onClick={handleFilter}
              label="Consultar"
              backgroundColor="#EE3333"
              textColor="#FFFFFF"
            />
            <CustomButton
              onClick={() => router.push("/dashboard/formaciones/capacitacion")}
              label="Agregar"
              backgroundColor="#EE3333"
              textColor="#FFFFFF"
              style={{ marginLeft: "40px" }}
            />
          </div>
        </div>
      </div>
      <table className={styles.table} style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>Seleccionar</th>
            <th>ID</th>
            <th>Fecha</th>
            <th>Tema</th>
            <th>HP</th>
            <th>HE</th>
            <th>Archivo</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row) => (
            <tr key={row.id}>
              <td>
                <input
                  type="radio"
                  name="selectRow"
                  onChange={() => handleRowSelect(row)}
                  checked={activeRow?.id === row.id}
                />
              </td>
              <td>{row.id}</td>
              <td>{row.Fecha}</td>
              <td>{row.Tema}</td>
              <td>{row.HP}</td>
              <td>{row.HE}</td>
              <td>
                <CustomButton
                  label="Archivo"
                  backgroundColor="#44547D"
                  textColor="#FFFFFF"
                  onClick={() =>
                    router.push(`http://localhost:8000/File/${row.Archivo}`)
                  }
                />
              </td>
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
      <div className="justify-content-center d-flex mt-4">
        <CustomButton
          label="Ver Gráfica"
          backgroundColor="#EE3333"
          textColor="#FFFFFF"
          onClick={() => 
            router.push("/dashboard/formaciones/capacitacion/grafica")
          }
          className="mx-auto"
          style={{ width: "200px" }}
        />
        <CustomButton
          label="Modificar"
          backgroundColor="#161A6A"
          textColor="#FFFFFF"
          onClick={handleModify} // Llamada a la nueva función de modificar
          className="mx-auto"
          style={{ width: "200px" }}
        />
        <CustomButton
          label="Exportar"
          backgroundColor="#2F2F2F"
          textColor="#FFFFFF"
          style={{ width: "200px" }}
          className="mx-auto"
          onClick={() => toast.info("Exportar - Funcionalidad pendiente")}
        />
      </div>
    </div>
  );
}

export default Tabla;
