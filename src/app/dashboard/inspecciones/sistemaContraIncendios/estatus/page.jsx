import LayoutSidebar from "@/app/components/layoutSidebar";
import UrlRow from "@/app/components/urlRow";
import { RiCheckboxIndeterminateFill } from "react-icons/ri";
import clsx from "clsx";
import styles from "@/app/dashboard/administradores/consultar/styles/consultarPage.module.css";
import GraficaEstatus from "../components/GraficaEstatus";
function Page() {
  const breadcrumbs = [
    {
      label: "Inicio",
      link: "/dashboard",
    },
    {
      label: "Inspecciones",
      link: "/dashboard/inspecciones",
    },
    {
      label: "Sistemas contra incendio",
      link: "/dashboard/inspecciones/sistemaContraIncendios",
    },
    {
      label: "Estatus SCI ",
      link: "/dashboard/inspecciones/sistemaContraIncendios/estatus",
    },
  ];

  return (
    <LayoutSidebar>
      <div className="container-fluid">
        <div
          className="container-fluid"
          style={{
            marginLeft: "20px",
          }}
        >
          <UrlRow breadcrumbs={breadcrumbs} />
        </div>
        <div className="container-fluid mt-4">
          <div className={clsx(styles.headerContainer)}>
            <RiCheckboxIndeterminateFill
              size={40}
              style={{
                marginLeft: "20px",
              }}
              className={styles.headerIcon}
            />
            <h2 className={styles.title}>
              ESTATUS INSPECCION SISTEMAS CONTRA INCENDIOS TORRE A CBP
            </h2>
          </div>
          <div className={clsx(styles.contenedorPage, "container")}>

            <div className="container">
                <GraficaEstatus/>
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumbs */}
    </LayoutSidebar>
  );
}

export default Page;
