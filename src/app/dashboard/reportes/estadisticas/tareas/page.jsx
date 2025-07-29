import React from "react";
import LayoutSidebar from "../../../../components/layoutSidebar.jsx";
import UrlRow from "../../../../components/urlRow.jsx";
import { FiDatabase } from "react-icons/fi";
import styles from "../../../tareas/consultar/styles/consultarPage.module.css";
import clsx from "clsx";
import TaskStatistics from "./components/TasksStadistics.jsx";
function page() {
  const breadcrumbs = [
    {
      label: "Inicio",
      link: "/dashboard",
    },
    {
      label: "Estadisticas",
      link: "/dashboard/estadisticas",
    },
    {
      label: "Tareas",
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
          <h2 className={styles.title}>Estadisticas de Tareas</h2>
        </div>
      </div>
      <div className={clsx(styles.contenedorPage, "container")}>
            <TaskStatistics />
      </div>
    </LayoutSidebar>
  );
}

export default page;
