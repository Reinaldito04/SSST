import LayoutSidebar from "@/app/components/layoutSidebar";
import UrlRow from "@/app/components/urlRow";
import { CiCirclePlus } from "react-icons/ci";
import styles from "./styles/seguimientoPage.module.css";
import clsx from "clsx";
import FormSeguimiento from "./components/FormSeguimiento";

function page() {
  const breadcrumbs = [
    { label: "Inicio", link: "/dashboard" },
    { label: "Desviaciones", link: "/dashboard/desviaciones" },
    { label: "Seguimiento de  Desviaciones", link: "" },
  ];
  return (
    <LayoutSidebar>
      <UrlRow breadcrumbs={breadcrumbs} />

      <div className="container-fluid mt-4">
        <div className="row  align-items-center">
          <div
            className="col-md-12 col-12
           d-flex align-items-center "
          >
            <CiCirclePlus size={40} className="text-black me-2" />
            <h2 className="mb-0">Seguimiento de Desviaciones </h2>
          </div>
        </div>
        <div className={clsx(styles.contenedorPage, "container-fluid")}>
          <div className={clsx(styles.contenedorTexto, "container-fluid")}>
            <h2 className="text-center">
            SEGUIMIENTO DE LAS ACCIONES CORRECTIVAS
            </h2>
          </div>
          <div className="container-fluid">
          <FormSeguimiento />
        </div>
        </div>
        
      </div>
    </LayoutSidebar>
  );
}

export default page;
