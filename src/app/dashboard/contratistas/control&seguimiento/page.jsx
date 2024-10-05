import LayoutSidebar from "@/app/components/layoutSidebar";
import InputComponent from "../../desviaciones/crear/components/InputsModify";
import UrlRow from "@/app/components/urlRow";
import CustomButton from "@/app/components/CustomBotton";
function page() {
  const breadcrumbs = [
    { label: "Inicio", link: "/dashboard" },
    { label: "Contratistas", link: "/dashboard/contratistas" },
    { label: "Control y Seguimiento ", link: "" },
  ];

  return (
    <LayoutSidebar>
      <div className=" container-fluid" style={{ marginLeft: "20px" }}>
        <UrlRow breadcrumbs={breadcrumbs} />

        {/* Contenido Principal - Tarjetas Superiores */}
        <div className="container-fluid mt-4">
          <div className="contenedortexto text-center  fs-2">
            <h2 className="fs-3">Gerencia SIHO-A</h2>
            <h2 className="fs-3">Plan de Evaluaciones de Contratistas</h2>
            <h2 className="fs-3">NORMA PDVSA SI-S-04</h2>
          </div>
          <div
            className="container"
            style={{
              width: "50%",

              position: "relative",
              marginLeft: "20px",
              marginRight: "20px",
              marginTop: "20px",
            }}
          >
            <InputComponent
              label="Seleccione una contrata"
              type="select"
              placeholder="Contrata"
              options={[
                {
                  value: "contrata1",
                  label: "Contrata 1",
                },
                {
                  value: "contrata2",
                  label: "Contrata 2",
                },
              ]}
            />
            <div className="mt-2">
              <CustomButton
                label="CONTROL"
                backgroundColor="#EE3333"
                textColor="#ffffff"
                style={{
                  padding: "10px",
                  width: "50%",
                }}
              />
            </div>
            <div className="mt-2">
              <CustomButton
                label="SEGUIMIENTO"
                backgroundColor="#161A6A"
                textColor="#ffffff"
                style={{
                  padding: "10px",
                  width: "50%",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contenedor de Línea */}
    </LayoutSidebar>
  );
}

export default page;
