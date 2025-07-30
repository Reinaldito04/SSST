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
import {
  FaRegEdit,
  FaRegTrashAlt,
  FaFilter,
  FaTimes,
  FaComment,
  FaFilePdf,
} from "react-icons/fa";
import StatusSelector from "./StatusSelector";
import DatePicker from "react-datepicker";
import CommentsModal from "./CommentsSection";
import ModalTasksFiles from "./ModalTasksFiles";
import "react-datepicker/dist/react-datepicker.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
function Tabla() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isModalView, setIsModalView] = useState(false);
  const [isModalComments, setIsModalComments] = useState(false);
  const [isModalFiles, setIsModalFiles] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    created_at_start: null,
    created_at_end: null,
    approved_at_start: null,
    approved_at_end: null,
    executed_at_start: null,
    executed_at_end: null,
    canceled_at_start: null,
    canceled_at_end: null,
  });
  const [pagination, setPagination] = useState({
    total: 0,
    per_page: 10,
    current_page: 1,
    last_page: 1,
  });

  const fetchData = async () => {
    try {
      setLoading(true);

      // Construir parámetros de filtro
      let params = {
        page: currentPage,
        search_input: searchTerm,
        status: filters.status,
      };

      // Añadir filtros de fecha si existen
      const periodFilters = [];

      if (filters.created_at_start || filters.created_at_end) {
        periodFilters.push({
          column: "created_at",
          start: filters.created_at_start?.toISOString().split("T")[0],
          end: filters.created_at_end?.toISOString().split("T")[0],
        });
      }

      if (filters.approved_at_start || filters.approved_at_end) {
        periodFilters.push({
          column: "approved_at",
          start: filters.approved_at_start?.toISOString().split("T")[0],
          end: filters.approved_at_end?.toISOString().split("T")[0],
        });
      }

      if (filters.executed_at_start || filters.executed_at_end) {
        periodFilters.push({
          column: "executed_at",
          start: filters.executed_at_start?.toISOString().split("T")[0],
          end: filters.executed_at_end?.toISOString().split("T")[0],
        });
      }

      if (filters.canceled_at_start || filters.canceled_at_end) {
        periodFilters.push({
          column: "canceled_at",
          start: filters.canceled_at_start?.toISOString().split("T")[0],
          end: filters.canceled_at_end?.toISOString().split("T")[0],
        });
      }

      if (periodFilters.length > 0) {
        params.period_filters = periodFilters;
      }

      const response = await axioInstance.get("/tasks", { params });
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

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [currentPage, searchTerm, filters]);

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

  const showFiles = (task) => {
    setSelectedTask(task);
    setIsModalFiles(true);
  };

  const handleComments = (task) => {
    setSelectedTask(task);
    setIsModalComments(true);
  };
const handleExportExcel = () => {
  if (!data || data.length === 0) {
    Swal.fire("Sin datos", "No hay tareas para exportar", "warning");
    return;
  }

  const exportData = data.map((task) => ({
    ID: task.id,
    Título: task.title,
    Descripción: task.description,
    Sector: task.sector_display_name,
    Planta: task.plant_display_name,
    Área: task.area_display_name,
    IER: task.ier_display_name,
    Estado: task.status,
    "Creado por": task.creator_name,
    Participantes: task.participants.length,
    "Fecha de creación": formatDate(task.created_at),
    "Fecha límite": formatDate(task.deadline_at),
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Tareas");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, `tareas_export_${new Date().toISOString().split("T")[0]}.xlsx`);
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
            fetchData();
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

  const resetFilters = () => {
    setFilters({
      status: "",
      created_at_start: null,
      created_at_end: null,
      approved_at_start: null,
      approved_at_end: null,
      executed_at_start: null,
      executed_at_end: null,
      canceled_at_start: null,
      canceled_at_end: null,
    });
    setCurrentPage(1);
  };

  const hasActiveFilters = () => {
    return (
      filters.status ||
      filters.created_at_start ||
      filters.created_at_end ||
      filters.approved_at_start ||
      filters.approved_at_end ||
      filters.executed_at_start ||
      filters.executed_at_end ||
      filters.canceled_at_start ||
      filters.canceled_at_end
    );
  };

  if (loading) return <Loading />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className={styles.tableContainer}>
      <div className="d-flex justify-content-between mb-3 flex-wrap gap-2">
        <div className="d-flex gap-2 flex-grow-1">
          <input
            type="text"
            placeholder="Buscar tarea por título, sector o estado..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />

          <button
            className="btn btn-secondary d-flex align-items-center gap-1"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> Filtros
          </button>

          {hasActiveFilters() && (
            <button
              className="btn btn-outline-danger d-flex align-items-center gap-1"
              onClick={resetFilters}
            >
              <FaTimes /> Limpiar
            </button>
          )}
        </div>

        <CustomButton
          label="Crear tarea"
          onClick={() => router.push("/dashboard/tareas/crear")}
        />
        <CustomButton
          className="btn btn-success d-flex align-items-center gap-1"
          onClick={handleExportExcel}
          label={'Exportar Excel'}
        >
        </CustomButton>
      </div>

      {showFilters && (
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Filtros avanzados</h5>
            <div className="row g-3">
              <div className="col-md-3">
                <label className="form-label">Estado</label>
                <select
                  className="form-select"
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                >
                  <option value="">Todos</option>
                  <option value="En proceso">En proceso</option>
                  <option value="Ejecutado">Ejecutado</option>
                  <option value="Aprobado">Aprobado</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label">Fecha creación (inicio)</label>
                <DatePicker
                  selected={filters.created_at_start}
                  onChange={(date) =>
                    setFilters({ ...filters, created_at_start: date })
                  }
                  selectsStart
                  startDate={filters.created_at_start}
                  endDate={filters.created_at_end}
                  className="form-control"
                  placeholderText="Seleccionar fecha"
                  dateFormat="dd/MM/yyyy"
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Fecha creación (fin)</label>
                <DatePicker
                  selected={filters.created_at_end}
                  onChange={(date) =>
                    setFilters({ ...filters, created_at_end: date })
                  }
                  selectsEnd
                  startDate={filters.created_at_start}
                  endDate={filters.created_at_end}
                  minDate={filters.created_at_start}
                  className="form-control"
                  placeholderText="Seleccionar fecha"
                  dateFormat="dd/MM/yyyy"
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Fecha aprobación (inicio)</label>
                <DatePicker
                  selected={filters.approved_at_start}
                  onChange={(date) =>
                    setFilters({ ...filters, approved_at_start: date })
                  }
                  selectsStart
                  startDate={filters.approved_at_start}
                  endDate={filters.approved_at_end}
                  className="form-control"
                  placeholderText="Seleccionar fecha"
                  dateFormat="dd/MM/yyyy"
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Fecha aprobación (fin)</label>
                <DatePicker
                  selected={filters.approved_at_end}
                  onChange={(date) =>
                    setFilters({ ...filters, approved_at_end: date })
                  }
                  selectsEnd
                  startDate={filters.approved_at_start}
                  endDate={filters.approved_at_end}
                  minDate={filters.approved_at_start}
                  className="form-control"
                  placeholderText="Seleccionar fecha"
                  dateFormat="dd/MM/yyyy"
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Fecha ejecución (inicio)</label>
                <DatePicker
                  selected={filters.executed_at_start}
                  onChange={(date) =>
                    setFilters({ ...filters, executed_at_start: date })
                  }
                  selectsStart
                  startDate={filters.executed_at_start}
                  endDate={filters.executed_at_end}
                  className="form-control"
                  placeholderText="Seleccionar fecha"
                  dateFormat="dd/MM/yyyy"
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Fecha ejecución (fin)</label>
                <DatePicker
                  selected={filters.executed_at_end}
                  onChange={(date) =>
                    setFilters({ ...filters, executed_at_end: date })
                  }
                  selectsEnd
                  startDate={filters.executed_at_start}
                  endDate={filters.executed_at_end}
                  minDate={filters.executed_at_start}
                  className="form-control"
                  placeholderText="Seleccionar fecha"
                  dateFormat="dd/MM/yyyy"
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Fecha cancelación (inicio)</label>
                <DatePicker
                  selected={filters.canceled_at_start}
                  onChange={(date) =>
                    setFilters({ ...filters, canceled_at_start: date })
                  }
                  selectsStart
                  startDate={filters.canceled_at_start}
                  endDate={filters.canceled_at_end}
                  className="form-control"
                  placeholderText="Seleccionar fecha"
                  dateFormat="dd/MM/yyyy"
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Fecha cancelación (fin)</label>
                <DatePicker
                  selected={filters.canceled_at_end}
                  onChange={(date) =>
                    setFilters({ ...filters, canceled_at_end: date })
                  }
                  selectsEnd
                  startDate={filters.canceled_at_start}
                  endDate={filters.canceled_at_end}
                  minDate={filters.canceled_at_start}
                  className="form-control"
                  placeholderText="Seleccionar fecha"
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>
          </div>
        </div>
      )}

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
              <th>Fecha Limite</th>
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
                      style={{ cursor: "pointer" }}
                    >
                      {task.participants.length}
                    </span>
                  </td>
                  <td>{formatDate(task.created_at)}</td>

                  <td>{formatDate(task.deadline_at)}</td>

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

                      <button
                        type="button"
                        className="btn btn-sm btn-warning"
                        title="Comentarios"
                        onClick={() => handleComments(task)}
                      >
                        <FaComment />
                      </button>

                      <button
                        type="button"
                        className="btn btn-sm btn-info"
                        title="Archivos"
                        onClick={() => showFiles(task)}
                      >
                        <FaFilePdf />
                      </button>
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
                          fetchData();
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="text-center py-4">
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
        tasks={selectedTask}
        open={isModalView}
        close={() => setIsModalView(false)}
        refetch={fetchData}
      />

      <EditDepartmentModal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        department={selectedTask}
        onUpdate={handleUpdate}
      />

      <CommentsModal
        task={selectedTask}
        isOpen={isModalComments}
        onClose={() => setIsModalComments(false)}
      />

      <ModalTasksFiles
        task={selectedTask}
        isOpen={isModalFiles}
        onClose={() => setIsModalFiles(false)}
      />
    </div>
  );
}

export default Tabla;
