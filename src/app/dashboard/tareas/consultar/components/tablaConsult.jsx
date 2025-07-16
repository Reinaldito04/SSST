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
import ViewParticipantes from "./ViewParticipantes";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import StatusSelector from "./StatusSelector";
function Tabla() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isModalView, setIsModalView] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    per_page: 10,
    current_page: 1,
    last_page: 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axioInstance.get(
          `/tasks?page=${currentPage}&search_input=${searchTerm}`
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

    const debounceTimer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [currentPage, searchTerm]);

  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleUpdate = (updatedTask) => {
    setData((prevData) =>
      prevData.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setIsEditModalOpen(false);
  };

  const showParticipantes = (task) => {
    setSelectedTask(task);
    setIsModalView(true);
  };

  const handleDelete = (taskId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la tarea permanentemente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axioInstance
          .delete(`/tasks/${taskId}`)
          .then(() => {
            Swal.fire("Eliminado!", "La tarea ha sido eliminada.", "success");
            fetchData(); // Recargar los datos
          })
          .catch((error) => {
            console.error("Error al eliminar:", error);
            Swal.fire("Error", "No se pudo eliminar la tarea", "error");
          });
      }
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      "En proceso": "bg-primary",
      Aprobado: "bg-success",
      Cancelado: "bg-danger",
      Ejecutado: "bg-info",
    };

    return (
      <span className={`badge ${statusClasses[status] || "bg-secondary"}`}>
        {status}
      </span>
    );
  };

  if (loading) return <Loading />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className={styles.tableContainer}>
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          placeholder="Buscar tarea por título, sector o estado..."
          className={`form-control ${styles.searchInput}`}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Resetear a la primera página al buscar
          }}
          style={{ width: "400px" }}
        />
      </div>

      <div className="table-responsive">
        <table className={`table table-hover ${styles.table}`}>
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Descripcion</th>
              <th>Sector</th>
              <th>Planta</th>
              <th>Área</th>
              <th>IER</th>
              <th>Estado</th>
              <th>Creado por</th>
              <th>Participantes</th>
              <th>Fecha Creación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((task) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.sector_display_name}</td>
                  <td>{task.plant_display_name}</td>
                  <td>{task.area_display_name}</td>
                  <td>{task.ier_display_name}</td>
                  <td>{getStatusBadge(task.status)}</td>
                  <td>{task.creator_name}</td>
                  <td>
                    <span
                      className="badge bg-primary"
                      onClick={() => showParticipantes(task)}
                    >
                      {task.participants.length}
                    </span>
                  </td>
                  <td>{formatDate(task.created_at)}</td>
                 <td style={{ minWidth: "120px" }}>
                    <div className="d-flex gap-2">
                      <HasPermission permissionName="tasks-edit">
                        <button
                          onClick={() => handleEdit(task)}
                          className="btn btn-sm btn-primary"
                          title="Editar"
                        >
                          <FaRegEdit />
                        </button>
                      </HasPermission>

                      <HasPermission permissionName="tasks-delete">
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="btn btn-sm btn-danger"
                          title="Eliminar"
                        >
                          <FaRegTrashAlt />
                        </button>
                      </HasPermission>

                      <StatusSelector
                        task={task}
                        onStatusChange={(taskId, newStatus) => {
                          setData((prevData) =>
                            prevData.map((t) =>
                              t.id === taskId ? { ...t, status: newStatus } : t
                            )
                          );
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-4">
                  No se encontraron tareas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
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
            label="Crear tarea"
            onClick={() => router.push("/dashboard/tareas/crear")}
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

      <ViewParticipantes
        tasks={selectedTask?.participants}
        open={isModalView}
        close={() => setIsModalView(false)}
      />

      <EditDepartmentModal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        department={selectedTask}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

export default Tabla;
