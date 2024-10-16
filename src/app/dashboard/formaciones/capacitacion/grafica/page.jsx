import LayoutSidebar from "@/app/components/layoutSidebar";
import UrlRow from "@/app/components/urlRow";
import styles from "@/app/dashboard/administradores/registrar/styles/registrarPage.module.css";
import clsx from "clsx";
import { HiOutlineUsers } from "react-icons/hi2";
import GraphComponent from "../components/Grafica";
export default function page() {
  const breadcrumbs = [
    { label: "Inicio", link: "/dashboard" },
    { label: "Formaciones", link: "/dashboard/formaciones" },
    { label: "Gráfica", link: "" },
  ];

  return (
    <LayoutSidebar>
      <div className="container-fluid">
        <div className="container-fluid" style={{ marginLeft: "20px" }}>
          <UrlRow breadcrumbs={breadcrumbs} />
        </div>
      </div>

      <div className="container-fluid mt-4">
        <div className="row align-items-center">
          <div className="col-md-12 col-12 d-flex align-items-center mb-3">
            <HiOutlineUsers
              size={40}
              className="text-black"
              style={{ marginLeft: "50px" }}
            />
            <h2 className="mb-0">Gráfica Horas Hombres Adiestramiento SIHO </h2>
          </div>
        </div>

        <div
          className={clsx(styles.contenedorRegistrar, "container")}
          style={{
            width: "95%", // Cambiado a 100% para ocupar todo el ancho
            margin: "0 auto",
            marginTop: "10px",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",

            flexDirection: "column",
            gap: "10px",
            position: "relative",
            padding: "0px",
            borderRadius: "10px",
          }}
        >
          <div className="w-100">
            <div
              className="container"
              style={{
                paddingBottom: "20px",
              }}
            >
              <GraphComponent/>
            </div>
          </div>
        </div>
      </div>
    </LayoutSidebar>
  );
}
