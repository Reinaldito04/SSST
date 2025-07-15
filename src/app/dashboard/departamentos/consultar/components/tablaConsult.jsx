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

function Tabla() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    per_page: 5,
    current_page: 1,
    last_page: 1,
  });

  // Función para obtener datos con paginación
  const fetchData = async (page = 1, search = "") => {
    setLoading(true);
    try {
      const response = await axioInstance.get(
        `/departments?page=${page}&per_page=${pagination.per_page}&search_input=${search}`
      );
      
      setData(response.data.data);
      setPagination({
        total: response.data.total,
        per_page: response.data.per_page,
        current_page: response.data.current_page,
        last_page: response.data.last_page,
      });
      setError(null);
    } catch (err) {
      setError("Error al obtener los datos");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Efecto para cargar datos iniciales y cuando cambia la página o el término de búsqueda
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData(currentPage, searchTerm);
    }, 500); // Debounce para la búsqueda
    
    return () => clearTimeout(timer);
  }, [currentPage, searchTerm]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.last_page) {
      setCurrentPage(page);
    }
  };

  const handleEdit = (department) => {
    setSelectedDepartment(department);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (departmentId) => {
    Swal.fire({
      title: "Eliminar departamento",
      text: "¿Estás seguro de eliminar el departamento?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axioInstance.delete(`/departments/${departmentId}`);
          Swal.fire(
            "Eliminado",
            "El departamento ha sido eliminado.",
            "success"
          );
          // Recargar los datos manteniendo la página actual
          fetchData(currentPage, searchTerm);
        } catch (error) {
          console.error("Error al eliminar el departamento:", error);
          Swal.fire(
            "Error",
            "No se pudo eliminar el departamento.",
            "error"
          );
        }
      }
    });
  };

  const handleUpdate = (updatedDepartment) => {
    setData(data.map(dept => 
      dept.id === updatedDepartment.id ? updatedDepartment : dept
    ));
    setIsEditModalOpen(false);
  };

  if (loading) return <Loading />;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className={styles.tableContainer}>
      <input
        type="text"
        placeholder="Buscar departamento..."
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // Resetear a la primera página al buscar
        }}
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
                <td>{row.active ? "Activo" : "Inactivo"}</td>
                <td>{new Date(row.created_at).toLocaleDateString()}</td>
                <td>{new Date(row.updated_at).toLocaleDateString()}</td>
                <td>
                  <HasPermission permissionName="departments-edit">
                    <button
                      onClick={() => handleEdit(row)}
                      className="btn btn-primary mx-1"
                    >
                      Editar
                    </button>
                  </HasPermission>
                  <HasPermission permissionName="departments-delete">
                    <button
                      onClick={() => handleDelete(row.id)}
                      className="btn btn-danger mx-1"
                    >
                      Eliminar
                    </button>
                  </HasPermission>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4">
                No se encontraron departamentos
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="d-flex justify-content-between mt-3 align-items-center">
        <div className={styles.recordCount}>
          Mostrando {data.length} de {pagination.total} registros
        </div>
        
        <HasPermission permissionName="departments-add">
          <CustomButton
            label="Crear departamento"
            onClick={() => router.push("/dashboard/departamentos/crear")}
          />
        </HasPermission>
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

      <EditDepartmentModal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        department={selectedDepartment}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

export default Tabla;