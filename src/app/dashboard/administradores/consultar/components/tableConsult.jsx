"use client";

import React, { useState, useEffect } from "react";
import styles from "../styles/Tabla.module.css";
import { IoIosMore } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { axioInstance } from "../../../../utils/axioInstance";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import HasPermission from "../../../../components/HasPermission";
function Tabla() {
  const [activeRow, setActiveRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]); // Usuarios
  const [meta, setMeta] = useState({ total: 0, per_page: 10 }); // Datos de paginación
  const router = useRouter();
  const fetchUsers = async (page = 1) => {
    try {
      const response = await axioInstance.get(`/users?page=${page}`);
      const { data, total, per_page } = response.data;
      setUsers(data);
      setMeta({ total, per_page });
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const toggleSubmenu = (index) => {
    setActiveRow(activeRow === index ? null : index);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > Math.ceil(meta.total / meta.per_page)) return;
    setCurrentPage(page);
  };

  const handleEditStatus = async (userId) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas cambiar el estado del usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cambiar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await axioInstance.put(`/users/updateStatus/${userId}`);
        Swal.fire(
          "Cambiado",
          "El estado del usuario ha sido cambiado.",
          "success"
        );
        fetchUsers(currentPage);
      } catch (error) {
        console.error("Error al cambiar el estado del usuario:", error);
        Swal.fire("Error", "Hubo un error al cambiar el estado.", "error");
      }
    }
  };

  const handleDelete = (userId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará al usuario.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteUser = async () => {
          try {
            await axioInstance.delete(`/users/${userId}`);
            Swal.fire("Eliminado", "El usuario ha sido eliminado.", "success");
            fetchUsers(currentPage);
          } catch (error) {
            console.error("Error al eliminar el usuario:", error);
          }
        };
        deleteUser();
      }
    });
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Código</th>
            <th>Usuario</th>
            <th>Contraseña</th>
            <th>Estado</th>
            <th>Tipo de Usuario</th>
            <th>Modificar</th>
          </tr>
        </thead>
        <tbody>
          {users.map((row, index) => (
            <React.Fragment key={row.id}>
              <tr>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>****</td>
                <td>{row.email_verified_at ? "Activo" : "Inactivo"}</td>
                <td>
                  <button className={styles.tableButton}>
                    {row.roles?.[0]?.display_name || "Sin rol"}
                  </button>
                </td>
                <td>
                  <IoIosMore
                    size={40}
                    style={{
                      cursor: "pointer",
                      color: "#000000",
                      transition: "all 0.3s ease-in-out",
                    }}
                    onClick={() => toggleSubmenu(index)}
                  />
                </td>
              </tr>
              {activeRow === index && (
                <tr>
                  <td colSpan="6" className={styles.submenu}>
                    <div className={styles.submenuOptions}>
                      <button
                        className={styles.botonEliminar}
                        onClick={() => handleDelete(row.id)}
                      >
                        <FaRegTrashAlt size={20} color="#FF0000" />
                      </button>
                     
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between">
        <div className={styles.recordCount}>
          Visualizando {users.length} de {meta.total} registros.
        </div>
        <HasPermission permissionName='users-add'>
          <div>
            <button
              className="btn btn-primary mt-2"
              onClick={() =>
                router.push("/dashboard/administradores/registrar")
              }
            >
              Agregar
            </button>
          </div>
        </HasPermission>
      </div>

      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className={styles.currentPage}>{currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(meta.total / meta.per_page)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Tabla;
