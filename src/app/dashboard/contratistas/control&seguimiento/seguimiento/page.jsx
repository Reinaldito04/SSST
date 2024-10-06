import LayoutSidebar from "@/app/components/layoutSidebar";
import UrlRow from "@/app/components/urlRow";
import styles from "@/app/dashboard/administradores/registrar/styles/registrarPage.module.css";
import clsx from "clsx";
import { IoArrowBackSharp } from "react-icons/io5";
import Link from "next/link";
import Tabla from "./components/TablaSeguimiento";
function page() {
  const breadcrumbs = [
    { label: "Inicio", link: "/dashboard" },
    { label: "Contratistas", link: "/dashboard/contratistas" },
    { label: "Control y seguimiento", link: "" },
  ];
  return (
    <LayoutSidebar>
      <div className=" container-fluid" style={{ marginLeft: "20px" }}>
        <UrlRow breadcrumbs={breadcrumbs} />
        <div
          className={clsx(styles.contenedorRegistrar, "container-fluid p-0")}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            padding: "0",

            width: "95%",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <div>
            <div class="container-fluid p-0">
              <div
                class="bg-danger text-white d-flex align-items-center p-2"
                style={{
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",

                  width: "100%",
                }}
              >
                <div class="me-auto">
                  <Link
                    href="/dashboard/contratistas/control&seguimiento"
                    class="btn  text-white"
                  >
                    <IoArrowBackSharp /> Volver
                  </Link>
                </div>

                <div class="flex-grow-1 text-center">
                  <h5 class="mb-0">Seguimiento de Contratistas</h5>
                </div>
              </div>

              <div className="container mt-4 pb-4">
                <div className="container-fluid">
                <p
                  className="fs-5 text-muted"
                  style={{
                    textWrap:'balance',
                    whiteSpace:'pre-wrap',
                    textAlign:'center'

                  }}
                >
                  Estimado usuario(a), en esta sección usted podrá ver el
                  listado simple de registros guardados en la base de datos;
                  además de gestionar dichos registros como lo son las opciones
                  de <span style={
                    {
                      fontWeight:'bold',
                      color:'#FF0000'
                    }
                  }>  ( Modificar y Eliminar Registros )</span>
                </p>
                </div>
               
                <div className="container-fluid">
                  <Tabla />
                </div>
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
