"use client";
import React, { useState, useEffect } from "react";
import InputField from "../../../../administradores/registrar/components/InputField";
import CustomButton from "../../../../../components/CustomBotton";
import { axioInstance } from "../../../../../utils/axioInstance";
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
    active: true,
    area_id: "" // Nuevo campo para el área
  });

  const [areas, setAreas] = useState([]);
  const [loadingAreas, setLoadingAreas] = useState(true);

  // Cargar las áreas disponibles al montar el componente
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axioInstance.get("/areas");
        setAreas(response.data.data);
        setLoadingAreas(false);
      } catch (error) {
        console.error("Error al cargar las áreas:", error);
        setLoadingAreas(false);
        toast.error("Error al cargar las áreas disponibles", {
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
    };

    fetchAreas();
  }, []);
  const AreaOptions = areas.map((area) => ({
    value: area.id,
    label: area.display_name,
  }));
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos requeridos
    if (data.name === "" || data.display_name === "" || !data.area_id) {
      toast.error("Por favor complete todos los campos obligatorios", {
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
      const response = await axioInstance.post("/plants", {
        name: data.name,
        display_name: data.display_name,
        description: data.description,
        active: data.active,
        area_id: data.area_id
      });

      // Limpiar formulario después del éxito
      setData({
        name: "",
        display_name: "",
        description: "",
        active: true,
        area_id: ""
      });

      MySwal.fire({
        title: "Planta creada con éxito",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      let errorMessage = error.response?.data?.message || "Error al registrar la planta";
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
            label="Nombre de la Planta*"
            type="text"
            placeholder="Ej: destilación"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
          />
        </div>
        <div className="col-md-6">
          <InputField
            label="Nombre para Mostrar*"
            type="text"
            placeholder="Ej: Planta de Destilación"
            value={data.display_name}
            onChange={(e) => setData({ ...data, display_name: e.target.value })}
            required
          />
        </div>
        
        <div className="col-md-6">
          <InputField
            label="Area"
            type="select"
            placeholder="Seleccione el area..."
            options={AreaOptions}
            value={data.area_id}
            onChange={(e) => setData({ ...data, area_id: e.target.value })}
          />
        </div>
        
      
        <div className="col-md-6">
          <InputField
            label="Descripción"
            type="text"
            placeholder="Ej: Planta encargada del proceso de destilación..."
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </div>
      </div>
      
      <div style={{ marginTop: "20px" }}>
        <CustomButton
          label="Registrar Planta"
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
              area_id: ""
            });
          }}
          style={{ marginLeft: "15px" }}
        />
      </div>
    </form>
  );
}

export default Form;