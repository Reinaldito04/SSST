import LayoutSidebar from "@/app/components/layoutSidebar";
import UrlRow from "@/app/components/urlRow";
import clsx from "clsx";
import styles from "../consultar/styles/consultarPage.module.css";
import DataTable from "./components/TablaElementos";
import CustomButton from "@/app/components/CustomBotton";
import Link from "next/link";

function Page() {
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
      label: "Estadistica Desviaciones",
      link: "/dashboard/desviaciones/estadisticas",
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
          Desviaciones detectadas en SI/RCE en el CBP
        </h3>
      </div>
      <div className={clsx(styles.contenedorPage, "container")}>
        <DataTable />
        <div className="container-fluid d-flex justify-content-end">
          {/* Usa el componente Link para la navegación */}
          <Link href="/dashboard/desviaciones/estadisticas/niveles-riego">
            <CustomButton
              label="Niveles de Riesgo"
              backgroundColor="#EE3333"
              textColor="#FFFFFF"
            />
          </Link>
          <Link href="/dashboard/desviaciones/estadisticas/corregidas">
            <CustomButton
              style={{
                marginLeft: "10px",
              }}
              label="Desviaciones Corregidas"
              backgroundColor="#161A6A"
              textColor="#FFFFFF"
            />
          </Link>
        </div>
      </div>
    </LayoutSidebar>
  );
}

export default Page;
