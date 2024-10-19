import GraphicHome from "../components/GraphicHome";
import Layout from "../components/layoutSidebar";
import CardDashboard from "./components/CardDarshboard";
import GraficaCronograma from "./cronograma/components/GraficaCronograma";
import GraficaEstatus from "./inspecciones/sistemaContraIncendios/components/GraficaEstatus";

function Page() {
  return (
    <Layout>
      <div className="container-fluid container ">
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
              ruta="getDesviacionesCantidad"
              title="Desviaciones detectadas"
              subtitle="Procesadas / Cerradas"
            />
          </div>
          <div
            className="col-md-12 card mb-4"
            style={{
              width: "100%",
              margin: "0 auto",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              backgroundColor: "#f8f9fa",
              overflow: "hidden",
            }}
          >
            <div className="card-body ">
              <h5 className="card-title">
              Cumplimiento de cronograma de inspecciones
              </h5>
            </div>
            <div className="container">
            <GraficaCronograma/>
            </div>
          </div>
          <div
            className="col-md-12 card "
            style={{
              width: "100%",
              margin: "0 auto",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              backgroundColor: "#f8f9fa",
              overflow: "hidden",
            }}
          >
            <div className="card-body ">
              <h5 className="card-title">
              Indicador de Sistemas contra Incendio
              </h5>
            </div>
            <div className="container">
            <GraficaEstatus/>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Page;
