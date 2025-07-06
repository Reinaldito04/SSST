"use client";

import React, { useState, useEffect } from "react";
import styles from "../../../../administradores/consultar/styles/Tabla.module.css";
import CustomButton from "../../../../../components/CustomBotton";
import { axioInstance } from "../../../../../utils/axioInstance";
import { useRouter } from "next/navigation";
import Loading from "../../../../../components/Loading";
import EditAreaModal from "./EditAreaModal"; // Importa el nuevo componente
function Tabla() {
  const router = useRouter();
  const [activeRow, setActiveRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedArea, setselectedArea] = useState(null);
  const itemsPerPage = 5;

  // useEffect para obtener los datos del endpoint
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axioInstance.get("/plants");
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
  const filteredData = data.filter(
    (row) =>
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

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  const handleEdit = (area) => {
    setselectedArea(area);
    setIsEditModalOpen(true);
    console.log("Editando area:", area);
  };

  const handleUpdate = (updatedArea) => {
    setData((prevData) =>
      prevData.map((area) => (area.id === updatedArea.id ? updatedArea : area))
    );
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };
  return (
    <div className={styles.tableContainer}>
      <input
        type="text"
        placeholder="Buscar planta..."
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.idColumn}>ID</th>
            <th>Nombre</th>
            <th>Área</th>
            <th>Descripción</th>
            <th className={styles.statusColumn}>Estado</th>
            <th className={styles.dateColumn}>Creado</th>
            <th className={styles.actionsColumn}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((row) => (
              <tr key={row.id} className={styles.tableRow}>
                <td className={styles.idColumn}>{row.id}</td>
                <td>
                  <div className={styles.nameCell}>
                    <span className={styles.displayName}>
                      {row.display_name}
                    </span>
                    </div>
                </td>
                <td>{row.area?.display_name || row.area_name}</td>
                <td className={styles.descriptionCell}>{row.description}</td>
                <td className={styles.statusCell}>
                  <span
                    className={`${styles.statusBadge} ${
                      row.active ? styles.active : styles.inactive
                    }`}
                  >
                    {row.active ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className={styles.dateCell}>
                  {formatDate(row.created_at)}
                </td>

                <td>
                  <button
                    onClick={() => handleEdit(row)}
                    className="btn btn-primary"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className={styles.noData}>
                No se encontraron plantas
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <EditAreaModal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        area={selectedArea}
        onUpdate={handleUpdate}
      />

      <div className="d-flex justify-content-between mt-2">
        <div className={styles.recordCount}>
          Visualizando {startIndex + 1} a {Math.min(endIndex, totalRecords)} de{" "}
          {totalRecords} registros.
        </div>
        <div className='d-flex gap-2  '>

        <CustomButton
          label="Crear planta"
          onClick={() => router.push("/dashboard/areas/plantas/crear")}
        />
          <CustomButton
          label="Sectores"
          onClick={() => router.push("/dashboard/areas/plantas/sectores/consultar")}
        />
        </div>

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
