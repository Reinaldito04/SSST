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
    name: department?.name || "",
    id: department?.id || "",
    display_name: department?.display_name || "",
    description: department?.description || "",
    active: department?.active,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    setFormData({
      name: department?.name || "",
      id: department?.id || "",
      display_name: department?.display_name || "",
      description: department?.description || "",
      active: department?.active,
    });
  }, [department]);

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
        `/iers/${department.id}`,
        formData
      );
      onUpdate(response.data.data);
      onRequestClose();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Error al actualizar el IER. Por favor, intente nuevamente."
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
      contentLabel="Editar IER"
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
              Editar IER
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
                  Nombre del IER
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="bi bi-fonts"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="display_name"
                    name="display_name"
                    value={formData.display_name}
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
                    placeholder="Breve descripción del Articulo..."
                    style={{ minHeight: "100px" }}
                  />
                </div>
              </div>

              {/* Checkbox Activo */}
              <div className="mb-4 form-check form-switch">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="active"
                  name="active"
                  checked={formData.active}
                  onChange={handleChange}
                  role="switch"
                />
                <label
                  className="form-check-label fw-semibold"
                  htmlFor="active"
                >
                  <i className="bi bi-power me-2 text-primary"></i>
                  Articulo activo
                </label>
                <small className="text-muted d-block mt-1">
                  {formData.active
                    ? "(El Articulo está visible en el sistema)"
                    : "(El Articulo está oculto en el sistema)"}
                </small>
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
