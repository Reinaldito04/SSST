import GraphicHome from "../components/GraphicHome";
import Layout from "../components/layoutSidebar";
import CardDashboard from "./components/CardDarshboard";
import GraficaCronograma from "./cronograma/components/GraficaCronograma";
import GraficaEstatus from "./inspecciones/sistemaContraIncendios/components/GraficaEstatus";
import CardWelcomeUser from "../components/CardWelcomeUser";
import Administrador from "../assets/icon-admins.png";
import clsx from "clsx";
import Analista from "../assets/icon-empleados.png";
import CardModule from "./components/CardModule";
import { FaUsers, FaChartPie, FaFileAlt, FaCalendarCheck, FaCog , FaTasks} from "react-icons/fa";
function Page() {
  return (
    <Layout>
      <div className="container-fluid container mt-2 ">
        <div className="row mx-auto">
          <div className="col-md-4 mb-4">
            <CardDashboard
              ruta="getAdministradoresCantidad"
              title="Número de Administradores"
              subtitle="Administradores registrados"
            />
          </div>
          <div className="col-md-4 mb-4">
            <CardDashboard
              ruta="getAnalistasCantidad"
              title="Número de Analistas"
              subtitle="Analistas registrados"
            />
          </div>
          <div className="col-md-4 mb-4">
            <CardDashboard
              ruta=""
              title="Numeros de Casos "
              subtitle="Casos registrados"
            />
          </div>
       <div className="row g-4">
        <div className="col-md-4 col-lg-4">
          <CardModule
            icon={<FaUsers />}
            title="Usuarios"
            description="Gestión de usuarios y permisos"
            bgColor="bg-primary"
          />
        </div>
        
        <div className="col-md-4 col-lg-4">
          <CardModule
            icon={<FaChartPie />}
            title="Reportes"
            description="Generación de reportes estadísticos"
            bgColor="bg-success"
          />
        </div>
        

         <div className="col-md-4 col-lg-4">
          <CardModule
            icon={<FaTasks />}
            title="Casos"
            description="Gestión de casos y seguimientos"
            bgColor="bg-danger"
          />
        </div>
        <div className="col-md-6 col-lg-4">
          <CardModule
            icon={<FaFileAlt />}
            title="Documentos"
            description="Administración de documentos"
            bgColor="bg-info"
          />
        </div>
        
        <div className="col-md-6 col-lg-4">
          <CardModule
            icon={<FaCalendarCheck />}
            title="Calendario"
            description="Programación de actividades"
            bgColor="bg-warning"
            textColor="text-dark"
          />
        </div>
        
        <div className="col-md-6 col-lg-4">
          <CardModule
            icon={<FaCog />}
            title="Configuración"
            description="Ajustes del sistema"
            bgColor="bg-secondary"
          />
        </div>
      </div>
        
        </div>
      </div>
    </Layout>
  );
}

export default Page;
