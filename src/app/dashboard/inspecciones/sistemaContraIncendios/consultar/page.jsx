import LayoutSidebar from '@/app/components/layoutSidebar';
import UrlRow from '@/app/components/urlRow';
import { RiCheckboxIndeterminateFill } from "react-icons/ri"; 
import clsx from 'clsx';
import styles from '@/app/dashboard/administradores/consultar/styles/consultarPage.module.css'
import Tabla from '../components/TablaIncendio';
function Page() {
    const breadcrumbs = [
        {
          label: "Inicio",
          link: "/dashboard",
        },
        {
          label: "Inspecciones",
          link: "/dashboard/inspecciones",
        },
        {
          label: "Sistemas contra incendio",
          link: "/dashboard/inspecciones/sistemaContraIncendios",
        },
        {
          label: "Consultar actividad ",
          link: "/dashboard/inspecciones/sistemaContraIncendios/consultar",
        }
      ];

    return (
        <LayoutSidebar>
           
            <div className="container-fluid">
            <div className="container-fluid"
            style={{
                marginLeft:'20px'
            }}>
            <UrlRow breadcrumbs={breadcrumbs}  />

            </div>
            <div className="container-fluid mt-4">
                <div className={clsx(styles.headerContainer)}>
                    <RiCheckboxIndeterminateFill size={40}   style={{
                marginLeft:'20px'
            }} className={styles.headerIcon} />
                    <h2 className={styles.title}>Consultar Actividades</h2>
                </div>
                <div className={clsx(styles.contenedorPage, 'container')}>
                    <h2 className={clsx(styles.listadoTitle)}>Listado Completo de Registros</h2>
                    <p className={clsx('text-muted',styles.description)}>
                        Estimado usuario(a), en esta sección usted podrá ver el listado simple de registros guardados en la base de datos; además de gestionar dichos registros como lo son las opciones de <span style={{
                            color:'#FF0000'
                        }}>  ( Modificar y Eliminar Registros ) </span>.
                    </p>
                    <div className="container">
                <Tabla/>

                </div>
                </div>
           
            </div>
            
            </div>
            {/* Breadcrumbs */}
           
        </LayoutSidebar>
    );
}

export default Page;
