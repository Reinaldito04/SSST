"use client";
import React, { useState,useEffect } from "react";
import InputField from "./InputField"; // Ajusta la ruta según tu estructura
import CustomButton from "../../../../components/CustomBotton";
import { axioInstance } from "../../../../utils/axioInstance";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Form() {
  const [roles,setRoles]=useState([])
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axioInstance.get("/roles");
        setRoles(response.data.data);
      } catch (error) {
        console.error("Error al obtener los roles:", error);
      }
    };
    fetchRoles();
  }, []);

  const MySwal = withReactContent(Swal);
  const [data, setData] = useState({
    name: "",
    typeUser: "",
    password: "",
    Status: "",
    mail: "",
    passwordrepeat: "",
  });

  const estadoOpcions = [
    { value: "Activo", label: "Activo" },
    { value: "Inactivo", label: "Inactivo" },
  ];

  const tipoUsuario = roles.map((rol) => ({
    value: rol.id,
    label: rol.display_name,
  }));

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
      data.Status === "" || data.mail === "" || data.passwordrepeat === ""
      
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
        const response = await axioInstance.post("/users", {
          name: data.name,
          email: data.mail,
          role_id: data.typeUser,
          password: data.password,
          password_confirmation: data.passwordrepeat,
        });
        console.log(response.data);
  
        setData({
          name: "",
          typeUser: "",
          password: "",
          Status: "",
          mail: "",
          passwordrepeat: "",
        });
  
        MySwal.fire({
          title: "Usuario registrado con exito",
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        let errorMessage = error.response.data.message;
        MySwal.fire({
          title: errorMessage || "Error al registrar el usuario",
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
            label="Ingrese el correo del Usuario"
            type="text"
            placeholder="Por favor ingrese Correo..."
            value={data.mail}
            onChange={(e) => setData({ ...data, mail: e.target.value })}
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
            label="Ingrese la contraseña de nuevo"
            type="password"
            placeholder="Por favor ingrese Contraseña Usuario..."
            value={data.passwordrepeat}
            onChange={(e) => setData({ ...data, passwordrepeat: e.target.value })}
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
