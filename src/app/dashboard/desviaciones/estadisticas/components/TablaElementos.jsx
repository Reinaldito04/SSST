'use client'
import React, { useEffect, useState } from "react";
import styles from "./Table.module.css";
import { axioInstance } from "@/app/utils/axioInstance";
import Loading from "@/app/components/Loading";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hacer la petición al backend usando Axios
    axioInstance
      .get("/desviaciones/resumen") // Cambia esta URL por la correcta en tu backend
      .then((response) => {
        setData(response.data); // Asumiendo que el backend devuelve un array de desviaciones
        setLoading(false);
      })
      .catch((error) => {
        setError("Error al obtener los datos");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading/>; // Muestra un mensaje de carga
  }

  if (error) {
    return <div>{error}</div>; // Muestra un mensaje de error si ocurre
  }

  const total = data.reduce(
    (acc, item) => {
      acc.detectadas += item.desviaciones_detectadas;
      acc.corregidas += item.desviaciones_corregidas;
      return acc;
    },
    { detectadas: 0, corregidas: 0 }
  );

  const TotalNivel = data.reduce(
    (acc, item) => {
      acc.bajo += item.nivel_riesgo.bajo;
      acc.medio += item.nivel_riesgo.medio;
      acc.alto += item.nivel_riesgo.alto;
      return acc;
    },
    { bajo: 0, medio: 0, alto: 0 }
  );

  return (
    <div className={styles.tableContainer}>
      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th>Área</th>
            <th>Desviaciones Detectadas</th>
            <th colSpan="3" className={styles.riskColumn}>
              Nivel de Riesgo
              <div className={styles.riskSubcolumns}>
                <span className={styles.bajo}>Bajo</span>
                <span className={styles.medio}>Medio</span>
                <span className={styles.alto}>Alto</span>
              </div>
            </th>
            <th>Desviaciones Corregidas</th>
            <th>% Desviaciones Corregidas</th>
            <th>Estatus General</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.area}</td>
              <td>{item.desviaciones_detectadas}</td>
              <td>{item.nivel_riesgo.bajo}</td>
              <td>{item.nivel_riesgo.medio}</td>
              <td>{item.nivel_riesgo.alto}</td>
              <td>{item.desviaciones_corregidas}</td>
              <td>{item.porcentaje_corregidas} %</td>
              <td>{item.porcentaje_corregidas >= 50 ? "Buena" : "Revisar"}</td>
            </tr>
          ))}
          <tr>
            <td>
              <strong>Total</strong>
            </td>
            <td>
              <strong>{total.detectadas}</strong>
            </td>
            <td>{<strong>{TotalNivel.bajo}</strong>}</td>
            <td>{<strong>{TotalNivel.medio}</strong>}</td>
            <td>{<strong>{TotalNivel.alto}</strong>}</td>
            <td>
              <strong>{total.corregidas}</strong>
            </td>
            <td>
              <strong>
                {((total.corregidas / total.detectadas) * 100).toFixed(0)}%
              </strong>
            </td>
            <td>
              {(total.corregidas / total.detectadas) * 100 >= 50
                ? "Buena"
                : "Revisar"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
