"use client";
import React, { useState } from "react";
import InputField from "@/app/dashboard/administradores/registrar/components/InputField"; // Ajusta la ruta según tu estructura
import CustomButton from "@/app/components/CustomBotton";
function FormCrear() {
  const [textValue, setTextValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [tipoUser,setTipoUser]= useState("")

  const handleTextChange = (e) => setTextValue(e.target.value);
  const handlePasswordChange = (e) => setPasswordValue(e.target.value);
  const handleSelectChange = (e) => setSelectValue(e.target.value);
  const handleTipoChange = (e)=>setTipoUser(e.target.value);



  return (
    <form>
      <div className="row">
        <div className="col-md-6">
          <InputField
            label="Ingrese el RIF de Contratista  "
            type="text"
            placeholder="Por Favor el RIF de Contratista..."
            value={textValue}
            onChange={handleTextChange}
          />
        </div>
        <div className="col-md-6">
          <InputField
            label="Gerencia Contratante"
            type="text"
            placeholder="Por Favor Ingrese la Gerencia Contratante..."
            value={textValue}
            onChange={handleTextChange}
          />
        </div>
        <div className="col-md-6">
          <InputField
            label="Ingrese el nombre de la Contratista"
            type="text"
            placeholder="Por Favor Ingrese el nombre de la Contratista"
            value={textValue}
            onChange={handleTextChange}
          />
        </div>
        <div className="col-md-6">
          <InputField
            label="Ingrese el Telefono de la Contratista"
            type="text"
            placeholder="Por Favor Ingrese el telefono..."
            value={textValue}
            onChange={handleTextChange}
          />
        </div>
        <div className="col-md-6">
          <InputField
            label="Ingrese dirección de la Contratista"
            type="text"
            placeholder="Ingrese dirección de la Contratista "
            value={selectValue}
            onChange={handleSelectChange}
          />
        </div>
        <div className="col-md-6">
          <InputField
            label="Ingrese el Correo de la Contratista "
            type="text"
            placeholder="Ingrese el Correo de la Contratista "
            value={tipoUser}
            onChange={handleTipoChange}
          />
        </div>
      </div>
      <CustomButton
        label="Registrar Contratista"
        backgroundColor="#EE3333"
        textColor="#ffffff"
        onClick={
          () => {
            alert("Administrador Registrado");
          }
        }
       
      />
       <CustomButton
        label="Limpiar Formulario"
        backgroundColor="#5B5B5B"
        textColor="#ffffff"
        onClick={
          () => {
            alert("Administrador Registrado");
          }
        }
        style={{
            marginLeft: "15px",
        }}
       
      />
    </form>
  );
}

export default FormCrear;
