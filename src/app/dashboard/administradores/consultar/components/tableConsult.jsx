"use client";

import React, { useState } from "react";
import styles from "../styles/Tabla.module.css";
import { IoIosMore } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";

function Tabla() {
  const [activeRow, setActiveRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5; // Cambia este valor según cuántos elementos quieras por página

  const data = [
    { codigo: 1, usuario: "usuario1", contrasena: "****", estado: "Activo", tipo: "Admin" },
    { codigo: 2, usuario: "usuario2", contrasena: "****", estado: "Inactivo", tipo: "Usuario" },
    { codigo: 3, usuario: "usuario3", contrasena: "****", estado: "Activo", tipo: "Admin" },
    { codigo: 4, usuario: "usuario4", contrasena: "****", estado: "Inactivo", tipo: "Usuario" },
    { codigo: 5, usuario: "usuario5", contrasena: "****", estado: "Activo", tipo: "Admin" },
    { codigo: 6, usuario: "usuario6", contrasena: "****", estado: "Inactivo", tipo: "Usuario" },
    { codigo: 7, usuario: "usuario7", contrasena: "****", estado: "Activo", tipo: "Admin" },
    { codigo: 8, usuario: "usuario8", contrasena: "****", estado: "Inactivo", tipo: "Usuario" },
    { codigo: 9, usuario: "usuario9", contrasena: "****", estado: "Inactivo", tipo: "Usuario" },
    { codigo: 10, usuario: "usuario10", contrasena: "****", estado: "Activo", tipo: "Admin" },
    { codigo: 11, usuario: "usuario11", contrasena: "****", estado: "Inactivo", tipo: "Usuario" },
    { codigo: 12, usuario: "usuario12", contrasena: "****", estado: "Inactivo", tipo: "Usuario" },
    { codigo: 13, usuario: "usuario13", contrasena: "****", estado: "Activo", tipo: "Admin" },
    { codigo: 14, usuario: "usuario14", contrasena: "****", estado: "Inactivo", tipo: "Usuario" },
    // Agrega más filas aquí si lo deseas
  ];

  const filteredData = data.filter(row =>
    row.usuario.toLowerCase().includes(searchTerm.toLowerCase())
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
                <td>{row.codigo}</td>
                <td>{row.usuario}</td>
                <td>{row.contrasena}</td>
                <td>{row.estado}</td>
                <td style={{ width: "10%" }}>
                  <button className={styles.tableButton}>{row.tipo}</button>
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
                      <button className={styles.botonEliminar}>ELIMINAR</button>
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
