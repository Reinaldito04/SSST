"use client";

import React, { useState, useEffect } from "react";
import styles from "../styles/Tabla.module.css";
import { IoIosMore } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { axioInstance } from "../../../../utils/axioInstance";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import HasPermission from "../../../../components/HasPermission";
import Modal from "react-modal";

function Tabla() {
  const [activeRow, setActiveRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({ total: 0, per_page: 10 });
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    status: "",
    role: "",
  });

  const router = useRouter();
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axioInstance.get("/roles");
        setRoles(response.data.data);
      } catch (error) {
        console.error("Error al obtener los roles:", error);
      }
    };
    fetchRoles();
  }, []);
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
  const tipoUsuario = roles.map((rol) => ({
    value: rol.id,
    label: rol.display_name,
  }));
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

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      status: user.email_verified_at ? "activo" : "inactivo",
      role: user.roles?.[0]?.display_name,
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    try {
      await axioInstance.put(`/users/${selectedUser.id}`, {
        name: formData.name,
        email: formData.email,
        password: formData.password || undefined,
        status: formData.status === "activo" ? 1 : 0,
      });
      Swal.fire("Éxito", "Usuario actualizado correctamente", "success");
      setShowEditModal(false);
      fetchUsers(currentPage);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      Swal.fire("Error", "No se pudo actualizar el usuario", "error");
    }
  };

  const handleDelete = (userId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará al usuario.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
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
                    size={30}
                    style={{ cursor: "pointer", color: "#0d6efd" }}
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
                        title="Eliminar usuario"
                      >
                        <FaRegTrashAlt size={18} color="#dc3545" />
                      </button>
                      <button
                        className={styles.botonEditar}
                        onClick={() => handleEditUser(row)}
                        title="Editar usuario"
                      >
                        ✏️
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className={styles.recordCount}>
          Visualizando {users.length} de {meta.total} registros.
        </div>
        <HasPermission  Permission permissionName="users-add">
          <button
            className="btn btn-outline-primary"
            onClick={() => router.push("/dashboard/administradores/registrar")}
          >
            + Agregar Usuario
          </button>
        </HasPermission>
      </div>

      <div className={`${styles.pagination} mt-3`}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-sm btn-light me-2"
        >
          Anterior
        </button>
        <span className="fw-bold">Página {currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(meta.total / meta.per_page)}
          className="btn btn-sm btn-light ms-2"
        >
          Siguiente
        </button>
      </div>

      <Modal
        isOpen={showEditModal}
        onRequestClose={() => setShowEditModal(false)}
        contentLabel="Editar Usuario"
        className="custom-modal shadow-lg rounded-4"
        overlayClassName="custom-overlay"
      >
        <div className="p-4">
          <h3 className="text-center text-primary fw-bold mb-4">
            Editar Usuario
          </h3>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              id="nameInput"
              placeholder="Nombre de usuario"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <label htmlFor="nameInput">Usuario</label>
          </div>

          <div className="form-floating mb-3">
            <input
              className="form-control"
              id="emailInput"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <label htmlFor="emailInput">Correo Electrónico</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              placeholder="Contraseña nueva"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <label htmlFor="passwordInput">Contraseña (opcional)</label>
          </div>

          <div className="form-floating mb-4">
            <select
              className="form-select"
              id="roleSelect"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.display_name}
                </option>
              ))}
            </select>
            <label htmlFor="statusSelect">Rol</label>
          </div>

          <div className="form-floating mb-4">
            <select
              className="form-select"
              id="statusSelect"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
            <label htmlFor="statusSelect">Estado</label>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setShowEditModal(false)}
            >
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={handleEditSubmit}>
              Guardar Cambios
            </button>
          </div>
        </div>
      </Modal>

      <style jsx global>{`
        .custom-modal {
          position: absolute;
          top: 50%;
          left: 50%;
          right: auto;
          bottom: auto;
          transform: translate(-50%, -50%);
          background: #fff;
          width: 100%;
          max-width: 500px;
          border-radius: 1rem;
        }

        .custom-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }
      `}</style>
    </div>
  );
}

export default Tabla;
