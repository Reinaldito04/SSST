import LayoutSidebar from "@/app/components/layoutSidebar";
import UrlRow from "@/app/components/urlRow";
import { CiCirclePlus } from "react-icons/ci";
import styles from "./styles/crearPage.module.css";
import clsx from "clsx";
import Form from "./components/FormCrear";

function page() {
  const breadcrumbs = [
    { label: "Inicio", link: "/dashboard" },
    { label: "Desviaciones", link: "/dashboard/desviaciones" },
    { label: "Registrar Desviaciones", link: "" },
  ];

  return (
    <LayoutSidebar>
      <div className="container-fluid">
        <div
          className="container-fluid"
          style={{
            marginLeft: "0px",

            position: "relative",
            width: "100%",
          }}
        >
          <div className="contenedorurl" style={{
            marginLeft:'20px'
            
          }}>
            <UrlRow styles={{}} breadcrumbs={breadcrumbs} />
          </div>
        </div>

        <div className="container mt-4">
          <div className="row  align-items-center">
            <div
              className="col-md-12 col-12
           d-flex align-items-center "
            >
              <CiCirclePlus size={40} className="text-black me-2" />
              <h2 className="mb-0">Registrar Desviaciones</h2>
            </div>
          </div>
          <div className={clsx(styles.contenedorPage, "container-fluid")}>
            <Form />
          </div>
        </div>
      </div>
    </LayoutSidebar>
  );
}

export default page;
