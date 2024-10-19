import LayoutSidebar from "@/app/components/layoutSidebar";
import UrlRow from "@/app/components/urlRow";
import { RiCheckboxIndeterminateFill } from "react-icons/ri";
import clsx from "clsx";
import styles from "@/app/dashboard/administradores/consultar/styles/consultarPage.module.css";
import GraficaCronograma from "../components/GraficaCronograma";

function Page() {
    const breadcrumbs = [
        { label: "Inicio", link: "/dashboard" },
        { label: "Grafica de cronograma", link: "/dashboard/cronograma/grafica" },
       
    ]
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
            Gráfica de cronograma
            </h2>
          </div>
          <div className={clsx(styles.contenedorPage, "container")}>

            <div className="container">
                <h2 className="text-center"> 
                    CUMPLIMIENTO DE PROGRAMA DE INSPECCIONES SI/RCE
                </h2>
                <GraficaCronograma/>
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumbs */}
    </LayoutSidebar>
  );
}

export default Page;
