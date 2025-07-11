"use client";
import React, { useState } from "react";
import InputField from "../../../administradores/registrar/components/InputField";
import CustomButton from "../../../../components/CustomBotton";
import { axioInstance } from "../../../../utils/axioInstance";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Form() {
  const MySwal = withReactContent(Swal);
  const [data, setData] = useState({
    name: "",
    display_name: "",
    description: "",
    active: true, // Valor por defecto como activo
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos requeridos
    if (data.name === "" || data.description === "") {
      toast.error("Por favor complete los campos obligatorios", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    try {
      const response = await axioInstance.post("/departments", {
        name: data.name,
        display_name: data.name,
        description: data.description,
        active: data.active,
      });

      // Limpiar formulario después del éxito
      setData({
        name: "",
        display_name: "",
        description: "",
        active: true,
      });

      MySwal.fire({
        title: "Departamento creado con éxito",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      let errorMessage = error.response?.data?.message || "Error al registrar el departamento";
      MySwal.fire({
        title: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="row">
        <div className="col-md-6">
          <InputField
            label="Nombre del Departamento*"
            type="text"
            placeholder="Ej: IT"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
          />
        </div>
      
        <div className="col-md-6">
          <InputField
            label="Descripción"
            type="text"
            placeholder="Ej: Departamento encargado de la tecnología..."
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </div>
       
      </div>
      <div style={{ marginTop: "20px" }}>
        <CustomButton
          label="Registrar Departamento"
          backgroundColor="#EE3333"
          textColor="#ffffff"
          type="submit"
        />
        <CustomButton
          label="Limpiar Formulario"
          backgroundColor="#5B5B5B"
          textColor="#ffffff"
          onClick={() => {
            setData({
              name: "",
              display_name: "",
              description: "",
              active: true,
            });
          }}
          style={{ marginLeft: "15px" }}
        />
      </div>
    </form>
  );
}

export default Form;