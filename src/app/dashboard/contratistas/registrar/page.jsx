import LayoutSidebar from "@/app/components/layoutSidebar";
import UrlRow from "@/app/components/urlRow";
import { CiCirclePlus } from "react-icons/ci";
import AlertMessage from "@/app/dashboard/administradores/registrar/components/alertRegister";
import clsx from "clsx";
import styles from '@/app/dashboard/administradores/registrar/styles/registrarPage.module.css'
import FormCrear from "./components/FormCrear";
function Page() {
  const breadcrumbs = [
    { label: "Inicio", link: "/dashboard" },
    { label: "Contratistas", link: "/dashboard/contratistas" },
    { label: "Registrar Nueva Contratista", link: "" },
  ];

  return (
    <LayoutSidebar>
      {/* Breadcrumbs */}
      <div className="container-fluid"
      style={{
        marginLeft:'30px'
      }}>
      <UrlRow breadcrumbs={breadcrumbs} />

      </div>

      {/* Contenido Principal */}
      <div className="container-fluid mt-4">
        <div className="row  align-items-center">
          <div
            className="col-md-12 col-12
           d-flex align-items-center mb-3 "
          >
            <CiCirclePlus size={40} className="text-black  "
            style={
              {
                marginLeft:'50px'
              }
            }  />
            <h2 className="mb-0">Registrar Nueva Contratista</h2>
          </div>
        </div>
        <div className={clsx(styles.contenedorRegistrar,'container')}
        style={
          {
            width:'98%',
            margin:' 0 auto',
            marginTop:'10px',
            alignContent:'center',
            justifyContent:'center',
            alignItems:'center',
            display:'flex',
            flexDirection:'column',
            gap:'10px',
            borderRadius:'10px',
            

            
          }
        }>
          <div className="container-fluid">
            <div className="container-fluid">
            <AlertMessage />
            <FormCrear/>
                
            </div>
            
          </div>
        </div>
      </div>
    </LayoutSidebar>
  );
}

export default Page;
