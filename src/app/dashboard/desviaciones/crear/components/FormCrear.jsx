"use client";
import React, { useState } from "react";
import InputComponent from "./InputsModify";
import styles from "../styles/inputComponent.module.css";
import clsx from "clsx";
import CustomSelectComponent from "./CustomSelect";
import CustomButton from "@/app/components/CustomBotton";
import { axioInstance } from "@/app/utils/axioInstance";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'

const Form = () => {

  const MySwal = withReactContent(Swal)
  const [descripcion, setDescripcion] = useState(""); // Para la descripción
  const [area, setArea] = useState(""); // Para el área
  const [causaRaiz, setCausaRaiz] = useState(""); // Para la causa raíz
  const [tipoInspeccion, setTipoInspeccion] = useState(""); // Para el tipo de inspección
  const [severidad, setSeveridad] = useState(""); // Para la severidad
  const [frecuencia, setFrecuencia] = useState(""); // Para la frecuencia
  const [nivel, setNivel] = useState(""); // Para el nivel
  const [accionesCorrectivas, setAccionesCorrectivas] = useState(""); // Para las acciones correctivas
  const [deteccion, setDeteccion] = useState(""); // Para la detección

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };
  const clearInputs = ()=>{
    setDescripcion("");
    setArea("");
    setCausaRaiz("");
    setTipoInspeccion("");
    setSeveridad("");
    setFrecuencia("");
    setNivel("");
    setAccionesCorrectivas("");
    setDeteccion("");
  }
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    // Crea el objeto de datos
    const desviacionData = {
      Descripcion: descripcion,
      Area: area,
      CausaRaiz: causaRaiz,
      TipoInspeccion: tipoInspeccion,
      Severidad: severidad,
      Frecuencia: frecuencia,
      Nivel: nivel,
      AccionesCorrectivas: accionesCorrectivas,
      Deteccion: deteccion,
    };

    try {
      // Enviar la solicitud POST al backend
      const response = await axioInstance.post("/desviaciones/addDesviacion", desviacionData);
      // Si la solicitud es exitosa, mostrar un mensaje de éxito
      console.log(response.data);

      clearInputs();
      MySwal.fire({
        title: 'Desviación agregada',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      console.error("Error al agregar la desviación:", error);
      MySwal.fire({
        title: 'Error al agregar la desviación',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      })
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={clsx(styles.contenedorTexto, "container-fluid")}>
          <h2 className="text-center">
            DESVIACIÓN / CAUSA RAÍZ / TIPO DE INSPECCIÓN{" "}
          </h2>
        </div>
        <div className="row container-fluid">
          <label htmlFor="descripcionHallazgo">Descripción Hallazgo:</label>
          <div className="col-md-4">
            <textarea
              id="descripcionHallazgo"
              className={`form-control ${styles.textareaStyled}`} // Aplica la clase personalizada
              value={descripcion}
              onChange={(e) => handleInputChange(e, setDescripcion)} // Maneja el cambio de estado
            ></textarea>
          </div>
          <div className="col-md-4">
            <InputComponent
              label="Area"
              value={area}
              onChange={(e) => handleInputChange(e, setArea)} // Maneja el cambio de estado
            />
          </div>
          <div className="col-md-4">
            <InputComponent
              label="Causa Raíz"
              value={causaRaiz}
              onChange={(e) => handleInputChange(e, setCausaRaiz)} // Maneja el cambio de estado
            />
          </div>

          <div className="col-md-4 text-center d-flex mx-auto">
            <InputComponent
              label="Tipo de Inspección"
              value={tipoInspeccion}
              onChange={(e) => handleInputChange(e, setTipoInspeccion)} // Maneja el cambio de estado
            />
          </div>
        </div>

        <div className={clsx(styles.contenedorTexto2, "container-fluid")}>
          <h2 className="text-center">ANALISIS DE RIESGO</h2>
        </div>
        <div className="mt-4">
          <div className="row container-fluid">
            <div className="col-md-4">
              <InputComponent
                label="Severidad"
                value={severidad}
                onChange={(e) => handleInputChange(e, setSeveridad)} // Maneja el cambio de estado
              />
            </div>
            <div className="col-md-4">
              <InputComponent
                label="Frecuencia"
                value={frecuencia}
                onChange={(e) => handleInputChange(e, setFrecuencia)} // Maneja el cambio de estado
              />
            </div>
            <div className="col-md-4">
              <CustomSelectComponent
                label="Nivel"
                value={nivel}
                onChange={(e) => handleInputChange(e, setNivel)} // Maneja el cambio de estado
                placeholder="Nivel..."
                options={[
                  { value: "Bajo", label: "Bajo" },
                  { value: "Medio", label: "Medio" },
                  { value: "Alto", label: "Alto" },
                ]}
                type="select"
              />
            </div>
          </div>
          <div className="row container-fluid mt-3">
            <label htmlFor="accionesCorrectivas">Acciones Correctivas:</label>
            <div className="col-md-4">
              <textarea
                id="accionesCorrectivas"
                className={`form-control ${styles.textareaStyled}`} // Aplica la clase personalizada
                value={accionesCorrectivas}
                onChange={(e) => handleInputChange(e, setAccionesCorrectivas)} // Maneja el cambio de estado
              ></textarea>
            </div>
            <div className="col-md-4">
              <InputComponent
                label="Detección"
                value={deteccion}
                onChange={(e) => handleInputChange(e, setDeteccion)} // Maneja el cambio de estado
              />
            </div>
          </div>
        </div>
        <div className="container-fluid d-flex justify-content-end">
          <CustomButton
            label="Guardar"
            backgroundColor="#EE3333"
            textColor="#ffffff"
            className="me-2"
            style={{ width: "200px" }}
            type="submit" // Cambia a tipo submit para manejar el formulario
          />
          <CustomButton
            className="ms-2"
            label="Limpiar datos"
            backgroundColor="#5B5B5B"
            textColor="#ffffff"
            style={{ width: "200px" }}
            onClick={() => {
              clearInputs()
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
