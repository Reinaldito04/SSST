"use client";
import React, { useState } from "react";
import InputField from "@/app/dashboard/administradores/registrar/components/InputField"; // Ajusta la ruta según tu estructura
import CustomButton from "@/app/components/CustomBotton";
import { axioInstance } from "@/app/utils/axioInstance";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'
function FormCrear() {
  const [rif, setRif] = useState("");
  const [gerenciaContra, setGerenciaContr] = useState("");
  const [nombreContr, setNombreContr] = useState("");
  const [telefonoContr, setTelefonoContr] = useState("");
  const [direccionContr, setDireccionContr] = useState("");
  const [mailContr, setMailContr] = useState("");
  const MySwal = withReactContent(Swal)
  const clearInputs = () => {
    setRif("");
    setGerenciaContr("");
    setNombreContr("");
    setTelefonoContr("");
    setDireccionContr("");
    setMailContr("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene la recarga de la página
    
    // Validar campos obligatorios
    if (!rif || !gerenciaContra || !nombreContr || !telefonoContr || !direccionContr || !mailContr) {
      await MySwal.fire({
        icon: 'error',
        title: 'Campos Obligatorios',
        text: 'Por favor, complete todos los campos requeridos.',
      });
      return;
    }

    try {
      const response = await axioInstance.post("/contratistas/addContratist", {
        RIF: rif,
        GerenciaContr: gerenciaContra,
        NombreContr: nombreContr,
        TelefonoContr: telefonoContr,
        DireccionContr: direccionContr,
        EmailContr: mailContr,
      });
      console.log(response.data);

      await MySwal.fire({
        title: 'Contratista registrado',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      });

      clearInputs(); // Limpia los campos después de un registro exitoso
    } catch (error) {
      console.error("Error al registrar contratista:", error);
      await MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al registrar contratista: ' + (error.response?.data?.detail || "Verifica los datos"), // Mensaje de error
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <InputField
            label="Ingrese el RIF de Contratista"
            type="text"
            placeholder="Por favor el RIF de Contratista..."
            value={rif}
            onChange={(e) => setRif(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <InputField
            label="Gerencia Contratante"
            type="text"
            placeholder="Por favor ingrese la Gerencia Contratante..."
            value={gerenciaContra}
            onChange={(e) => setGerenciaContr(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <InputField
            label="Ingrese el nombre de la Contratista"
            type="text"
            placeholder="Por favor ingrese el nombre de la Contratista"
            value={nombreContr}
            onChange={(e) => setNombreContr(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <InputField
            label="Ingrese el Telefono de la Contratista"
            type="text"
            placeholder="Por favor ingrese el teléfono..."
            value={telefonoContr}
            onChange={(e) => setTelefonoContr(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <InputField
            label="Ingrese dirección de la Contratista"
            type="text"
            placeholder="Ingrese dirección de la Contratista"
            value={direccionContr}
            onChange={(e) => setDireccionContr(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <InputField
            label="Ingrese el Correo de la Contratista"
            type="text"
            placeholder="Ingrese el Correo de la Contratista"
            value={mailContr}
            onChange={(e) => setMailContr(e.target.value)}
          />
        </div>
      </div>
      <div className="d-flex">
        <CustomButton
          label="Registrar Contratista"
          backgroundColor="#EE3333"
          textColor="#ffffff"
          type="submit" // Cambiado a tipo submit
        />
        <CustomButton
          label="Limpiar Formulario"
          backgroundColor="#5B5B5B"
          textColor="#ffffff"
          onClick={(e) => {
            e.preventDefault();
            clearInputs();
          }}
          style={{
            marginLeft: "15px",
          }}
        />
      </div>
    </form>
  );
}

export default FormCrear;
