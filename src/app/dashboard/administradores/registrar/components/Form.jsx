"use client";
import React, { useState } from "react";
import InputField from "./InputField"; // Ajusta la ruta según tu estructura
import CustomButton from "@/app/components/CustomBotton";
import { axioInstance } from "@/app/utils/axioInstance";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Form() {
  const MySwal = withReactContent(Swal);
  const [data, setData] = useState({
    name: "",
    typeUser: "",
    password: "",
    UID: "",
    Code: "",
    Status: "",
  });

  const estadoOpcions = [
    { value: "Activo", label: "Activo" },
    { value: "Inactivo", label: "Inactivo" },
  ];

  const tipoUsuario = [
    { value: "Administrador", label: "Administrador" },
    { value: "Analista", label: "Analista" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado de envío del formulario

    if (data.password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      
    }

    if (data.name === "" || data.typeUser === "" || data.password === "" || 
      data.UID === "" || data.Code === "" || data.Status === ""
      
     ) {
      toast.error("Por favor complete todos los campos", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    else{
      try {
        const response = await axioInstance.post("/users/addUser", data);
        console.log(response.data);
  
        setData({
          name: "",
          typeUser: "",
          password: "",
          UID: "",
          Code: "",
          Status: "",
        });
  
        MySwal.fire({
          title: "Usuario registrado con exito",
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        MySwal.fire({
          title: "Error al registrar el usuario",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }

    
  };

  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="row">
        <div className="col-md-6">
          <InputField
            label="Ingrese el ID Usuario"
            type="text"
            placeholder="Por favor ingrese ID Usuario..."
            value={data.UID}
            onChange={(e) => setData({ ...data, UID: e.target.value })}
          />
        </div>
        <div className="col-md-6">
          <InputField
            label="Ingrese el código del Usuario"
            type="text"
            placeholder="Por favor ingrese Código Usuario..."
            value={data.Code}
            onChange={(e) => setData({ ...data, Code: e.target.value })}
          />
        </div>
        <div className="col-md-6">
          <InputField
            label="Ingrese el nombre de Usuario"
            type="text"
            placeholder="Por favor ingrese Nombre Usuario..."
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div className="col-md-6">
          <InputField
            label="Ingrese la contraseña"
            type="password"
            placeholder="Por favor ingrese Contraseña Usuario..."
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <div className="col-md-6">
          <InputField
            label="Estado Usuario"
            type="select"
            placeholder="Seleccione un estado..."
            options={estadoOpcions}
            value={data.Status}
            onChange={(e) => setData({ ...data, Status: e.target.value })}
          />
        </div>
        <div className="col-md-6">
          <InputField
            label="Tipo de Usuario"
            type="select"
            placeholder="Seleccione un tipo..."
            options={tipoUsuario}
            value={data.typeUser}
            onChange={(e) => setData({ ...data, typeUser: e.target.value })}
          />
        </div>
      </div>
      <CustomButton
        label="Registrar Administrador"
        backgroundColor="#EE3333"
        textColor="#ffffff"
        onClick={handleSubmit} // Cambié a `onClick={handleSubmit}` para que el botón ejecute la función de envío
      />
      <CustomButton
        label="Limpiar Formulario"
        backgroundColor="#5B5B5B"
        textColor="#ffffff"
        onClick={() => {
          setData({
            name: "",
            typeUser: "",
            password: "",
            UID: "",
            Code: "",
            Status: "",
          });
        }}
        style={{
          marginLeft: "15px",
        }}
      />
    </form>
  );
}

export default Form;
