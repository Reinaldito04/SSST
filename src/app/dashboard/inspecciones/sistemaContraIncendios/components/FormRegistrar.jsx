'use client';
import React, { useState } from "react";
import InputComponent from "@/app/dashboard/desviaciones/crear/components/InputsModify";
import CustomButton from "@/app/components/CustomBotton";
import { axioInstance } from "@/app/utils/axioInstance";
import Swal from 'sweetalert2';
import { useRouter } from "next/navigation";
function FormRegistrar() {
    const router = useRouter();
  const [data, setData] = useState({
    Nombre: '',
    Planificado: '',
    Ejecutado: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axioInstance.post('/incendios/addIncendio', data);
      console.log(res);
      Swal.fire('Actividad registrada con éxito', '', 'success');
      setData({ Nombre: '', Planificado: '', Ejecutado: '' });

      router.push('/dashboard/inspecciones/sistemaContraIncendios');

    } catch (error) {
      console.log(error);
      Swal.fire('Error al registrar la actividad', '', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <InputComponent
              label="Nombre de la actividad"
              placeholder="Por favor ingrese el nombre..."
              styled={true}
              value={data.Nombre}
              onChange={(e) => handleChange('Nombre', e.target.value)}
            />
          </div>
          <div className="col-md-6">
            </div>
          <div className="col-md-4 mt-2">
            <InputComponent
              label="Planificado anual"
              placeholder="Por favor ingrese la fecha..."
              value={data.Planificado}
              onChange={(e) => handleChange('Planificado', e.target.value)}
            />
          </div>
          <div className="col-md-6 mt-2">

          </div>
          <div className="col-md-4 mt-2">
            <InputComponent
              label="Ejecutado mensual"
              placeholder="Por favor ingrese la fecha..."
              value={data.Ejecutado}
              onChange={(e) => handleChange('Ejecutado', e.target.value)}
            />
          </div>
        </div>
        <div className="">
          <CustomButton
            label={loading ? 'Registrando...' : 'Registrar Actividad'}
            backgroundColor="#EE3333"
            color="#FFFFFF"
            onClick={handleSubmit}
            disabled={loading} // Deshabilitar mientras está cargando
            style={{
              width: "40%",
              marginTop: "20px",
              marginBottom: "20px",
              padding: "10px 0",
              borderRadius: "10px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default FormRegistrar;
