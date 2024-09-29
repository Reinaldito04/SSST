"use client";
import React, { useState } from "react";
import InputField from "./InputField"; // Ajusta la ruta según tu estructura
import CustomButton from "@/app/components/CustomBotton";
function Form() {
  const [textValue, setTextValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [tipoUser,setTipoUser]= useState("")

  const handleTextChange = (e) => setTextValue(e.target.value);
  const handlePasswordChange = (e) => setPasswordValue(e.target.value);
  const handleSelectChange = (e) => setSelectValue(e.target.value);
  const handleTipoChange = (e)=>setTipoUser(e.target.value);

  const estadoOpcions = [
  
    { value: "Activo", label: "Activo" },
    { value: "Inactivo", label: "Inactivo" }
  ];
  const tipoUsuario = [
    { value: "Administrador", label: "Administrador" }
  ]

  return (
    <form>
      <div className="row">
        <div className="col-md-6">
          <InputField
            label="Ingrese el ID Usuario  "
            type="text"
            placeholder="Por Favor Ingrese ID Usuario..."
            value={textValue}
            onChange={handleTextChange}
          />
        </div>
        <div className="col-md-6">
          <InputField
            label="Ingrese el código del Usuario "
            type="text"
            placeholder="Por Favor Ingrese Código Usuario..."
            value={textValue}
            onChange={handleTextChange}
          />
        </div>
        <div className="col-md-6">
          <InputField
            label="Ingrese el nombre de Usuario"
            type="text"
            placeholder="Por Favor Ingrese Nombre Usuario..."
            value={textValue}
            onChange={handleTextChange}
          />
        </div>
        <div className="col-md-6">
          <InputField
            label="Ingrese la contraseña"
            type="password"
            placeholder="Por Favor Ingrese Contraseña Usuario..."
            value={textValue}
            onChange={handleTextChange}
          />
        </div>
        <div className="col-md-6">
          <InputField
            label="Estado Usuario"
            type="select"
            placeholder="Seleccione un estado..."
            options={estadoOpcions}
            value={selectValue}
            onChange={handleSelectChange}
          />
        </div>
        <div className="col-md-6">
          <InputField
            label="Tipo de Usuario"
            type="select"
            placeholder="Seleccione un tipo..."
            options={tipoUsuario}
            value={tipoUser}
            onChange={handleTipoChange}
          />
        </div>
      </div>
      <CustomButton
        label="Registrar Administrador"
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

export default Form;
