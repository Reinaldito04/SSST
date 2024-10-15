import LayoutSidebar from "@/app/components/layoutSidebar";
import UrlRow from "@/app/components/urlRow";
import clsx from "clsx";
import styles from '@/app/dashboard/desviaciones/consultar/styles/consultarPage.module.css'
import ObservacionesGrafica from "../components/GraficaCorregidos";
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
      label: "Desviaciones Corregidas",
      link: "/dashboard/desviaciones/Corregidos",
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
        Desviaciones Corregidas        </h3>
      </div>
      <div className={clsx(styles.contenedorPage, "container")}>
       
        
        <ObservacionesGrafica/>

       
      </div>
    </LayoutSidebar>
  );
}

export default Page;
