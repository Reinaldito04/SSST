"use client";

import React, { useState, useEffect } from "react";
import styles from "../../../administradores/consultar/styles/Tabla.module.css";
import CustomButton from "../../../../components/CustomBotton";
import { axioInstance } from "../../../../utils/axioInstance";
import { useRouter } from "next/navigation";
import Loading from "../../../../components/Loading";
import Swal from "sweetalert2";
import HasPermission from "../../../../components/HasPermission";
import {
  FaRegEdit,
  FaRegTrashAlt,
  FaFilter,
  FaTimes,
  FaFilePdf,
  FaEye,
} from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import {
  FiCalendar,
  FiClock,
  FiRepeat,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import ViewParticipantes from "./ViewParticipantes";
function Tabla() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [isModalView, setIsModalView] = useState(false);

  const [filters, setFilters] = useState({
    status: "",
    start_at_start: null,
    start_at_end: null,
    end_at_start: null,
    end_at_end: null,
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

      let params = {
        page: currentPage,
        search_input: searchTerm,
        is_active:
          filters.status === "active"
            ? 1
            : filters.status === "inactive"
            ? 0
            : "",
      };

      // Filtros de fecha
      const periodFilters = [];

      if (filters.start_at_start || filters.start_at_end) {
        periodFilters.push({
          column: "start_at",
          start: filters.start_at_start?.toISOString().split("T")[0],
          end: filters.start_at_end?.toISOString().split("T")[0],
        });
      }

      if (filters.end_at_start || filters.end_at_end) {
        periodFilters.push({
          column: "end_at",
          start: filters.end_at_start?.toISOString().split("T")[0],
          end: filters.end_at_end?.toISOString().split("T")[0],
        });
      }

      if (periodFilters.length > 0) {
        params.period_filters = periodFilters;
      }

      const response = await axioInstance.get("/task-plans", { params });
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

  const handleViewDetails = (plan) => {
    setSelectedPlan(plan);
    setIsDetailsModalOpen(true);
  };

  const handleDelete = (planId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el plan de tareas permanentemente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axioInstance
          .delete(`/task-plans/${planId}`)
          .then(() => {
            Swal.fire("Eliminado!", "El plan ha sido eliminado.", "success");
            fetchData();
          })
          .catch((error) => {
            console.error("Error al eliminar:", error);
            Swal.fire("Error", "No se pudo eliminar el plan", "error");
          });
      }
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  const formatDays = (frequency, days) => {
    if (frequency === "daily") return "Diario";
    if (frequency === "yearly") return "Anual";

    const dayLabels = {
      weekly: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
      monthly: {
        last: "Último",
        "last-1": "Penúltimo",
        "last-2": "Antepenúltimo",
      },
    };

    return days
      .map((day) => {
        if (frequency === "weekly") return dayLabels.weekly[day];
        if (typeof day === "string" && dayLabels.monthly[day])
          return dayLabels.monthly[day];
        return `Día ${day}`;
      })
      .join(", ");
  };

  const resetFilters = () => {
    setFilters({
      status: "",
      start_at_start: null,
      start_at_end: null,
      end_at_start: null,
      end_at_end: null,
    });
    setCurrentPage(1);
  };

  const hasActiveFilters = () => {
    return (
      filters.status ||
      filters.start_at_start ||
      filters.start_at_end ||
      filters.end_at_start ||
      filters.end_at_end
    );
  };

  const showParticipantes = (task) => {
    setSelectedPlan(task);
    setIsModalView(true);
  };

  const EjecutarPlans = async () => {
    await axioInstance
      .post(`/task-plans/check`)
      .then((response) => {
        Swal.fire(
          "Planificaciones Ejecutadas",
          response.data.message||"Las planificaciones se han ejecutado correctamente",
          "success"
        ).finally(() => {
          fetchData();
        });
      })
      .catch((error) => {
        Swal.fire(
          "Error",
          error.response.data.message ||
            "No se pudo ejecutar las planificaciones",
          "error"
        );
      });
  };

  if (loading) return <Loading />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className={styles.tableContainer}>
      <div className="d-flex justify-content-between mb-3 flex-wrap gap-2">
        <div className="d-flex gap-2 flex-grow-1">
          <input
            type="text"
            placeholder="Buscar plan por título, artículo o sector..."
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
          <HasPermission permissionName={"task_plans-create"}>
<CustomButton
          label="Crear Planificación"
          onClick={() => router.push("/dashboard/planificacion/crear")}
        />
          </HasPermission>

        
        <CustomButton
        className="btn btn-secondary"
          label="Ejecutar Planificaciones"
          onClick={EjecutarPlans}
        />
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
                  <option value="active">Activos</option>
                  <option value="inactive">Inactivos</option>
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label">Fecha inicio (inicio)</label>
                <input
                  type="date"
                  className="form-control"
                  value={
                    filters.start_at_start?.toISOString().split("T")[0] || ""
                  }
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      start_at_start: e.target.value
                        ? new Date(e.target.value)
                        : null,
                    })
                  }
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Fecha inicio (fin)</label>
                <input
                  type="date"
                  className="form-control"
                  value={
                    filters.start_at_end?.toISOString().split("T")[0] || ""
                  }
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      start_at_end: e.target.value
                        ? new Date(e.target.value)
                        : null,
                    })
                  }
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Fecha fin (inicio)</label>
                <input
                  type="date"
                  className="form-control"
                  value={
                    filters.end_at_start?.toISOString().split("T")[0] || ""
                  }
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      end_at_start: e.target.value
                        ? new Date(e.target.value)
                        : null,
                    })
                  }
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Fecha fin (fin)</label>
                <input
                  type="date"
                  className="form-control"
                  value={filters.end_at_end?.toISOString().split("T")[0] || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      end_at_end: e.target.value
                        ? new Date(e.target.value)
                        : null,
                    })
                  }
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
              <th>Sector</th>
              <th>Frecuencia</th>
              <th>Participantes</th>
              <th>Días</th>
              <th>Hora Límite</th>

              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((plan) => (
                <tr key={plan.id}>
                  <td>{plan.id}</td>
                  <td>{plan.title}</td>
                  <td>{plan.sector_display_name || "N/A"}</td>
                  <td>
                    <span className="badge bg-info text-capitalize">
                      {plan.frequency}
                    </span>
                  </td>
                  <td>
                    <span
                      className="badge bg-primary"
                      onClick={() => showParticipantes(plan)}
                      style={{ cursor: "pointer" }}
                    >
                      {plan.participants.length}
                    </span>
                  </td>
                  <td>
                    <small>{formatDays(plan.frequency, plan.days)}</small>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-1">
                      <FiClock size={14} />
                      {plan.deadline_time}
                    </div>
                  </td>
                  <td>{formatDate(plan.start_at)}</td>
                  <td>
                    {plan.end_at ? formatDate(plan.end_at) : "Indefinido"}
                  </td>
                  <td>
                    {plan.is_active ? (
                      <span className="badge bg-success d-flex align-items-center gap-1">
                        <FiCheckCircle size={12} /> Activo
                      </span>
                    ) : (
                      <span className="badge bg-secondary d-flex align-items-center gap-1">
                        <FiXCircle size={12} /> Inactivo
                      </span>
                    )}
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                   

                      {/* <button
                        onClick={() =>
                          router.push(
                            `/dashboard/planificacion/editar/${plan.id}`
                          )
                        }
                        className="btn btn-sm btn-warning"
                        title="Editar"
                      >
                        <FaRegEdit />
                      </button> */}
                        <HasPermission permissionName={"task_plans-delete"}>
   <button
                        onClick={() => handleDelete(plan.id)}
                        className="btn btn-sm btn-danger"
                        title="Eliminar"
                      >
                        <FaRegTrashAlt />
                      </button>
                        </HasPermission>
                   
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="text-center py-4">
                  No se encontraron planes de tareas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between mt-3">
        <div className={styles.recordCount}>
          Mostrando {(pagination.current_page - 1) * pagination.per_page + 1} a{" "}
          {Math.min(
            pagination.current_page * pagination.per_page,
            pagination.total
          )}{" "}
          de {pagination.total} registros
        </div>

        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Anterior
              </button>
            </li>

            {Array.from(
              { length: Math.min(5, pagination.last_page) },
              (_, i) => {
                let pageNum;
                if (pagination.last_page <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= pagination.last_page - 2) {
                  pageNum = pagination.last_page - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <li
                    key={pageNum}
                    className={`page-item ${
                      currentPage === pageNum ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  </li>
                );
              }
            )}

            <li
              className={`page-item ${
                currentPage === pagination.last_page ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Siguiente
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <ViewParticipantes
        tasks={selectedPlan}
        open={isModalView}
        close={() => setIsModalView(false)}
        refetch={fetchData}
      />
    </div>
  );
}

export default Tabla;
