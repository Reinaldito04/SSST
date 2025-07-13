import React from "react";
import LayoutSidebar from "../../../../components/layoutSidebar.jsx";
import UrlRow from "../../../../components/urlRow.jsx";
import { FiDatabase } from "react-icons/fi";
import styles from "./styles/consultarPage.module.css";
import clsx from "clsx";
import Tabla from "./components/tablaConsult.jsx";
function page() {
  const breadcrumbs = [
    {
      label: "Inicio",
      link: "/dashboard",
    },
    {
      label: "Articulos",
      link: "/dashboard/articulos",
    },
    {
      label:'Tipos de Articulos',
      link:'/dashboard/areas/tipos'
    },
    {
      label: "Consultar Tipos de Articulos",
      link: "",
    },
  ];

  return (
    <LayoutSidebar>
      {/* Breadcrumbs */}
      <div
        className="contenedorURL"
        style={{
          marginLeft: "20px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          className="contenedorurl"
          style={{
            marginLeft: "20px",
          }}
        >
          <UrlRow
            breadcrumbs={breadcrumbs}
            styles={{
              marginLeft: "20px",
            }}
          />
        </div>
      </div>

      <div className="container mt-4">
        <div className={clsx(styles.headerContainer)}>
          <FiDatabase size={40} className={styles.headerIcon} />
          <h2 className={styles.title}>Listado Completo de 
            Tipos de Articulos
          </h2>
        </div>
      </div>
      <div className={clsx(styles.contenedorPage, "container")}>
        <h4>Consultar Tipos de Articulos</h4>
        <p className={clsx(styles.parrafo, "text-muted")}>
          Estimado usuario(a), a continuación se muestra en pantalla el listado
          completo de registros que usted ha deseado consultar en el mismo,
          usted podrá realizar una búsqueda avanzada seleccionando una columna
          con la que usted desee buscar el registro.
        </p>
        <Tabla />
      </div>
    </LayoutSidebar>
  );
}

export default page;
