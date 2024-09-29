'use client';
import { FaRegBell } from "react-icons/fa6";
import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
function AlertMessage() {
  const [isVisible, setIsVisible] = useState(true); // Estado para controlar la visibilidad de la alerta

  const handleClose = () => {
    setIsVisible(false); // Cambia el estado a falso para ocultar la alerta
  };

  if (!isVisible) return null; // Si no es visible, no renderiza nada

  return (
    <div
      style={{
        backgroundColor: "#ECE8E8",
      }}
      className={`alert text-black d-flex align-items-center justify-content-between`} 
      role="alert"
    >
      <div className="d-flex align-items-center">
        <FaRegBell size={30} className="me-2" /> {/* Icono de alerta */}
        <span
        className="fw-bolder fs-6"
          style={{
            fontSize: "16px",
          }}
        >
          Tome en consideración: Todos los campos marcados con{" "}
          <span
            style={{
              color: "#FF0000",
            }}
          >
            (*){" "}
          </span>{" "}
          son obligatorios
        </span>
      </div>
      <button
        onClick={handleClose}
        className="btn btn-link text-black ms-auto" // Añade ms-auto para empujar el botón a la derecha
        aria-label="Cerrar"
      >
        <IoCloseCircleOutline size={30}  />
      </button>
    </div>
  );
}

export default AlertMessage;
