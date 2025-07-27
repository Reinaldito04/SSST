"use client";
import React, { useState, useEffect } from "react";
import InputField from "../../../administradores/registrar/components/InputField";
import CustomButton from "../../../../components/CustomBotton";
import { axioInstance } from "../../../../utils/axioInstance";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import { FaCalendar } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

function Form() {
  const MySwal = withReactContent(Swal);
  const [sectors, setSectors] = useState([]);
  const [loadingSector, setLoadingSector] = useState(true);
  const [articulos, setArticulos] = useState([]);
  const [loadingArticulos, setLoadingArticulos] = useState(true);
  const [auditors, setAuditors] = useState([]);
  const [loadingAuditors, setLoadingAuditors] = useState(true);

  const [data, setData] = useState({
    title: "",
    description: "",
    activity_title: "",
    activity_description: "",
    audited_by: "",
    article_id: "",
    sector_id: "",
    frequency: "weekly",
    days: [],
    deadline_time: "09:00",
    start_at: "",
    end_at: "",
    is_active: true,
  });

  const frequencyOptions = [
    { value: "daily", label: "Diario" },
    { value: "weekly", label: "Semanal" },
    { value: "monthly", label: "Mensual" },
    { value: "yearly", label: "Anual" },
  ];

  const dayOptions = {
    weekly: [
      { value: 0, label: "Lunes" },
      { value: 1, label: "Martes" },
      { value: 2, label: "Miércoles" },
      { value: 3, label: "Jueves" },
      { value: 4, label: "Viernes" },
      { value: 5, label: "Sábado" },
      { value: 6, label: "Domingo" },
    ],
    monthly: [
      ...Array.from({ length: 31 }, (_, i) => ({
        value: i + 1,
        label: `Día ${i + 1}`,
      })),
      { value: "last", label: "Último día del mes" },
      { value: "last-1", label: "Penúltimo día del mes" },
      { value: "last-2", label: "Antepenúltimo día del mes" },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sectorsRes, articlesRes, auditorsRes] = await Promise.all([
          axioInstance.get("/sectors?paginate=0"),
          axioInstance.get("/articles?paginate=0"),
          axioInstance.get("/users?paginate=0"),
        ]);

        setSectors(sectorsRes.data.data);
        setArticulos(articlesRes.data.data);
        setAuditors(auditorsRes.data.data);

        setLoadingSector(false);
        setLoadingArticulos(false);
        setLoadingAuditors(false);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        toast.error("Error al cargar datos iniciales", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    };

    fetchData();
  }, []);

  const sectoresOptions = sectors.map((area) => ({
    value: area.id,
    label: area.display_name,
  }));

  const articulosOptions = articulos.map((area) => ({
    value: area.id,
    label: area.display_name,
  }));

  const auditorsOptions = auditors.map((user) => ({
    value: user.id,
    label: user.name,
  }));

  const handleDayChange = (e) => {
    const value =
      e.target.type === "checkbox"
        ? e.target.checked
          ? [...data.days, e.target.value]
          : data.days.filter((day) => day !== e.target.value)
        : e.target.value;

    setData({ ...data, days: Array.isArray(value) ? value : [value] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos requeridos
    const requiredFields = {
      title: data.title,
      activity_title: data.activity_title,
      article_id: data.article_id,
      sector_id: data.sector_id,
      frequency: data.frequency,
      deadline_time: data.deadline_time,
      start_at: data.start_at,
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      toast.error(
        `Por favor complete los campos obligatorios: ${missingFields.join(
          ", "
        )}`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
      return;
    }

    // Validación específica para días según frecuencia
    if (
      (data.frequency === "weekly" || data.frequency === "monthly") &&
      data.days.length === 0
    ) {
      toast.error(
        `Por favor seleccione al menos un día para la frecuencia ${data.frequency}`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
      return;
    }

    try {
      const payload = {
        ...data,
        days:
          data.frequency === "daily" || data.frequency === "yearly"
            ? []
            : data.days,
      };

      const response = await axioInstance.post("/task-plans", payload);

      // Limpiar formulario después del éxito
      setData({
        title: "",
        description: "",
        activity_title: "",
        activity_description: "",
        audited_by: "",
        article_id: "",
        sector_id: "",
        frequency: "weekly",
        days: [],
        deadline_time: "09:00",
        start_at: "",
        end_at: "",
        is_active: true,
      });

      MySwal.fire({
        title: "Plan de tarea creado con éxito",
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "btn btn-success",
        },
        buttonsStyling: false,
      });
    } catch (error) {
      let errorMessage =
        error.response?.data?.message || "Error al registrar el plan de tarea";
      MySwal.fire({
        title: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });
    }
  };

  const renderDaySelection = () => {
    if (data.frequency === "daily" || data.frequency === "yearly") {
      return null;
    }
    const formatDays = (frequency, days) => {
      if (frequency === "daily") return "Diario";
      if (frequency === "yearly") return "Anual";

      const dayLabels = {
        weekly: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"], // Ahora indexado correctamente
        monthly: {
          last: "Último día",
          "last-1": "Penúltimo",
          "last-2": "Antepenúltimo",
        },
      };

      return days
        .map((day) => {
          if (frequency === "weekly") {
            // Para frecuencia semanal, mostramos el valor + 1
            return dayLabels.weekly[day + 1] || `Día ${day + 1}`;
          }
          if (typeof day === "string" && dayLabels.monthly[day]) {
            return dayLabels.monthly[day];
          }
          return `Día ${day}`;
        })
        .join(", ");
    };
    return (
      <div className="col-md-12 mb-4">
        <h5 className="mb-0 fw-semibold ">
          <FaCalendar style={{ marginRight: "5px" }} />
          Seleccione los días{" "}
          {data.frequency === "weekly" ? "de la semana" : "del mes"}*
        </h5>
        <p className="text-muted mb-0 small">
          {data.frequency === "weekly"
            ? "Seleccione los días de la semana en que se repetirá la tarea"
            : "Seleccione los días específicos del mes para la tarea"}
        </p>
        <div className="card-body">
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
            {dayOptions[data.frequency].map((day) => {
              const isChecked =
                data.days.includes(day.value.toString()) ||
                data.days.includes(day.value);
              return (
                <div key={day.value} className="col">
                  <div
                    className={`card h-100 day-card ${
                      isChecked ? "border-primary" : ""
                    }`}
                  >
                    <div className="card-body p-2 d-flex flex-column align-items-center">
                      <div className="form-check form-switch mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`day-${day.value}`}
                          value={day.value}
                          checked={isChecked}
                          onChange={handleDayChange}
                          style={{ transform: "scale(1.3)" }}
                        />
                      </div>
                      <label
                        className="form-check-label text-center cursor-pointer"
                        htmlFor={`day-${day.value}`}
                        style={{ cursor: "pointer" }}
                      >
                        <div
                          className={`day-number ${
                            isChecked ? "bg-primary text-white" : "bg-light"
                          } 
                          rounded-circle d-flex align-items-center text-center justify-content-center mb-2`}
                          style={{ width: "40px", height: "40px" }}
                        >
                          {typeof day.value === "number"
                            ? data.frequency === "weekly"
                              ? day.value + 1
                              : day.value
                            : day.value === "last"
                            ? "Últ"
                            : day.value === "last-1"
                            ? "Ú-1"
                            : "Ú-2"}
                        </div>
                        <span
                          className={`small ${
                            isChecked ? "text-primary fw-bold" : "text-muted"
                          }`}
                        >
                          {day.label}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected days indicator */}
          {data.days.length > 0 && (
            <div className="mt-4 p-3 bg-light rounded">
              <h6 className="d-flex align-items-center gap-2">
                <i className="bi bi-check-circle-fill text-success"></i>
                Días seleccionados:
              </h6>
              <div className="d-flex flex-wrap gap-2 mt-2">
                {data.days.map((day) => {
                  const dayInfo = dayOptions[data.frequency].find(
                    (d) =>
                      d.value.toString() === day.toString() || d.value === day
                  );
                  return (
                    <span
                      key={day}
                      className="badge bg-primary bg-opacity-10 text-primary"
                    >
                      {dayInfo?.label || day}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <ToastContainer position="top-right" autoClose={5000} />

              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <InputField
                    label="Título del plan*"
                    type="text"
                    placeholder="Ej: Plan de backups"
                    value={data.title}
                    onChange={(e) =>
                      setData({ ...data, title: e.target.value })
                    }
                    required
                    className="form-control-lg"
                  />
                </div>

                <div className="col-md-6">
                  <InputField
                    label="Título de la actividad*"
                    type="text"
                    placeholder="Ej: Backup de base de datos"
                    value={data.activity_title}
                    onChange={(e) =>
                      setData({ ...data, activity_title: e.target.value })
                    }
                    required
                    className="form-control-lg"
                  />
                </div>

                <div className="col-md-6">
                  <InputField
                    label="Artículo*"
                    type="select"
                    options={articulosOptions}
                    placeholder="Seleccione un artículo"
                    value={data.article_id}
                    onChange={(e) =>
                      setData({ ...data, article_id: e.target.value })
                    }
                    required
                    loading={loadingArticulos}
                    className="form-select-lg"
                  />
                </div>

                <div className="col-md-6">
                  <InputField
                    label="Sector*"
                    type="select"
                    options={sectoresOptions}
                    placeholder="Seleccione un sector"
                    value={data.sector_id}
                    onChange={(e) =>
                      setData({ ...data, sector_id: e.target.value })
                    }
                    required
                    loading={loadingSector}
                    className="form-select-lg"
                  />
                </div>

                <div className="col-md-6">
                  <InputField
                    label="Auditor"
                    type="select"
                    options={auditorsOptions}
                    placeholder="Seleccione un auditor"
                    value={data.audited_by}
                    onChange={(e) =>
                      setData({ ...data, audited_by: e.target.value })
                    }
                    loading={loadingAuditors}
                    className="form-select-lg"
                  />
                </div>

                <div className="col-md-6">
                  <InputField
                    label="Frecuencia*"
                    type="select"
                    options={frequencyOptions}
                    value={data.frequency}
                    onChange={(e) =>
                      setData({ ...data, frequency: e.target.value, days: [] })
                    }
                    required
                    className="form-select-lg"
                  />
                </div>

                <div className="col-md-6">
                  <InputField
                    label="Hora límite*"
                    type="time"
                    value={data.deadline_time}
                    onChange={(e) =>
                      setData({ ...data, deadline_time: e.target.value })
                    }
                    required
                    className="form-control-lg"
                  />
                </div>

                <div className="col-md-6">
                  <InputField
                    label="Fecha de inicio*"
                    type="date"
                    value={data.start_at}
                    onChange={(e) =>
                      setData({ ...data, start_at: e.target.value })
                    }
                    required
                    className="form-control-lg"
                  />
                </div>

                <div className="col-md-6">
                  <InputField
                    label="Fecha de fin (opcional)"
                    type="date"
                    required={false}
                    value={data.end_at}
                    onChange={(e) =>
                      setData({ ...data, end_at: e.target.value })
                    }
                    className="form-control-lg"
                  />
                </div>

                <div className="col-md-6 d-flex align-items-center">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="is_active"
                      checked={data.is_active}
                      onChange={(e) =>
                        setData({ ...data, is_active: e.target.checked })
                      }
                      style={{ width: "3em", height: "1.5em" }}
                    />
                    <label
                      className="form-check-label ms-2 fs-5"
                      htmlFor="is_active"
                    >
                      Plan activo
                    </label>
                  </div>
                </div>
              </div>

              {renderDaySelection()}

              <div className="row g-3 mb-4">
                <div className="col-md-12">
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      id="description"
                      placeholder="Descripción general del plan..."
                      value={data.description}
                      onChange={(e) =>
                        setData({ ...data, description: e.target.value })
                      }
                      style={{ height: "100px" }}
                    />
                    <label htmlFor="description">
                      Descripción del plan (opcional)
                    </label>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      id="activity_description"
                      placeholder="Descripción específica para cada actividad generada..."
                      value={data.activity_description}
                      onChange={(e) =>
                        setData({
                          ...data,
                          activity_description: e.target.value,
                        })
                      }
                      style={{ height: "100px" }}
                    />
                    <label htmlFor="activity_description">
                      Descripción de la actividad (opcional)
                    </label>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end gap-3 mt-4">
                <button
                  type="button"
                  className="btn btn-secondary btn-lg"
                  onClick={() => {
                    setData({
                      title: "",
                      description: "",
                      activity_title: "",
                      activity_description: "",
                      audited_by: "",
                      article_id: "",
                      sector_id: "",
                      frequency: "weekly",
                      days: [],
                      deadline_time: "09:00",
                      start_at: "",
                      end_at: "",
                      is_active: true,
                    });
                  }}
                >
                  <i className="bi bi-eraser me-2"></i> Limpiar
                </button>
                <button type="submit" className="btn btn-primary btn-lg">
                  <i className="bi bi-save me-2"></i> Guardar Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
