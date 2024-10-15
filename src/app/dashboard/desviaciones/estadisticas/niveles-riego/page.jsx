import LayoutSidebar from "@/app/components/layoutSidebar";
import UrlRow from "@/app/components/urlRow";
import clsx from "clsx";
import styles from '@/app/dashboard/desviaciones/consultar/styles/consultarPage.module.css'
import ObservacionesGrafica from "../components/GraficaNiveles";

function Page() {
  const breadcrumbs = [
    {
      label: "Inicio",
      link: "/dashboard",
    },
    {
      label: "Desviaciones",
      link: "/dashboard/desviaciones/estadisticas",
    },
    {
      label: "Niveles de Riesgos",
      link: "/dashboard/desviaciones/niveles-riesgo",
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

      <div
        className="container mt-4"
        style={{
          width: "100%",
        }}
      >
        <h3 className="text-center">
        Niveles de Riesgo
        </h3>
      </div>
      <div className={clsx(styles.contenedorPage, "container")}>
       <p className="text-center">Niveles de Riesgo de las Observaciones de Inspecciones de Campo 
        </p>
        <p className="text-center">
        </p>
        <div>
        <ObservacionesGrafica/>

        </div>
       
      </div>
    </LayoutSidebar>
  );
}

export default Page;
