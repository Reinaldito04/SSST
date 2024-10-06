"use client";

import React, { useState } from "react";
import styles from "@/app/dashboard/administradores/consultar/styles/Tabla.module.css";
import CustomButton from "@/app/components/CustomBotton";
function Tabla() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5; // Cambia este valor según cuántos elementos quieras por página

  const data = [
    {
      codigo: 1,
      EmpresaContratista: "MMGROUP",
      AnexoA: "APTA",
      AnexoB: "Entregado/Cumple",
      PDTART: "Revisados",
      Planificado: "4",
      Ejecutado: "4",
      Cumpl: "100%",
      EvaluacionFinal: "APTA",
    },

    // Agrega más filas aquí si lo deseas
  ];

  const filteredData = data.filter((row) =>
    row.EmpresaContratista.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);



  return (
    <div className={styles.tableContainer}>
      
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Empresa Contratista</th>
            <th>Anexo A</th>
            <th>Anexo B</th>
            <th>PDT/ART</th>
            <th>Planificado</th>
            <th>Ejecutado</th>
            <th>% Cumpl</th>
            <th>Evaluacion Final</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>{row.codigo}</td>
                <td>{row.EmpresaContratista}</td>
                <td>{row.AnexoA}</td>
                <td>{row.AnexoB}</td>
                <td>{row.PDTART}</td>
                <td>{row.Planificado} </td>
                <td> {row.Ejecutado} </td>
                <td> {row.Cumpl} </td>
                <td> {row.EvaluacionFinal} </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className="">
        <div className=""
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "10px",
          alignItems: "center",
          width: "100%",
          marginTop: "150px",
          marginBottom: "10px",
        }}
        >
          <CustomButton
            label="Exportar Excel"
            backgroundColor="#0EB200"
            textColor="#ffffff"
            style={
                {
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
               
                  justifyContent: "center",
                  padding: "10px 40px",
                }
            }
            onClick={() => {
              alert("Administrador Registrado");
            }}
          />
           <CustomButton
            label="Ver Gráfica"
            backgroundColor="#EE3333"
            textColor="#ffffff"
            style={
                {
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                
                  justifyContent: "center",
                  padding: "10px 40px",
                }
            }
            onClick={() => {
              alert("Administrador Registrado");
            }}
          />
        </div>
      </div>

    </div>
  );
}

export default Tabla;
