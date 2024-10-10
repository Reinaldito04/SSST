"use client";
import React, { useState, useEffect } from "react";
import CustomButton from "@/app/components/CustomBotton";
import InputComponent from "@/app/dashboard/desviaciones/crear/components/InputsModify";
import { axioInstance } from "@/app/utils/axioInstance";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
function FormCapacitacion() {

  const router = useRouter();
  const searchParam = useSearchParams()
  const id = searchParam.get('id')


  const [formData, setFormData] = useState({
    Fecha: "",
    Tema: "",
    Objetivo: "",
    Expositor: "",
    participantes: "",
    HP: "",
    HE: "",
    archivo: null, // Para el archivo
  });

  // Efecto para cargar los datos si hay un ID en la URL
  useEffect(() => {
    const fetchCapacitacion = async () => {
      if (id) { // Verifica si el ID está presente
        try {
          const response = await axioInstance.get(`/capacitacion/getCapacitacion/${id}`); // Realiza la petición GET
          const data = response.data;
          setFormData({
            Fecha: data.Fecha,
            Tema: data.Tema,
            Objetivo: data.Objetivo,
            Expositor: data.Expositor,
            participantes: data.participantes,
            HP: data.HP,
            HE: data.HE,
            archivo: null, // Para manejar el archivo de forma diferente si es necesario
          });
        } catch (error) {
          console.error("Error fetching capacitacion:", error);
          alert("Error al cargar la capacitación");
        }
      }
    };

    fetchCapacitacion();
  }, [id]); // Dependencia para que se ejecute cuando cambie el ID

  const handleChange = (e, fieldName) => {
    const { type, value, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, archivo: files[0] }); // Guarda el archivo
    } else {
      setFormData({ ...formData, [fieldName]: value }); // Usa el fieldName para actualizar
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formToSend = new FormData();
  
    // Serializa el objeto capacitacion como JSON y lo añade a FormData
    formToSend.append('capacitacion', JSON.stringify({
      Fecha: formData.Fecha,
      Tema: formData.Tema,
      Objetivo: formData.Objetivo,
      Expositor: formData.Expositor,
      participantes: formData.participantes,
      HP: formData.HP,
      HE: formData.HE,
    }));
  
    // Añadir el archivo al FormData
    formToSend.append('archivo', formData.archivo);
  
    try {
      
      if (id) {
        // Si hay ID, realiza una petición PUT
        const response = await axioInstance.put(`/capacitacion/modifyCapacitacion/${id}`, formToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
        alert("Capacitación actualizada correctamente");
      } else {
        // Si no hay ID, realiza una petición POST
        const response = await axioInstance.post("/capacitacion/addCapacitacion", formToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
        alert("Capacitación añadida correctamente");
      }
      router.push('/dashboard/formaciones')
    } catch (error) {
      console.error(error);
      alert("Error al añadir capacitación");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-4">
          <InputComponent
            label="Fecha"
            type="date"
            placeholder="Fecha"
            value={formData.Fecha}
            onChange={handleChange}
            fieldName="Fecha" // Indica el campo correspondiente
          />
        </div>
        <div className="col-md-8">
          <InputComponent
            label="Tema"
            type="text"
            placeholder="Tema"
            value={formData.Tema}
            onChange={handleChange}
            fieldName="Tema"
          />
        </div>
        <div className="col-md-12 mt-2">
          <InputComponent
            label="Objetivo"
            type="text"
            placeholder="Objetivo"
            value={formData.Objetivo}
            onChange={handleChange}
            fieldName="Objetivo"
          />
        </div>
        <div className="col-md-6 mt-2">
          <InputComponent
            label="Expositor"
            type="text"
            placeholder="Expositor"
            value={formData.Expositor}
            onChange={handleChange}
            fieldName="Expositor"
          />
        </div>
        <div className="col-md-6 mt-2">
          <InputComponent
            label="N° de Participantes"
            type="text"
            placeholder="participantes"
            value={formData.participantes}
            onChange={handleChange}
            fieldName="participantes"
          />
        </div>
        <div className="col-md-4 mt-2">
          <InputComponent
            label="HP"
            type="text"
            placeholder="HP"
            value={formData.HP}
            onChange={handleChange}
            fieldName="HP"
          />
        </div>
        <div className="col-md-4 mt-2">
          <InputComponent
            label="HE"
            type="text"
            placeholder="HE"
            value={formData.HE}
            onChange={handleChange}
            fieldName="HE"
          />
        </div>
        <div className="col-md-4 mt-2">
          <InputComponent
            label="Añadir archivo"
            style={{
              border: "none",
              outline: "none",
            }}
            placeholder="archivo"
            type="file"
            onChange={handleChange}
            fieldName="archivo" // Indica el campo correspondiente
          />
        </div>
      </div>
      <div className="mx-auto d-flex">
        <CustomButton
          label="Guardar"
          backgroundColor="#EE3333"
          textColor="#FFFFFF"
          style={{
            marginTop: "20px",
            marginRight: "20px",
            paddingInline: "20px",
            width: "150px",
          }}
        />
        <CustomButton
          label="Limpiar datos"
          backgroundColor="#5B5B5B"
          textColor="#FFFFFF"
          style={{
            marginTop: "20px",
            paddingInline: "20px",
            width: "150px",
          }}
        />
      </div>
    </form>
  );
}

export default FormCapacitacion;
