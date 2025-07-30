import Layout from "../components/layoutSidebar";
import CardModule from "./components/CardModule";
import HasPermission from "../components/HasPermission";
import {
  FaUsers,
  FaChartBar,
  FaClipboardList,
  FaCalendarAlt,
  FaCogs,
  FaFolderOpen,
  FaBuilding,
  FaBoxOpen,
  FaSitemap,
  FaInfoCircle,
} from "react-icons/fa";

function Page() {
  return (
    <Layout>
      <div className="container-fluid container mt-2 ">
        <div className="row mx-auto">
          <div className="row g-4">

            <HasPermission permissionName={"users-browse"}>
              <div className="col-md-4 col-lg-4">
                <CardModule
                  href={"/dashboard/administradores/consultar"}
                  icon={<FaUsers />}
                  title="Usuarios"
                  description="Gestión de usuarios y permisos"
                  bgColor="bg-primary"
                />
              </div>
            </HasPermission>

            <div className="col-md-4 col-lg-4">
              <CardModule
                icon={<FaChartBar />}
                title="Reportes"
                href={'/dashboard/reportes/estadisticas/tareas'}
                description="Estadísticas de tareas y más"
                bgColor="bg-success"
              />
            </div>

            <HasPermission permissionName={"task_plans-browse"}>
              <div className="col-md-4 col-lg-4">
                <CardModule
                  icon={<FaCalendarAlt />}
                  title="Planificación"
                  description="Planificación de tareas"
                  bgColor="bg-warning"
                  href="/dashboard/planificacion/consultar"
                />
              </div>
            </HasPermission>

            <HasPermission permissionName={"tasks-browse"}>
              <div className="col-md-4 col-lg-4">
                <CardModule
                  icon={<FaClipboardList />}
                  href={"/dashboard/tareas/consultar"}
                  title="Tareas"
                  description="Gestión de Tareas"
                  bgColor="bg-info"
                />
              </div>
            </HasPermission>

            <HasPermission permissionName={"departments-browse"}>
              <div className="col-md-4 col-lg-4">
                <CardModule
                  icon={<FaBuilding />}
                  href={"/dashboard/departamentos/consultar"}
                  title="Departamentos"
                  description="Gestión de departamentos"
                  bgColor="bg-secondary"
                />
              </div>
            </HasPermission>

            <HasPermission permissionName={"areas-browse"}>
              <div className="col-md-4 col-lg-4">
                <CardModule
                  icon={<FaSitemap />}
                  href={"/dashboard/areas/consultar"}
                  title="Áreas"
                  description="Gestión de áreas"
                  bgColor="bg-dark"
                />
              </div>
            </HasPermission>

            <HasPermission permissionName={"articles-browse"}>
              <div className="col-md-4 col-lg-4">
                <CardModule
                  icon={<FaBoxOpen />}
                  href={"/dashboard/articulos/consultar"}
                  title="Artículos"
                  description="Gestión de artículos"
                  bgColor="bg-danger"
                />
              </div>
            </HasPermission>

            <HasPermission permissionName={"iers-browse"}>
              <div className="col-md-4 col-lg-4">
                <CardModule
                  icon={<FaFolderOpen />}
                  href={"/dashboard/ier/consultar"}
                  title="IER"
                  description="Gestión de IER"
                  bgColor="bg-primary"
                />
              </div>
            </HasPermission>

            <div className="col-md-4 col-lg-4">
              <CardModule
                icon={<FaCogs />}
                href={"/dashboard/config"}
                title="Configuración"
                description="Información y configuración del sistema"
                bgColor="bg-info"
              />
            </div>
            
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Page;
