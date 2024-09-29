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
        </div>
      </div>
    </Layout>
  );
}

export default Page;
