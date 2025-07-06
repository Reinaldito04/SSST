"use client";
import React, { useState, useEffect } from "react";
import InputField from "../../../../../administradores/registrar/components/InputField";
import CustomButton from "../../../../../../components/CustomBotton";
import { axioInstance } from "../../../../../../utils/axioInstance";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SectorForm() {
  const MySwal = withReactContent(Swal);
  const [data, setData] = useState({
    name: "",
    display_name: "",
    description: "",
    active: true,
    plant_id: "" // Campo para vincular con la planta
  });

  const [plants, setPlants] = useState([]);
  const [loadingPlants, setLoadingPlants] = useState(true);

  // Cargar las plantas disponibles al montar el componente
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axioInstance.get("/plants");
        setPlants(response.data.data);
        setLoadingPlants(false);
      } catch (error) {
        console.error("Error al cargar las plantas:", error);
        setLoadingPlants(false);
        toast.error("Error al cargar las plantas disponibles", {
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

    fetchPlants();
  }, []);

  const PlantasOptions = plants.map((plant) => ({
    value: plant.id,
    label: `${plant.display_name} (${plant.area?.display_name || plant.area_name})`
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos requeridos
    if (data.name === "" || data.display_name === "" || !data.plant_id) {
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
      const response = await axioInstance.post("/sectors", {
        name: data.name,
        display_name: data.display_name,
        description: data.description,
        active: data.active,
        plant_id: data.plant_id
      });

      // Limpiar formulario después del éxito
      setData({
        name: "",
        display_name: "",
        description: "",
        active: true,
        plant_id: ""
      });

      MySwal.fire({
        title: "Sector creado con éxito",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      let errorMessage = error.response?.data?.message || "Error al registrar el sector";
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
            label="Nombre del Sector*"
            type="text"
            placeholder="Ej: control de calidad"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
          />
        </div>
        <div className="col-md-6">
          <InputField
            label="Nombre para Mostrar*"
            type="text"
            placeholder="Ej: Sector de Control de Calidad"
            value={data.display_name}
            onChange={(e) => setData({ ...data, display_name: e.target.value })}
            required
          />
        </div>
        
        <div className="col-md-6">
          <InputField
            label="Planta"
            type="select"
            placeholder="Seleccione la planta..."
            options={PlantasOptions}
            value={data.plant_id}
            onChange={(e) => setData({ ...data, plant_id: e.target.value })}
          />
        </div>
        
       
        
        <div className="col-md-6">
          <InputField
            label="Descripción"
            type="text"
            placeholder="Ej: Sector encargado del control de calidad de los productos..."
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </div>
      </div>
      
      <div style={{ marginTop: "20px" }}>
        <CustomButton
          label="Registrar Sector"
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
              plant_id: ""
            });
          }}
          style={{ marginLeft: "15px" }}
        />
      </div>
    </form>
  );
}

export default SectorForm;