"use client";

import React, { useState, useEffect } from "react";
import styles from "../../../../../administradores/consultar/styles/Tabla.module.css";
import CustomButton from "../../../../../../components/CustomBotton";
import { axioInstance } from "../../../../../../utils/axioInstance";
import { useRouter } from "next/navigation";
import Loading from "../../../../../../components/Loading";
import EditAreaModal from "./EditAreaModal";
import HasPermission from "../../../../../../components/HasPermission";
import Swal from "sweetalert2";
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
  const [pagination, setPagination] = useState({
    total: 0,
    per_page: 5,
    current_page: 1,
    last_page: 1,
  });
  const fetchData = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await axioInstance.get(
        `/sectors?page=${currentPage}&search_input=${searchTerm}&search_column=display_name`
      );
      setData(response.data.data);
      setPagination({
        total: response.data.total,
        per_page: response.data.per_page,
        current_page: response.data.current_page,
        last_page: response.data.last_page,
      });
      setLoading(false);
    } catch (err) {
      setError("Error al obtener los datos");
      setLoading(false);
    }
  }, [currentPage, searchTerm]);
  // useEffect para obtener los datos del endpoint con paginación
  useEffect(() => {
    // Agregamos un debounce para evitar hacer muchas peticiones al escribir
    const debounceTimer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [currentPage, fetchData, searchTerm]);

  const handleEdit = (area) => {
    setselectedArea(area);
    setIsEditModalOpen(true);
    console.log("Editando area:", area);
  };
  const handleDelete = (area) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Esta accion eliminará al area.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        axioInstance
          .delete(`/sectors/${area.id}`)
          .then((response) => {
            Swal.fire("Eliminado!", "", "success");
            fetchData();
          })
          .catch((error) => {
            console.error("Error al eliminar el area:", error);
          });
      }
    });
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

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.tableContainer}>
      <input
        type="text"
        placeholder="Buscar sector..."
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
            <th>Planta</th>
            <th>Descripción</th>
            <th className={styles.statusColumn}>Estado</th>
            <th className={styles.dateColumn}>Creado</th>
            <th className={styles.actionsColumn}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row) => (
              <tr key={row.id} className={styles.tableRow}>
                <td className={styles.idColumn}>{row.id}</td>
                <td>
                  <div className={styles.nameCell}>
                    <span className={styles.displayName}>{row.name}</span>
                  </div>
                </td>
                <td>{row.area?.display_name || row.area_name}</td>
                <td>{row.plant?.display_name || row.plant_name}</td>
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
                  <HasPermission permissionName={"sectors-edit"}>
                    <button
                      onClick={() => handleEdit(row)}
                      className="btn btn-primary"
                    >
                      Editar
                    </button>
                  </HasPermission>
                  <HasPermission permissionName={"sectors-delete"}>
                    <button
                      onClick={() => handleDelete(row)}
                      className="btn btn-danger"
                    >
                      Eliminar
                    </button>
                  </HasPermission>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className={styles.noData}>
                No se encontraron sectores
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
          Mostrando {(pagination.current_page - 1) * pagination.per_page + 1} a{" "}
          {Math.min(
            pagination.current_page * pagination.per_page,
            pagination.total
          )}{" "}
          de {pagination.total} registros.
        </div>
        <CustomButton
          label="Crear sector"
          onClick={() => router.push("/dashboard/areas/plantas/sectores/crear")}
        />
      </div>

      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <button className={styles.currentPage}>{currentPage}</button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === pagination.last_page}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Tabla;
