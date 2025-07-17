"use client";

import React, { useState } from "react";
import Modal from "react-modal";
import { axioInstance } from "../../../../utils/axioInstance";

// Estilos personalizados para el modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    border: "none",
    borderRadius: "12px",
    overflow: "hidden",
    width: "90%",
    maxWidth: "550px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 1050,
    backdropFilter: "blur(3px)",
  },
};

function EditDepartmentModal({ isOpen, onRequestClose, department, onUpdate }) {
  const [formData, setFormData] = useState({
    title: department?.title || "",
    id: department?.id || "",
    description: department?.description || "",
    active: department?.active,
    article_id: department?.arti,
    sector_id: department?.sector,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sectors, setSectors] = useState([]);
  const [loadingSector, setLoadingSector] = useState(true);

  const [articulos, setArticulos] = useState([]);
  const [loadingArticulos, setLoadingArticulos] = useState(true);
  React.useEffect(() => {
    setFormData({
      title: department?.title || "",
      id: department?.id || "",
      description: department?.description || "",
      article_id: department?.arti,
      sector_id: department?.sector,
    });
  }, [department]);
  React.useEffect(() => {
    const fetchSectores = async () => {
      try {
        const response = await axioInstance.get("/sectors?paginate=0");
        setSectors(response.data.data);
        setLoadingSector(false);
      } catch (error) {
        console.error("Error al cargar los sectores:", error);
        setLoadingSector(false);
        toast.error("Error al cargar los sectores disponibles", {
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

    const fetchArticulos = async () => {
      try {
        const response = await axioInstance.get("/articles?paginate=0");
        setArticulos(response.data.data);
        setLoadingArticulos(false);
      } catch (error) {
        console.error("Error al cargar los articulos:", error);
        setLoadingArticulos(false);
        toast.error("Error al cargar los articulos disponibles", {
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

    fetchArticulos();
    fetchSectores();
  }, []);

  const sectoresOptions = sectors.map((area) => ({
    value: area.id,
    label: area.display_name,
  }));

  const articulosOptions = articulos.map((area) => ({
    value: area.id,
    label: area.display_name,
  }));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axioInstance.put(
        `/tasks/${department.id}`,
        formData
      );
      onUpdate(response.data.data);
      onRequestClose();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Error al actualizar la tarea. Por favor, intente nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Editar Tarea"
      closeTimeoutMS={300}
    >
      <div className="modal-dialog">
        <div className="modal-content border-0">
          {/* Encabezado con gradiente */}
          <div
            className="modal-header border-0 text-white"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              justifyContent: "space-between",
              padding: "20px",
            }}
          >
            <h5 className="modal-title fw-bold">
              <i className="bi bi-pencil-square me-2"></i>
              Editar Tarea
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onRequestClose}
              aria-label="Close"
            ></button>
          </div>

          {/* Cuerpo del modal */}
          <div className="modal-body p-4">
            {error && (
              <div
                className="alert alert-danger d-flex align-items-center"
                role="alert"
              >
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                <div>{error}</div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Campo Nombre */}
              <div className="mb-4">
                <label
                  htmlFor="display_name"
                  className="form-label fw-semibold"
                >
                  <i className="bi bi-building me-2 text-primary"></i>
                  Titulo de la tarea
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="bi bi-fonts"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Ej: Recursos Humanos"
                  />
                </div>
              </div>

              {/* Campo Descripción */}
              <div className="mb-4">
                <label htmlFor="description" className="form-label fw-semibold">
                  <i className="bi bi-card-text me-2 text-primary"></i>
                  Descripción
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="bi bi-text-paragraph"></i>
                  </span>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Breve descripción de la tarea..."
                    style={{ minHeight: "100px" }}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="form-label fw-semibold">
                  <i className="bi bi-card-text me-2 text-primary"></i>
                  Articulo
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="bi bi-text-paragraph"></i>
                  </span>
                  <select
                    className="form-select"
                    id="article_id"
                    name="article_id"
                    value={formData.article_id}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar Articulo</option>
                    {articulosOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="form-label fw-semibold">
                  <i className="bi bi-card-text me-2 text-primary"></i>
                  Sector
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="bi bi-text-paragraph"></i>
                  </span>
                  <select
                    className="form-select"
                    id="sector_id"
                    name="sector_id"
                    value={formData.sector_id}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar Sector</option>
                    {sectoresOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pie del modal */}
              <div className="modal-footer border-0 pt-4 px-0">
                <button
                  type="button"
                  className="btn btn-outline-secondary px-4 rounded-pill"
                  onClick={onRequestClose}
                  disabled={loading}
                >
                  <i className="bi bi-x-circle me-2"></i>
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary px-4 rounded-pill"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Guardando...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle me-2"></i>
                      Guardar Cambios
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default EditDepartmentModal;
