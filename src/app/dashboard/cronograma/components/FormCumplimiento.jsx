import React from "react";
import InputComponent from "../../desviaciones/crear/components/InputsModify";
import CustomButton from "@/app/components/CustomBotton";
function FormCumplimiento() {
  return (
    <div>
      <div
        className="container-fluid"
        style={{
          backgroundColor: "#E1E1E1",
          width: "100%",
        }}
      >
        <h2 className="">Registrar datos</h2>
      </div>
      <div className="row mt-2 p-2">
        <div className="col-md-6">
          <div className="col">
            <InputComponent label="Fecha" />
          </div>
          <div className="col mt-2">
            <InputComponent label="Inp. P." />
          </div>
          <div className="col mt-2">
            <InputComponent label="Inp. E." />
          </div>
          <div className="mt-2">
            <span>Inp. P. = Inspecciones Programadas</span>
            <br></br>
            <span>Inp. E. = Inspecciones Ejecutadas</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="col">
            <InputComponent
              label="Observaciones"
              styled={true}
              style={{
                paddingBottom: "25px",
                textAlign: "center",
              }}
            />
          </div>
          <div className="col mt-4">
            <div className="container " style={{
                display:'flex',
                justifyContent:'space-between'

            }}>
                <CustomButton
                label='Registrar'
                backgroundColor="#161A6A"
                textColor="#FFFFFF"
                style={{
                    width:'40%'
                }}
                />
                <CustomButton
                label='Ver Gráfica'
                backgroundColor="#EE3333"
                textColor="#FFFFFF"
                style={{
                    width:'40%'
                }}
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormCumplimiento;
