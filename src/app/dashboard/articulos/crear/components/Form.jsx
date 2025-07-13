"use client";
import React, { useState } from "react";
import InputField from "../../../administradores/registrar/components/InputField";
import CustomButton from "../../../../components/CustomBotton";
import { axioInstance } from "../../../../utils/axioInstance";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Form() {
  const MySwal = withReactContent(Swal);
  const [data, setData] = useState({
    name: "",
    display_name: "",
    description: "",
    typeArticle: "",
    active: true, // Valor por defecto como activo
  });
const [articulos,setArticulos]=useState([])
  React.useEffect(() => {
    const fetchArticulos = async () => {
      try {
        const response = await axioInstance.get("/article-types?paginate=0");
        setArticulos(response.data.data);
      } catch (error) {
        console.error("Error al obtener los roles:", error);
      }
    };
    fetchArticulos();
  }, []);

 const tipoArticulos = articulos.map((art) => ({
    value: art.id,
    label: art.display_name,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos requeridos
    if (data.name === "" || data.description === "" || data.typeArticle === "") {
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
      const response = await axioInstance.post("/articles", {
        name: data.name,
        display_name: data.name.replace(/\s+/g, "_"),
        description: data.description,
        active: data.active,
        article_type_id: data.typeArticle
      });

      // Limpiar formulario después del éxito
      setData({
        name: "",
        display_name: "",
        description: "",
        active: true,
        article_type_id: ""
      });

      MySwal.fire({
        title: "Articulo creado con éxito",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      let errorMessage = error.response?.data?.message || "Error al registrar el Articulo";
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
            label="Nombre del Articulo*"
            type="text"
            placeholder="Ej: IT"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
          />
        </div>
      
        <div className="col-md-6">
          <InputField
            label="Descripción"
            type="text"
            placeholder="Ej: Articulo encargado de la tecnología..."
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </div>
       <div className="col-md-6">
          <InputField
            label="Tipo de Articulo"
            type="select"
            placeholder="Seleccione un tipo..."
            options={tipoArticulos}
            value={data.typeArticle}
            onChange={(e) => setData({ ...data, typeArticle: e.target.value })}
          />
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        <CustomButton
          label="Registrar Articulo"
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
            });
          }}
          style={{ marginLeft: "15px" }}
        />
      </div>
    </form>
  );
}

export default Form;