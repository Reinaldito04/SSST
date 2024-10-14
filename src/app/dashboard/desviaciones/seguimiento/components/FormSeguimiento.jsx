"use client";
import React, { useEffect, useState } from "react";
import InputComponent from "../../crear/components/InputsModify";
import styles from "../../crear/styles/inputComponent.module.css";
import clsx from "clsx";
import CustomButton from "@/app/components/CustomBotton";
import { axioInstance } from "@/app/utils/axioInstance";
import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/navigation";
const FormSeguimiento = () => {

  const router = useRouter();

  const MySwal = withReactContent(Swal);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [desviacion, setDesviacion] = useState({
    Deteccion: "",
    Seguimiento: "",
    Avance: "",
    Responsable: "",
    Observacion: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await axioInstance.get(`/desviaciones/getDesviacion/${id}`);
          setDesviacion(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, [id]);  // Se ejecuta cada vez que `id` cambia
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const seguimientoData = {
      Deteccion: desviacion.Deteccion,
      Seguimiento: desviacion.Seguimiento,
      Avance: desviacion.Avance,
      Responsable: desviacion.Responsable,
      Observacion: desviacion.Observacion,
    };
  
    try {
      let response;
      
      if (id) {
        // Actualizar seguimiento existente
        response = await axioInstance.put(`/desviaciones/updateSeguimiento/${id}`, seguimientoData);
        MySwal.fire({
          title: 'Seguimiento actualizado',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        // Crear un nuevo seguimiento
        response = await axioInstance.post(`/desviaciones/addSeguimiento/${id}`, seguimientoData);
        MySwal.fire({
          title: 'Seguimiento agregado',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
      }
  
      console.log(response.data);
      router.push("/dashboard/desviaciones/seguimiento/listado");
  
    } catch (error) {
      console.error("Error al guardar el seguimiento", error);
      MySwal.fire({
        title: 'Error',
        text: 'Ocurrió un error al guardar el seguimiento',
        icon: 'error',
      });
    }
  };
  
  return (
    <div>
      <form >
        <div className={clsx(styles.contenedorTexto, "container-fluid")}>
          <h2 className="text-center">
            SEGUIMIENTO DE LAS ACCIONES CORRECTIVAS
          </h2>
        </div>
        <div className="row container-fluid">
          <div className="col-md-4">
            <InputComponent
              label="Detección"
              value={desviacion.Deteccion}
              onChange={(e) => {
                setDesviacion({ ...desviacion, Deteccion: e.target.value });
              }}
            />
          </div>
          <div className="col-md-4">
            <InputComponent
              label="Seguimiento"
              value={desviacion.Seguimiento}
              onChange={(e) => {
                setDesviacion({ ...desviacion, Seguimiento: e.target.value });
              }}
            />
          </div>

          <div className="col-md-4 text-center d-flex mx-auto">
            <InputComponent
              label="Avance %"
              value={desviacion.Avance}
              onChange={(e) => {
                setDesviacion({ ...desviacion, Avance: e.target.value });
              }}
            />
          </div>
          <div className="col-md-6 mt-4  ">
            <InputComponent
              label="Responsable"
              value={desviacion.Responsable}
              onChange={
                (e) => {
                  setDesviacion({ ...desviacion, Responsable: e.target.value });
                }
              }
            />
          </div>
        </div>
        <div className="row container">
          <div className="col-md-6 mt-4">
            <label htmlFor="">Observaciones:</label>
            <textarea
              id="accionesCorrectivas:"
              value={desviacion.Observacion}
              onChange={(e) => {
                setDesviacion({ ...desviacion, Observacion: e.target.value });
              }}
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
            onClick={handleSubmit}
            
           
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
