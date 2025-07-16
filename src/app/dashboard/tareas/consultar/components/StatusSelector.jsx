"use client";

import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FaChevronDown, FaCheck } from "react-icons/fa";
import Swal from "sweetalert2";
import { axioInstance } from "../../../../utils/axioInstance";
const statusOptions = [
  { value: "approve", label: "Aprobado", color: "#198754" },
  { value: "decline", label: "Cancelado", color: "#dc3545" },
  { value: "execute", label: "Ejecutado", color: "#0dcaf0" },
];
export const statusDictionary = {
  // Backend value -> Display value
  approve: "Aprobado",
  decline: "Cancelado", 
  execute: "Ejecutado",
  
  // Display value -> Backend value (inverso)
  Aprobado: "approve",
  Cancelado: "decline",
  Ejecutado: "execute"
};

// Función helper para traducir
export const translateStatus = (status, toBackend = false) => {
  if (toBackend) {
    return statusDictionary[status] || status; // Si no encuentra, devuelve el original
  }
  return statusDictionary[status] || status;
};



const StatusSelector = ({ task, onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
 const currentStatus = statusOptions.find(
  (opt) => opt.value === translateStatus(task.status, true)
) || statusOptions[0];
  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleStatusChange = async (newStatus) => {
    try {
      await axioInstance.post(`/tasks/${newStatus}`, {
        task_id: task.id,
      });
      onStatusChange(task.id, newStatus);
      setIsOpen(false);
    } catch (error) {
      console.error("Error al cambiar el estado:", error);
      Swal.fire("Error", error.response.data.message || "Error al cambiar el estado", "error");
    }
  };

  return (
    <SelectorContainer ref={dropdownRef}>
      <CurrentStatus
        $color={currentStatus.color}
        onClick={() => setIsOpen(!isOpen)}
        className="status-badge" // Clase para integración con tu tabla
      >
        {currentStatus.label}
        <FaChevronDown size={12} style={{ marginLeft: "4px" }} />
      </CurrentStatus>

      {isOpen && (
        <DropdownMenu $position={task.id % 2 === 0 ? "left" : "right"}>
          {statusOptions.map((option) => (
            <DropdownItem
              key={option.value}
              onClick={() => handleStatusChange(option.value)}
              $active={option.value === task.status}
            >
              <StatusDot $color={option.color} />
              {option.label}
              {option.value === task.status && (
                <FaCheck size={12} style={{ marginLeft: "auto" }} />
              )}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </SelectorContainer>
  );
};

// Estilos optimizados para integración con tablas
const SelectorContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const CurrentStatus = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${(props) => props.$color};
  color: white;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    opacity: 0.9;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  ${(props) => (props.$position === "right" ? "right: 0;" : "left: 0;")}
  margin-top: 4px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
  min-width: 160px;
  border: 1px solid #e0e0e0;
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  font-size: 12px;
  color: #333;
  cursor: pointer;
  background-color: ${(props) => (props.$active ? "#f8f9fa" : "white")};
  transition: all 0.2s;

  &:hover {
    background-color: #f1f1f1;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #f0f0f0;
  }
`;

const StatusDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.$color};
`;

export default StatusSelector;
