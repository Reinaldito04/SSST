import LayoutSidebar from "@/app/components/layoutSidebar"
import UrlRow from "@/app/components/urlRow"
import { CiCalendar } from "react-icons/ci";
import clsx from "clsx";
import styles from '@/app/dashboard/administradores/registrar/styles/registrarPage.module.css'
import FormCumplimiento from "../components/FormCumplimiento";
export default function page() {
    const breadcrumbs = [
        { label: "Inicio", link: "/dashboard" },
        { label: "Cumplimiento de Cronograma", link: "/dashboard/cronograma/cumplimiento" },
       
    ]
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
              <CiCalendar size={40} className="text-black me-2" />
              <h2 className="mb-0">Cumplimiento de Cronograma SI/RCE</h2>
            </div>
          </div>
          <div className={clsx(styles.contenedorRegistrar, "container-fluid")} style={{
            padding:'0',
            paddingBottom:'20px',
          }}>
            
            <FormCumplimiento/>
          </div>
        </div>
      </div>
    </LayoutSidebar>
  )
}
