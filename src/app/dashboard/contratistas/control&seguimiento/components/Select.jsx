"use client";
import React, { useEffect, useState } from "react";
import CustomButton from "@/app/components/CustomBotton";
import styles from "./styles/Select.module.css"; // Asegúrate de importar el archivo CSS
import { axioInstance } from "@/app/utils/axioInstance";
import { useRouter } from "next/navigation";

function Select() {
  const [data, setData] = useState([]); // Aquí almacenamos las opciones
  const [contratSelect, setContratSelect] = useState(null); // Almacenamos el objeto completo
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axioInstance.get("/contratistas/all");
        const result = response.data;
        const formattedOptions = result.map((contratist) => ({
          value: contratist.id, // Usamos el id como valor
          label: contratist.NombreContr, // Mostramos el NombreContr en el select
          ...contratist, // Guardamos todo el objeto para más flexibilidad
        }));

        setData(formattedOptions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = (path) => {
    if (contratSelect) {
      // Cambiar a la ruta correspondiente utilizando el id del contratista seleccionado como un parámetro
      router.push(`/dashboard/contratistas/control&seguimiento/${path}?id=${contratSelect.value}`);
    } else {
      alert("Seleccione una contratista primero");
    }
  };

  return (
    <div>
      <div
        className="container"
        style={{
          width: "50%",
          position: "relative",
          marginLeft: "20px",
          marginRight: "20px",
          marginTop: "20px",
        }}
      >
        <div className={styles.selectContainer}>
          <div className={styles.containerSelect}>
            <label className={styles.selectLabel} htmlFor="select">
              Seleccione una contratista
            </label>
            <select
              id="select"
              className={styles.select}
              defaultValue="" // Para manejar el valor por defecto
              onChange={(e) => {
                const selectedValue = e.target.value;
                const selectedContrat = data.find(
                  (contratist) => contratist.value.toString() === selectedValue // Convierte a string para comparar
                );
                console.log("Selected contractor:", selectedContrat); // Muestra el contratista seleccionado
                setContratSelect(selectedContrat); // Establece el contratista seleccionado
              }}
            >
              <option value="" disabled>
                Seleccione una contratista
              </option>
              {data.map((contratist) => (
                <option key={contratist.value} value={contratist.value}>
                  {contratist.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-2">
          <CustomButton
            label="CONTROL"
            backgroundColor="#EE3333"
            textColor="#ffffff"
            style={{
              padding: "10px",
              width: "50%",
            }}
            onClick={() => handleButtonClick("control")}
          />
        </div>
        <div className="mt-2">
          <CustomButton
            label="SEGUIMIENTO"
            backgroundColor="#161A6A"
            textColor="#ffffff"
            style={{
              padding: "10px",
              width: "50%",
            }}
            onClick={() => handleButtonClick("seguimiento")}
          />
        </div>
      </div>
    </div>
  );
}

export default Select;
