"use client";
import React, { useState } from "react";
import InputComponent from "../../crear/components/InputsModify";
import styles from "../../crear/styles/inputComponent.module.css";
import clsx from "clsx";
import CustomButton from "@/app/components/CustomBotton";
const FormSeguimiento = () => {
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
            SEGUIMIENTO DE LAS ACCIONES CORRECTIVAS
          </h2>
        </div>
        <div className="row container-fluid">
          <div className="col-md-4">
            <InputComponent
              label="Detección"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4">
            <InputComponent
              label="Seguimiento"
              value={selectValue}
              onChange={handleSelectChange}
            />
          </div>

          <div className="col-md-4 text-center d-flex mx-auto">
            <InputComponent
              label="Avance %"
              value={selectValue}
              onChange={handleSelectChange}
            />
          </div>
          <div className="col-md-6 mt-4  ">
            <InputComponent
              label="Responsable"
              value={selectValue}
              onChange={handleSelectChange}
            />
          </div>
        </div>
        <div className="row container">
            
            <div className="col-md-6 mt-4">
                <label htmlFor="">Observaciones:</label>
            <textarea
            id="accionesCorrectivas:"
            className={`form-control ${styles.textareaStyled}`} // Aplica la clase personalizada
          ></textarea>
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

export default FormSeguimiento;
