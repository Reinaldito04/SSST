import React from "react";
import LayoutSidebar from "@/app/components/layoutSidebar";
import UrlRow from "@/app/components/urlRow";
import { FiDatabase } from "react-icons/fi";
import styles from "./styles/consultarPage.module.css";
import clsx from "clsx";
import Tabla from "./components/tablaConsult";
function page() {
  const breadcrumbs = [
    {
      label: "Inicio",
      link: "/dashboard",
    },
    {
      label: "Desviaciones",
      link: "/dashboard/desviaciones",
    },
    {
      label: "Consultar Desviaciones",
      link: "",
    },
  ];

  return (
    <LayoutSidebar>
      {/* Breadcrumbs */}
      <UrlRow breadcrumbs={breadcrumbs} />
      <div className="container-fluid mt-4">
        <div className={clsx(styles.headerContainer)}>
          <FiDatabase size={40} className={styles.headerIcon} />
          <h2 className={styles.title}>Listado Completo de Consultas</h2>
        </div>
      </div>
      <div className={styles.contenedorPage}>
        <h4>Consultar Desviaciones</h4>
        <p className={clsx(styles.parrafo,"text-muted")}>Estimado usuario(a), a continuación se muestra en pantalla el listado completo de registros que usted ha deseado consultar en el mismo, usted podrá realizar una  búsqueda avanzada seleccionando una columna con la que usted desee  buscar el registro.</p>
        <Tabla />
      </div>
    </LayoutSidebar>
  );
}

export default page;
