import React from "react";
import LayoutSidebar from "@/app/components/layoutSidebar";
import UrlRow from "@/app/components/urlRow";
import { CiCirclePlus } from "react-icons/ci";
import styles from '@/app/dashboard/desviaciones/consultar/styles/consultarPage.module.css'
import clsx from "clsx";
import FormRegistrar from "../components/FormRegistrar";
function page() {
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
      label: "Modificar actividad",
      link: "/dashboard/inspecciones/sistemaContraIncendios/modificar",
    }
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
          <CiCirclePlus size={40} className={styles.headerIcon} />
          <h2 className={styles.title}>Modificar actividad</h2>
        </div>
      </div>
      <div className={clsx(styles.contenedorPage, "container")}>
            <FormRegistrar
            secundario={true}

            />
      </div>
    </LayoutSidebar>
  );
}

export default page;
