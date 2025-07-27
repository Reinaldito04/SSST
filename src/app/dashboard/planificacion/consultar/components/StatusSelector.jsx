"use client";

import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FaChevronDown, FaCheck } from "react-icons/fa";
import Swal from "sweetalert2";
import { axioInstance } from "../../../../utils/axioInstance";
import { useUserStore } from "../../../../store/userStore";
import HasPermission from "../../../../components/HasPermission";
const statusOptions = [
  { value: "execute", label: "Ejecutado", color: "#0dcaf0" },
  { value: "approve", label: "Aprobado", color: "#198754" },
  { value: "decline", label: "Cancelado", color: "#dc3545" },
  { value: "in_process", label: "En proceso", color: "#6c757d" },
];

export const statusDictionary = {
  "En proceso": "in_process",
  "Ejecutado": "execute",
  "Aprobado": "approve",
  "Cancelado": "decline",
  
  in_process: "En proceso",
  execute: "Ejecutado",
  approve: "Aprobado",
  decline: "Cancelado"
};

export const translateStatus = (status, toBackend = false) => {
  if (toBackend) {
    return statusDictionary[status] || status;
  }
  return statusDictionary[status] || status;
};

const StatusSelector = ({ task, onStatusChange }) => {
  const { user } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const getCurrentStatus = () => {
    const backendStatus = task.status;
    const selectorValue = translateStatus(backendStatus, true);
    
    return statusOptions.find(opt => opt.value === selectorValue) || 
           { value: "in_process", label: "En proceso", color: "#6c757d" };
  };

  const currentStatus = getCurrentStatus();

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
      // Validaciones generales
      if (task.status === "Cancelado" || task.status === "Aprobado") {
        Swal.fire("Error", "No se puede modificar una tarea ya aprobada o cancelada", "error");
        return;
      }

      // Validar transiciones de estado
      if (task.status === "En proceso" && newStatus === "approve") {
        Swal.fire("Error", "No se puede aprobar una tarea que no ha sido ejecutada", "error");
        return;
      }

      await axioInstance.post(`/tasks/${newStatus}`, {
        task_id: task.id,
      });
      onStatusChange(task.id, newStatus);
      setIsOpen(false);
    } catch (error) {
      console.error("Error al cambiar el estado:", error);
      Swal.fire("Error", error.response?.data?.message || "Error al cambiar el estado", "error");
    }
  };

  // Función para determinar las opciones disponibles
  const getAvailableOptions = () => {
    const baseOptions = [];

    // Opción Ejecutar (solo para no supervisores)
    if (!HasPermission({ permissionName: "tasks-supervise", children: true })) {
      if (task.status === "En proceso") {
        baseOptions.push(statusOptions.find(opt => opt.value === "execute"));
      }
    }

    // Opción En proceso (solo para no supervisores)
    // if (!HasPermission({ permissionName: "tasks-supervise", children: true })) {
    //   if (["En proceso", "Ejecutado"].includes(task.status)) {
    //     baseOptions.push(statusOptions.find(opt => opt.value === "in_process"));
    //   }
    // }

    // Opciones de aprobar y rechazar (para supervisores)
    if (HasPermission({ permissionName: "tasks-supervise", children: true })) {
      if (["En proceso", "Ejecutado"].includes(task.status)) {
        baseOptions.push(
          statusOptions.find(opt => opt.value === "approve"),
          statusOptions.find(opt => opt.value === "decline")
        );
      }
    } 

    // Filtrar opciones undefined y quitar duplicados
    return baseOptions.filter(opt => opt).filter((opt, index, self) =>
      index === self.findIndex(t => t.value === opt.value)
    );
  };

  const availableOptions = getAvailableOptions();
  const isDisabled = availableOptions.length === 0 || 
                    (availableOptions.length === 1 && 
                     availableOptions[0].value === translateStatus(task.status, true));

  return (
    <SelectorContainer ref={dropdownRef}>
      <CurrentStatus
        $color={currentStatus.color}
        onClick={() => !isDisabled && setIsOpen(!isOpen)}
        className="status-badge"
        $disabled={isDisabled}
      >
        {currentStatus.label}
        {!isDisabled && <FaChevronDown size={12} style={{ marginLeft: "4px" }} />}
      </CurrentStatus>

      {isOpen && !isDisabled && (
        <DropdownMenu $position={task.id % 2 === 0 ? "left" : "right"}>
          {availableOptions.map((option) => (
            <DropdownItem
              key={option.value}
              onClick={() => handleStatusChange(option.value)}
              $active={option.value === translateStatus(task.status, true)}
            >
              <StatusDot $color={option.color} />
              {option.label}
              {option.value === translateStatus(task.status, true) && (
                <FaCheck size={12} style={{ marginLeft: "auto" }} />
              )}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </SelectorContainer>
  );
};

// Estilos (se mantienen igual)
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
  cursor: ${(props) => (props.$disabled ? 'default' : 'pointer')};
  user-select: none;
  transition: all 0.2s;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: ${(props) => (props.$disabled ? 0.7 : 1)};

  &:hover {
    opacity: ${(props) => (props.$disabled ? 0.7 : 0.9)};
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