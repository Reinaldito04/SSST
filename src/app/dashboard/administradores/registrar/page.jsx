import LayoutSidebar from "@/app/components/layoutSidebar";
import UrlRow from "@/app/components/urlRow";
import { CiCirclePlus } from "react-icons/ci";
import AlertMessage from "./components/alertRegister";
import clsx from "clsx";
import styles from "./styles/registrarPage.module.css";
import Form from "./components/Form";
function Page() {
  const breadcrumbs = [
    { label: "Inicio", link: "/dashboard" },
    { label: "Administrador", link: "/dashboard/administradores" },
    { label: "Registrar nuevo administrador", link: "" },
  ];

  return (
    <LayoutSidebar>
      <div className="scrollable-section container-fluid"
      style={
        {
          marginLeft:'20px'
        }
      }>
        <UrlRow breadcrumbs={breadcrumbs} />

        {/* Contenido Principal */}
        <div className="container-fluid mt-4">
          <div className="row  align-items-center">
            <div
              className="col-md-12 col-12
     d-flex align-items-center "
            >
              <CiCirclePlus size={40} className="text-black me-2" />
              <h2 className="mb-0">Registrar Usuarios Administradores</h2>
            </div>
          </div>
          <div className={clsx(styles.contenedorRegistrar, "container-fluid")}>
            <div className="container-fluid">
              <AlertMessage />
              <Form />
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumbs */}
    </LayoutSidebar>
  );
}

export default Page;
