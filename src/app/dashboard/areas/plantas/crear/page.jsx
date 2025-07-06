import LayoutSidebar from "../../../../components/layoutSidebar";
import UrlRow from "../../../../components/urlRow";
import { CiCirclePlus } from "react-icons/ci";
import AlertMessage from "../../../administradores/registrar/components/alertRegister";
import clsx from "clsx";
import styles from "./styles/registrarPage.module.css";
import Form from "./components/Form";
function Page() {
  const breadcrumbs = [
    { label: "Inicio", link: "/dashboard" },
    { label: "Areas", link: "/dashboard/areas" },
    { label: "Plantas", link: "/dashboard/areas/plantas" },
    { label: "Registrar nueva planta", link: "" },
  ];

  return (
    <LayoutSidebar>
      <div
        className=" container-fluid"
        style={{
          marginLeft: "20px",
        }}
      >
        <UrlRow breadcrumbs={breadcrumbs} />

        {/* Contenido Principal */}
        <div className="container-fluid mt-4">
          <div className="row  align-items-center">
            <div
              className="col-md-12 col-12
             d-flex align-items-center "
            >
              <CiCirclePlus
                size={40}
                className="text-black me-2"
                style={{
                  marginLeft: "10px",
                }}
              />
              <h2 className="mb-0">Registrar Planta </h2>
            </div>
          </div>
          <div
            className={clsx(styles.contenedorRegistrar, "container-fluid")}
            style={{ marginLeft: "10px" }}
          >
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
