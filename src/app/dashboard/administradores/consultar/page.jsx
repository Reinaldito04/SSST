import LayoutSidebar from '@/app/components/layoutSidebar';
import UrlRow from '@/app/components/urlRow';
import styles from './styles/consultarPage.module.css';
import { RiCheckboxIndeterminateFill } from "react-icons/ri"; 
import clsx from 'clsx';
import Tabla from './components/tableConsult';
function Page() {
    const breadcrumbs = [
        { label: "Inicio", link: "/dashboard" },
        { label: "Administrador", link: "/dashboard/administradores" },
        { label: "Consultar Administradores", link: "" },
    ];

    return (
        <LayoutSidebar>
            {/* Breadcrumbs */}
            <UrlRow breadcrumbs={breadcrumbs}  />
            <div className="container-fluid mt-4">
                <div className={clsx(styles.headerContainer)}>
                    <RiCheckboxIndeterminateFill size={40} className={styles.headerIcon} />
                    <h2 className={styles.title}>Gestionar Usuarios Administradores</h2>
                </div>
                <div className={clsx(styles.contenedorPage, 'container-fluid')}>
                    <h2 className={clsx(styles.listadoTitle)}>Listado Completo de Registros</h2>
                    <p className={clsx('text-muted',styles.description)}>
                        Estimado usuario(a), en esta sección usted podrá ver el listado simple de registros guardados en la base de datos; además de gestionar dichos registros como lo son las opciones de <span style={{
                            color:'#FF0000'
                        }}>  ( Modificar y Eliminar Registros ) </span>.
                    </p>
                    <Tabla />  
                </div>
            </div>
        </LayoutSidebar>
    );
}

export default Page;
