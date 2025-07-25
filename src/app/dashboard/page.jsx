import Layout from "../components/layoutSidebar";

import CardModule from "./components/CardModule";
import HasPermission from "../components/HasPermission";
import {
  FaUsers,
  FaChartPie,
  FaFileAlt,
  FaCalendarCheck,
  FaCog,
  FaTasks,
} from "react-icons/fa";
import { redirect } from "next/navigation";
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
                icon={<FaChartPie />}
                title="Reportes"
                description="Generación de reportes estadísticos"
                bgColor="bg-success"
              />
            </div>

             <HasPermission permissionName={"tasks-browse"}>
              <div className="col-md-4 col-lg-4">
                <CardModule
                  icon={<FaFileAlt />}
                  href={"/dashboard/tareas/consultar"}
                  title="Tareas"
                  description="Gestión de Tareas"
                  bgColor="bg-info"
                />
              </div>
            </HasPermission>
            <HasPermission permissionName={"departments-browse"}>
              <div className="col-md-6 col-lg-4">
                <CardModule
                  icon={<FaFileAlt />}
                  href={"/dashboard/departamentos/consultar"}
                  title="Departamentos"
                  description="Gestión de departamentos"
                  bgColor="bg-info"
                />
              </div>
            </HasPermission>

            <HasPermission permissionName={"areas-browse"}>
              <div className="col-md-6 col-lg-4">
                <CardModule
                  icon={<FaFileAlt />}
                  href={"/dashboard/areas/consultar"}
                  title="Areas"
                  description="Gestión de areas"
                  bgColor="bg-success"
                />
              </div>
            </HasPermission>

           
            <HasPermission permissionName={"articles-browse"}>
              <div className="col-md-6 col-lg-4">
                <CardModule
                  icon={<FaFileAlt />}
                  href={"/dashboard/articulos/consultar"}
                  title="Articulos"
                  description="Gestión de articulos"
                  bgColor="bg-danger"
                />
              </div>
            </HasPermission>


            <HasPermission permissionName={"iers-browse"}>
              <div className="col-md-6 col-lg-4">
                <CardModule
                  icon={<FaFileAlt />}
                  href={"/dashboard/ier/consultar"}
                  title="IER"
                  description="Gestión de IER"
                  bgColor="bg-danger"
                />
              </div>
            </HasPermission>

          
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Page;
