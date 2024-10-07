import LayoutSidebar from "@/app/components/layoutSidebar";
import InputComponent from "../../desviaciones/crear/components/InputsModify";
import UrlRow from "@/app/components/urlRow";
import CustomButton from "@/app/components/CustomBotton";
import Select from "./components/Select";
import { axioInstance } from "@/app/utils/axioInstance";
function page() {
  const breadcrumbs = [
    { label: "Inicio", link: "/dashboard" },
    { label: "Contratistas", link: "/dashboard/contratistas" },
    { label: "Control y Seguimiento ", link: "" },
  ];


  return (
    <LayoutSidebar>
      <div className=" container-fluid" style={{ marginLeft: "20px" }}>
        <UrlRow breadcrumbs={breadcrumbs} />

        {/* Contenido Principal - Tarjetas Superiores */}
        <div className="container-fluid mt-4">
          <div className="contenedortexto text-center  fs-2">
            <h2 className="fs-3">Gerencia SIHO-A</h2>
            <h2 className="fs-3">Plan de Evaluaciones de Contratistas</h2>
            <h2 className="fs-3">NORMA PDVSA SI-S-04</h2>
          </div>
          <Select/>
        </div>
      </div>

      {/* Contenedor de Línea */}
    </LayoutSidebar>
  );
}

export default page;
