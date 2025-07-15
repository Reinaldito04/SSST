"use client";

import React, { useState, useEffect } from "react";
import styles from "../../../administradores/consultar/styles/Tabla.module.css";
import CustomButton from "../../../../components/CustomBotton";
import { axioInstance } from "../../../../utils/axioInstance";
import { useRouter } from "next/navigation";
import Loading from "../../../../components/Loading";
import EditDepartmentModal from "./EditDepartmentModal";
import HasPermission from "../../../../components/HasPermission";
import Swal from "sweetalert2";
import ModalIerFiles from "./ModalIerFiles";
function Tabla() {
  const router = useRouter();
  const [activeRow, setActiveRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isModalFilesOpen, setIsModalFilesOpen] = useState(false);
  const [selectedIer, setSelectedIer] = useState(null);

  const [pagination, setPagination] = useState({
    total: 0,
    per_page: 5,
    current_page: 1,
    last_page: 1,
  });
 // eslint-disable-next-line react-hooks/exhaustive-deps
 const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axioInstance.get(
          `/iers?page=${currentPage}&search_input=${searchTerm}`
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
    };
  // useEffect para obtener los datos del endpoint con paginación
  useEffect(() => {
   

    // Agregamos un debounce para evitar hacer muchas peticiones al escribir
    const debounceTimer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [currentPage, searchTerm]);

  const handleEdit = (area) => {
    setSelectedIer(area);
    setIsEditModalOpen(true);
  };

  const handleViewFiles = (ier) => {
    setSelectedIer(ier);
    setIsModalFilesOpen(true);
  };

  const handleUpdate = (updatedArea) => {
    setData((prevData) =>
      prevData.map((area) => (area.id === updatedArea.id ? updatedArea : area))
    );
  };
  const handleDelete = (areaId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el ier.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        axioInstance
          .delete(`/iers/${areaId}`)
          .then((response) => {
            Swal.fire("Eliminado!", "", "success");
            setData((prevData) =>
              prevData.filter((area) => area.id !== areaId)
            );
          })
          .catch((error) => {
            console.error("Error al eliminar el ier:", error);
          });
      }
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.tableContainer}>
      <input
        type="text"
        placeholder="Buscar ier..."
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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.display_name}</td>
                <td>{row.description}</td>
                <td>
                  <span
                    className={`${styles.statusBadge} ${
                      row.active ? styles.active : styles.inactive
                    }`}
                  >
                    {row.active ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td>{formatDate(row.created_at)}</td>
                <td>{formatDate(row.updated_at)}</td>
                <td className="d-flex justify-content-between gap-2">
                  <HasPermission permissionName={"iers-edit"}>
                    <button
                      onClick={() => handleEdit(row)}
                      className="btn btn-primary"
                    >
                      Editar
                    </button>
                  </HasPermission>

                  <HasPermission permissionName={"iers-delete"}>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(row.id)}
                    >
                      Eliminar
                    </button>
                  </HasPermission>
                  <HasPermission permissionName={"iers-browse"}>
                    <button
                      className="btn btn-info"
                      onClick={() => handleViewFiles(row)}
                    >
                      Archivos
                    </button>
                  </HasPermission>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className={styles.noData}>
                No se encontraron Iers
              </td>
            </tr>
          )}
        </tbody>
      </table>

          <ModalIerFiles
          ier={selectedIer}
          isOpen={isModalFilesOpen}
          onClose={() => setIsModalFilesOpen(false)}
          />


      <EditDepartmentModal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        department={selectedIer}
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

        <div className="d-flex gap-2">
          <CustomButton
            label="Crear Ier"
            onClick={() => router.push("/dashboard/ier/crear")}
          />
        </div>
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
