import LayoutSidebar from "@/app/components/layoutSidebar";
import UrlRow from "@/app/components/urlRow";
import CustomButton from "@/app/components/CustomBotton";
import { RiCheckboxIndeterminateFill } from "react-icons/ri";
import clsx from "clsx";
import { FiDatabase } from "react-icons/fi";
import Tabla from "./components/TablaConsultar";
import styles from "@/app/dashboard/administradores/registrar/styles/registrarPage.module.css";
import { Span } from "next/dist/trace";
function page() {
  const breadcrumbs = [
    { label: "Inicio", link: "/dashboard" },
    { label: "Contratistas", link: "/dashboard/contratistas" },
    { label: "Consultar Contratista ", link: "" },
  ];

  return (
    <LayoutSidebar>
      <div className=" container-fluid" style={{ marginLeft: "20px" }}>
        <UrlRow breadcrumbs={breadcrumbs} />

        {/* Contenido Principal - Tarjetas Superiores */}
        <div className="container mt-4">
          <div className="row  align-items-center">
            <div
              className="col-md-12 col-12
             d-flex align-items-center "
            >
              <RiCheckboxIndeterminateFill
                size={40}
                style={{
                  marginLeft: "20px",
                }}
                className={styles.headerIcon}
              />
              <h2 className="mb-0">Consultar Contratista</h2>
            </div>
          </div>
          <div
            className={clsx(styles.contenedorRegistrar, "container-fluid")}
            style={{ marginLeft: "10px" }}
          >
            <div className="container-fluid">
              <h3>Listado Completo de Registros</h3>
              <div className="contenedor">
                <p
                  className="text-muted "
                  style={{
                    textWrap: "balance",
                    fontSize: "20px",
                    textAlign: "justify",
                  }}
                >
                  Estimado usuario(a), a continuación se muestra en pantalla el listado completo de registros que usted ha deseado consultar en el mismo, usted podrá realizar una  búsqueda avanzada seleccionando una columna con la que usted desee  buscar el registro.
                 
                </p>
              </div>
              <div className="container-fluid">
                <Tabla />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenedor de Línea */}
    </LayoutSidebar>
  );
}

export default page;
