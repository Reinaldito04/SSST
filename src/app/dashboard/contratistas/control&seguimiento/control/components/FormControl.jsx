'use client'
import React, { useEffect, useState } from "react";
import InputComponent from "@/app/dashboard/desviaciones/crear/components/InputsModify";
import stylesText from "@/app/dashboard/desviaciones/crear/styles/inputComponent.module.css";
import CustomButton from "@/app/components/CustomBotton";
import { useSearchParams } from "next/navigation";
import { axioInstance } from "@/app/utils/axioInstance";

function FormControl() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [data, setData] = useState({
    NContrato: "",
    Planificado: "",
    Ejecutado: "",
    Cumplimiento: "",
    ServicioEvaluar: "",
    FechaInicio: "",
    FechaFin: "",
    Eval1: "",
    Eval2: "",
    Eval3: "",
    Eval4: "",
    PromD: "",
    EvalFinal: "",
    PDTART: "",
    Observaciones: "",
    AnexoA: "",
    AnexoB: "",
    NombreContr:'',
    GerenciaContr:'',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axioInstance.get(`/contratistas/getControl/${id}`);
        const result = response.data;

        // Asignar los datos recibidos a los inputs
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);
  const handleClearInputs =()=>{
    setData({
      NContrato: "",
      Planificado: "",
      Ejecutado: "",
      Cumplimiento: "",
      ServicioEvaluar: "",
      FechaInicio: "",
      FechaFin: "",
      Eval1: "",
      Eval2: "",
      Eval3: "",
      Eval4: "",
      PromD: "",
      EvalFinal: "",
      PDTART: "",
      Observaciones: "",
      AnexoA: "",
      AnexoB: "",
    })
  }
  const handleSubmit = async () => {
    if (!data.NContrato ) {
      alert("Numero de contrato es requerido ");
      return;
    }

    try {
      const response = await axioInstance.put(`/contratistas/controlContratista/${id}`, data);
      console.log(response.data);
      alert("Control guardado con éxito");
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      alert("Error al guardar los datos. Por favor, intenta nuevamente.");
    }
  };
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <InputComponent label="Empresa Contratista" value={data.NombreContr} onChange={
            (e) => setData({ ...data, NombreContr: e.target.value })
          } readOnly />
        </div>
        <div className="col-md-6">
          <InputComponent label="Gerencia Contratante" value={data.GerenciaContr} onChange={
            (e) => setData({ ...data, GerenciaContr: e.target.value })
          } readOnly />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <InputComponent label="N° de Contrato" value={data.NContrato} onChange={(e) => setData({ ...data, NContrato: e.target.value })} />
        </div>
        <div className="col-md-6">
          <div className="row p-1">
            <div
              className="col-md-12 p-0"
              style={{
                backgroundColor: "#D9D9D9",
                borderRight: "1px solid #404040",
                borderLeft: "1px solid #404040",
                borderTop: "1px solid #404040",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                textAlign: "center",
                padding: "10px 0",
                height: "50px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.1rem",
                width: "100%",
              }}
            >
              N° de Evaluaciones según Norma
            </div>
            <div className="col-md-4 p-0 m-0">
              <InputComponent
                label="Planificado"
                styled={true}
                style={{ borderRight: "none" }}
                value={data.Planificado}
                onChange={(e) => setData({ ...data, Planificado: e.target.value })}
              />
            </div>
            <div className="col-md-4 p-0 m-0">
              <InputComponent
                label="Ejecutado"
                styled={true}
                style={{ borderRight: "1px solid #404040" }}
                value={data.Ejecutado}
                onChange={(e) => setData({ ...data, Ejecutado: e.target.value })}
              />
            </div>
            <div className="col-md-4 p-0 m-0">
              <InputComponent
                label="% Cumplimiento"
                styled={true}
                style={{ borderLeft: "none", borderRight: "1px solid #404040" }}
                value={data.Cumplimiento}
                onChange={(e) => setData({ ...data, Cumplimiento: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="contenedor" style={{ marginTop: "-80px" }}>
            <label htmlFor="">Servicio a Evaluar:</label>
            <textarea
              id="servicioEvaluar"
              className={`form-control ${stylesText.textareaStyled}`}
              value={data.ServicioEvaluar}
              onChange={(e) => setData({ ...data, ServicioEvaluar: e.target.value })}
            ></textarea>
          </div>
        </div>
        <div className="col-md-6 mt-3">
          <InputComponent
            label="Evaluación Desempeño N° 1"
            value={data.Eval1}
            onChange={(e) => setData({ ...data, Eval1: e.target.value })}
          />
        </div>
        <div className="col-md-6 mt-4">
          <InputComponent
            label="Fecha de Inicio"
            type="date"
            value={data.FechaInicio}
            onChange={(e) => setData({ ...data, FechaInicio: e.target.value })}
          />
        </div>
        <div className="col-md-6 mt-3">
          <InputComponent
            label="Evaluación Desempeño N° 2"
            value={data.Eval2}
            onChange={(e) => setData({ ...data, Eval2: e.target.value })}
          />
        </div>
        <div className="col-md-6 mt-3">
          <InputComponent
            label="Fecha de Fin"
            type="date"
            value={data.FechaFin}
            onChange={(e) => setData({ ...data, FechaFin: e.target.value })}
          />
        </div>
        <div className="col-md-6 mt-3">
          <InputComponent
            label="Evaluación Desempeño N° 3"
            value={data.Eval3}
            onChange={(e) => setData({ ...data, Eval3: e.target.value })}
          />
        </div>
        <div className="col-md-6 mt-3">
          <InputComponent
            label="Evaluación Desempeño N° 4"
            value={data.Eval4}
            onChange={(e) => setData({ ...data, Eval4: e.target.value })}
          />
        </div>
        <div className="row mt-3">
          <div className="col-md-4">
            <InputComponent
              label="Promedio Anexo D"
              value={data.PromD}
              onChange={(e) => setData({ ...data, PromD: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <InputComponent
              label="PDT/ART"
              value={data.PDTART}
              onChange={(e) => setData({ ...data, PDTART: e.target.value })}
            />
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-4 mt-3">
            <InputComponent
              label="Evaluación Final"
              value={data.EvalFinal}
              onChange={(e) => setData({ ...data, EvalFinal: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <div className="contenedor">
              <label htmlFor="">Observaciones:</label>
              <textarea
                id="observaciones"
                className={`form-control ${stylesText.textareaStyled}`}
                value={data.Observaciones}
                onChange={(e) => setData({ ...data, Observaciones: e.target.value })}
              ></textarea>
            </div>
          </div>
          <div className="col-md-4">
            <CustomButton
              label='Guardar datos'
              style={{
                width: "80%",
                margin: '0 auto',
                display: 'block',
                fontSize: '1.1rem',
                marginTop: '10px',
                borderRadius: '10px',
                padding: '10px 0',
                backgroundColor: '#EE3333',
                color: 'white',
              }}
              onClick={
                () => {
                  handleSubmit();
                }
              }
              backgroundColor="#EE3333"
            />
          </div>
          <div className="col-md-4">
            <InputComponent
              label="Anexo A"
              value={data.AnexoA}
              onChange={(e) => setData({ ...data, AnexoA: e.target.value })}
            />
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <CustomButton
              label='Limpiar Formulario'
              style={{
                width: "80%",
                margin: '0 auto',
                display: 'block',
                fontSize: '1.1rem',
                marginTop: '-20px',
                borderRadius: '10px',
                padding: '10px 0',
                backgroundColor: '#5B5B5B',
                color: 'white',
              }}
              onClick={handleClearInputs}
              backgroundColor="#5B5B5B"
            />
          </div>
          <div className="col-md-4 mt-3">
            <InputComponent
              label="Anexo B"
              value={data.AnexoB}
              onChange={(e) => setData({ ...data, AnexoB: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormControl;
