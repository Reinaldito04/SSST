"use client";
import { useState, useEffect } from "react";
import InputComponent from "../../desviaciones/crear/components/InputsModify";
import CustomButton from "@/app/components/CustomBotton";
import { axioInstance } from "@/app/utils/axioInstance";
import { useSearchParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FormCumplimiento() {
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const search = useSearchParams();
  const id = search.get("id");

  const [cumplimiento, setCumplimiento] = useState({
    Fecha: "",
    InpE: "",
    InpP: "",
    Observacion: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      axioInstance
        .get(`/cronograma/getCronograma/${id}`)
        .then((response) => {
          setCumplimiento(response.data);
        })
        .catch((error) => {
          console.error("Error fetching cronograma:", error);
          toast.error("Error al obtener el cronograma");
        });
    }
  }, [id]);

  const validateFields = () => {
    const { Fecha, InpE, InpP, Observacion } = cumplimiento;
    if (!Fecha || !InpE || !InpP || !Observacion) {
      toast.warn("Debe completar todos los campos");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    setIsLoading(true);
    try {
      let response;
      if (id) {
        response = await axioInstance.put(
          `/cronograma/modifyCronograma/${id}`,
          cumplimiento
        );
        MySwal.fire({
          icon: "success",
          title: "Cronograma modificado",
          text: "Cronograma modificado exitosamente",
          timer: 1500,
        });
      } else {
        response = await axioInstance.post("/cronograma/addCronograma", cumplimiento);
        MySwal.fire({
          icon: "success",
          title: "Cronograma registrado",
          text: "Cronograma registrado exitosamente",
          timer: 1500,
        });
      }
      clearInputs();
      router.push("/dashboard/cronograma/registros");
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      toast.error(
        `Error: ${error.response?.data?.message || "No se pudo completar la acción"}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const clearInputs = () => {
    setCumplimiento({
      Fecha: "",
      InpE: "",
      InpP: "",
      Observacion: "",
    });
  };

  return (
    <div>
      <div
        className="container-fluid"
        style={{ backgroundColor: "#E1E1E1", width: "100%" }}
      >
        <h2>Registrar datos</h2>
      </div>
      <div className="row mt-2 p-2">
        <div className="col-md-6">
          <div className="col">
            <InputComponent
              label="Fecha"
              value={cumplimiento.Fecha}
              type="date"
              onChange={(e) =>
                setCumplimiento({ ...cumplimiento, Fecha: e.target.value })
              }
            />
          </div>
          <div className="col mt-2">
            <InputComponent
              label="Inp. P."
              value={cumplimiento.InpP}
              onChange={(e) =>
                setCumplimiento({ ...cumplimiento, InpP: e.target.value })
              }
            />
          </div>
          <div className="col mt-2">
            <InputComponent
              label="Inp. E."
              value={cumplimiento.InpE}
              onChange={(e) =>
                setCumplimiento({ ...cumplimiento, InpE: e.target.value })
              }
            />
          </div>
          <div className="mt-2">
            <span>Inp. P. = Inspecciones Programadas</span>
            <br />
            <span>Inp. E. = Inspecciones Ejecutadas</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="col">
            <InputComponent
              label="Observaciones"
              styled={true}
              value={cumplimiento.Observacion}
              onChange={(e) =>
                setCumplimiento({
                  ...cumplimiento,
                  Observacion: e.target.value,
                })
              }
              style={{
                paddingBottom: "25px",
                textAlign: "center",
              }}
            />
          </div>
          <div className="col mt-4">
            <div
              className="container"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <CustomButton
                onClick={handleSubmit}
                label={
                  isLoading ? "Cargando..." : id ? "Modificar" : "Registrar"
                }
                backgroundColor="#161A6A"
                textColor="#FFFFFF"
                disabled={isLoading}
                style={{ width: "40%" }}
              />
              <CustomButton
                label="Ver Gráfica"
                backgroundColor="#EE3333"
                textColor="#FFFFFF"
                style={{ width: "40%" }}
                onClick={() => router.push("/dashboard/cronograma/grafica")}
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default FormCumplimiento;
