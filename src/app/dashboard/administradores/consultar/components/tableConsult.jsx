"use client";

import React, { useState, useEffect } from "react";
import styles from "../styles/Tabla.module.css";
import { IoIosMore } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { axioInstance } from "@/app/utils/axioInstance";
import Swal from "sweetalert2"; // Importar SweetAlert2

function Tabla() {
  const [activeRow, setActiveRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]); // Estado para los datos de usuarios
  const itemsPerPage = 5;


  const fetchUsers = async () => {
    try {
      const response = await axioInstance.get("/users/getUsers");
      setData(response.data);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };
  // Llamada al backend para obtener los usuarios
  useEffect(() => {
   

    fetchUsers();
  }, []);

  const filteredData = data.filter(row =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const toggleSubmenu = (index) => {
    setActiveRow(activeRow === index ? null : index);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
//funcion para cambiar el estado del uusario

const handleEditStatus = async (userId) => {
  // Mostrar confirmación antes de proceder
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
      // Llamada al backend para cambiar el estado del usuario
      await axioInstance.put(`/users/updateStatus/${userId}`);
      
      // Mostrar mensaje de éxito
      Swal.fire({
        title: "Cambiado",
        text: "El estado del usuario ha sido cambiado correctamente.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
      
      // Recargar la lista de usuarios
      fetchUsers();
      
    } catch (error) {
      console.error("Error al cambiar el estado del usuario:", error);

      // Mostrar mensaje de error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.detail || "Hubo un error al cambiar el estado del usuario.",
        confirmButtonColor: "#d33",
      });
    }
  }
};

  

  // Función para mostrar SweetAlert al presionar "ELIMINAR"
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
        // Llamada al backend para eliminar el usuario
        const deleteUser = async () => {
          try {
            await axioInstance.delete(`/users/deleteUser/${userId}`);
          } catch (error) {
            console.error("Error al eliminar el usuario:", error);
          }
        };

        deleteUser();
        // Lógica para eliminar el usuario
        Swal.fire(
          "Eliminado",
          "El usuario ha sido eliminado correctamente.",
          "success"
        );

        // Llamada al backend para obtener los usuarios actualizados
        fetchUsers()
      }
    });
  };

  return (
    <div className={styles.tableContainer}>
      <input
        type="text"
        placeholder="Buscar usuario..."
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
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
          {currentData.map((row, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>****</td>
                <td>{row.Status}</td>
                <td>
                  <button className={styles.tableButton}>{row.typeUser}</button>
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
                  <td colSpan="1" className={styles.submenu}>
                    <div className={styles.submenuOptions}>
                      <button
                        className={styles.botonEliminar}
                        onClick={() => handleDelete(row.id)} // Evento para eliminar
                      >
                        ELIMINAR
                      </button>
                    </div>
                  </td>
                  <td colSpan="" className={styles.submenu}></td>
                  <td colSpan="1" className={styles.submenu}></td>
                  <td colSpan="1" className={styles.submenu}>
                    <div className={styles.submenuOptions}>
                      <button className={styles.botonEliminar}>
                        <FaRegTrashAlt
                          size={40}
                          style={{
                            cursor: "pointer",
                            color: "#FF0000",
                            transition: "all 0.3s ease-in-out",
                          }}
                          onClick={() => handleEditStatus(row.id)} // Evento para eliminar
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className={styles.recordCount}>
        Visualizando {startIndex + 1} a {endIndex} de {totalRecords} registros.
      </div>
      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <button className={styles.currentPage}>{currentPage}</button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Tabla;
