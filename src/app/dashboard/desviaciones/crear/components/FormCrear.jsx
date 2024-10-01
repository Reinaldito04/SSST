"use client";
import React, { useState } from "react";
import InputComponent from "./InputsModify";
import styles from "../styles/inputComponent.module.css";

import clsx from "clsx";
import CustomSelectComponent from "./CustomSelect";
import CustomButton from "@/app/components/CustomBotton";
const Form = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
  };

  return (
    <div>
      <form action="">
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
            ></textarea>
          </div>
          <div className="col-md-4">
            <InputComponent
              label="Area"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4">
            <InputComponent
              label="Causa Raíz"
              value={selectValue}
              onChange={handleSelectChange}
            />
          </div>

          <div className="col-md-4 text-center d-flex mx-auto">
            <InputComponent
              label="Tipo de Inspección"
              value={selectValue}
              onChange={handleSelectChange}
            />
          </div>
        </div>

        <div className={clsx(styles.contenedorTexto2, "container-fluid")}>
          <h2 className="text-center">ANALISIS DE RIESGO</h2>
        </div>
        <div className=" mt-4">
          <div className="row container-fluid">
            <div className="col-md-4">
              <InputComponent
                label="Severidad"
                value={selectValue}
                onChange={handleSelectChange}
              />
            </div>
            <div className="col-md-4">
              <InputComponent
                label="Frecuencia"
                value={selectValue}
                onChange={handleSelectChange}
              />
            </div>
            <div className="col-md-4">
              <CustomSelectComponent
                label="Nivel"
                value={selectValue}
                onChange={handleSelectChange}
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
            <label htmlFor="descripcionHallazgo">Acciones Correctivas::</label>

            <div className="col-md-4">
              <textarea
                id="accionesCorrectivas:"
                className={`form-control ${styles.textareaStyled}`} // Aplica la clase personalizada
              ></textarea>
            </div>
            <div className="col-md-4">
              <InputComponent
                label="Detección"
                value={selectValue}
                onChange={handleSelectChange}
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
            onClick={() => {
              alert("Administrador Registrado");
            }}
          />
            <CustomButton
            className="ms-2"
            label="Limpiar datos"
            backgroundColor="#5B5B5B"
            textColor="#ffffff"
            style={{ width: "200px" }}
            onClick={() => {
              alert("Administrador Registrado");
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
