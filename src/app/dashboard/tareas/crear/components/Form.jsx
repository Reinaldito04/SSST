"use client";
import React, { useState, useEffect } from "react";
import InputField from "../../../administradores/registrar/components/InputField";
import CustomButton from "../../../../components/CustomBotton";
import { axioInstance } from "../../../../utils/axioInstance";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Form() {
  const MySwal = withReactContent(Swal);
  const [sectors, setSectors] = useState([]);
  const [loadingSector, setLoadingSector] = useState(true);

  const [articulos, setArticulos] = useState([]);
  const [loadingArticulos, setLoadingArticulos] = useState(true);

  const [data, setData] = useState({
    name: "",
    description: "",
    sector_id: "",
    article_id: "",
  });

  useEffect(() => {
    const fetchSectores = async () => {
      try {
        const response = await axioInstance.get("/sectors?paginate=0");
        setSectors(response.data.data);
        setLoadingSector(false);
      } catch (error) {
        console.error("Error al cargar los sectores:", error);
        setLoadingSector(false);
        toast.error("Error al cargar los sectores disponibles", {
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

    const fetchArticulos = async () => {
      try {
        const response = await axioInstance.get("/articles?paginate=0");
        setArticulos(response.data.data);
        setLoadingArticulos(false);
      } catch (error) {
        console.error("Error al cargar los articulos:", error);
        setLoadingArticulos(false);
        toast.error("Error al cargar los articulos disponibles", {
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

    fetchArticulos();
    fetchSectores();
  }, []);

  const sectoresOptions = sectors.map((area) => ({
    value: area.id,
    label: area.display_name,
  }));

  const articulosOptions = articulos.map((area) => ({
    value: area.id,
    label: area.display_name,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos requeridos
    if (
      data.name === "" ||
      data.description === "" ||
      data.sector_id === "" ||
      data.article_id === ""
    ) {
      toast.error("Por favor complete los campos obligatorios", {
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
      const response = await axioInstance.post("/tasks", {
        title: data.name,
        description: data.description,
        article_id: data.article_id,
        sector_id: data.sector_id,
      });

      // Limpiar formulario después del éxito
      setData({
        name: "",
        description: "",
        sector_id: "",
        article_id: "",
      });

      MySwal.fire({
        title: "Tarea creada con éxito",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      let errorMessage =
        error.response?.data?.message || "Error al registrar la tarea";
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
            label="Titulo de la tarea*"
            type="text"
            placeholder="Ej: IT"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
          />
        </div>
        <div className="col-md-6">
          <InputField
            label="Articulo"
            type="select"
            options={articulosOptions}
            placeholder="Ej: Departamento encargado de la tecnología..."
            value={data.article_id}
            onChange={(e) => setData({ ...data, article_id: e.target.value })}
          />
        </div>

        <div className="col-md-6">
          <InputField
            label="Sector"
            type="select"
            options={sectoresOptions}
            placeholder="Ej: Departamento encargado de la tecnología..."
            value={data.sector_id}
            onChange={(e) => setData({ ...data, sector_id: e.target.value })}
          />
        </div>

        <div className="col-md-6">
          <InputField
            label="Descripción"
            type="text"
            placeholder="Ej: Departamento encargado de la tecnología..."
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        <CustomButton
          label="Registrar Tarea"
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
              description: "",
              sector_id: "",
              article_id: "",
            });
          }}
          style={{ marginLeft: "15px" }}
        />
      </div>
    </form>
  );
}

export default Form;
