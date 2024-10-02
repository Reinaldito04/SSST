import GraphicHome from "../components/GraphicHome";
import Layout from "../components/layoutSidebar";
import CardDashboard from "./components/CardDarshboard";

function Page() {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row mx-auto">
          <div className="col-md-4 mb-4">
            <CardDashboard />
          </div>
          <div className="col-md-4 mb-4">
            <CardDashboard />
          </div>
          <div className="col-md-4 mb-4">
            <CardDashboard />
          </div>
            <div
              className="col-md-12 card mb-4"
              style={{
                width: "100%",
                margin: "0 auto",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                backgroundColor: "#f8f9fa",
              }}
            >
                <div className="card-body ">
                  <h5 className="card-title">
                    Cumplimiento de cronograma de inspecciones
                  </h5>
                </div>
                <div className="container">
                  <GraphicHome urlEndpoint="get-graph-data" />
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
              }}
            >
                <div className="card-body ">
                  <h5 className="card-title">
                    Cumplimiento de cronograma de inspecciones
                  </h5>
                </div>
                <div className="container">
                  <GraphicHome urlEndpoint="get-graph-incendio" />
                </div>
              </div>
          </div>
      </div>
    </Layout>
  );
}

export default Page;
