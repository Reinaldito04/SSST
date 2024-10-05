import InputComponent from "@/app/dashboard/desviaciones/crear/components/InputsModify";
import stylesText from "@/app/dashboard/desviaciones/crear/styles/inputComponent.module.css";
import CustomButton from "@/app/components/CustomBotton";
function FormControl() {
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <InputComponent label="Empresa Contratista" />
        </div>
        <div className="col-md-6">
          <InputComponent label="Gerencia Contratante" />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <InputComponent label="N° de Contrato" />
        </div>
        <div className="col-md-6">
          <div className="row p-1">
            {/* Contenedor del texto */}
            <div
              className="col-md-12 p-0"
              style={{
                backgroundColor: "#D9D9D9",
                borderRight: "1px solid #404040",
                borderLeft: "1px solid #404040",
                borderTop: "1px solid #404040",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                textAlign: "center", // Centrar el texto
                padding: "10px 0", // Añadir padding vertical
                height: "50px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.1rem",
                width: "100%", // Asegurarse de ocupar todo el ancho
              }}
            >
              N° de Evaluaciones según Norma
            </div>

            {/* Inputs */}
            <div className="col-md-4 p-0 m-0">
              <InputComponent
                label="Planificado"
                styled={true}
                style={{ borderRight: "none" }}
              />
            </div>
            <div className="col-md-4 p-0 m-0">
              <InputComponent
                label="Ejecutado"
                styled={true}
                style={{ borderRight: "1px solid #404040" }}
              />
            </div>
            <div className="col-md-4 p-0 m-0">
              <InputComponent
                label="% Cumplimiento"
                styled={true}
                style={{ borderLeft: "none", borderRight: "1px solid #404040" }}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div
            className="contenedor"
            style={{
              marginTop: "-80px",
            }}
          >
            <label htmlFor="">Servicio a Evaluar:</label>
            <textarea
              id="accionesCorrectivas:"
              className={`form-control ${stylesText.textareaStyled}`} // Aplica la clase personalizada
            ></textarea>
          </div>
        </div>
        <div className="col-md-6 mt-3">
          <InputComponent label="Evaluación Desempeño N° 1" />
        </div>{" "}
        <div className="col-md-6 mt-4">
          <InputComponent label="Fecha de Inicio" />
        </div>
        <div className="col-md-6 mt-3">
          <InputComponent label="Evaluación Desempeño N° 2" />
        </div>
        <div className="col-md-6 mt-3">
          <InputComponent label="Fecha de Fin" />
        </div>
        <div className="col-md-6 mt-3">
          <InputComponent label="Evaluación Desempeño N° 3" />
        </div>
        <div className="col-md-6 mt-3"></div>
        <div className="col-md-6 mt-3">
          <InputComponent label="Evaluación Desempeño N° 4" />
        </div>
        <div className="row mt-3">
          <div className="col-md-4">
            <InputComponent label="Promedio Anexo D" />
          </div>
          <div className="col-md-4">
            <InputComponent label="PDT/ART" />
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-4 mt-3">
            <InputComponent label="Evaluación Final" />
          </div>
            <div className="col-md-4">
                <div className="contenedor">
                    <label htmlFor="">Observaciones:</label>
                    <textarea
                        id="accionesCorrectivas:"
                        className={`form-control ${stylesText.textareaStyled}`} // Aplica la clase personalizada
                    ></textarea>
                </div>
            </div>
            <div className="col-md-4">
                <CustomButton
                label='Guardar datos'
                style={{width:"80%",
                    margin:'0 auto',
                    display:'block',
                    fontSize:'1.1rem',
                    marginTop:'10px',
                    borderRadius:'10px',
                    padding:'10px 0',
                    backgroundColor:'#EE3333',
                    color:'white',
                

                }}
                backgroundColor="#EE3333"
                />
            </div>
            <div className="col-md-4 ">
            <InputComponent label="Anexo A" />

            </div>
            <div className="col-md-4">
           

            </div>
            <div className="col-md-4">
            <CustomButton
                label='Limpiar Formulario'
                style={{width:"80%",
                    margin:'0 auto',
                    display:'block',
                    fontSize:'1.1rem',
                    marginTop:'-20px',
                    borderRadius:'10px',
                    padding:'10px 0',
                    backgroundColor:'#5B5B5B',
                    color:'white',
                

                }}
                backgroundColor="#5B5B5B"
                />
            </div>
            <div className="col-md-4 mt-3">
            <InputComponent label="Anexo B" />

            </div>
          
        </div>
      </div>
    </div>
  );
}

export default FormControl;
