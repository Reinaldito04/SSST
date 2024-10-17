import LayoutSidebar from "@/app/components/layoutSidebar";
import UrlRow from "@/app/components/urlRow";
import CardIncendio from "./components/CardIncendio";

function Page() {
  const breadcrumbs = [
    { label: "Inicio", link: "/dashboard" },
    { label: "Inspecciones", link: "/dashboard/Inspecciones" },
    { label: "Sistemas contra incendio", link: "" },
  ];

  const cardDataTop = [
    { title: "Estatus", subtitle: "Ir al módulo",colorLine :'#EE3333',colorText:'#EE3333' },
    { title: "Registrar", subtitle: "Ir al módulo" ,colorLine :'#161A6A',colorText:'#161A6A',
      destiny: 'registrar'
    },
    { title: "Gráfica", subtitle: "Ir al módulo" ,colorLine :'#716E6E',colorText:'#716E6E'},
    { title: "Consultar", subtitle: "Ir al módulo",colorLine :'#161A6A',colorText:'#161A6A' },
  ];

  const cardDataBottom = [
    { title: "Inspección de extintores", subtitle: "" ,colorLine :'#FFF177',colorText:'#716E6E'},
    { title: "Inspección de gabinetes de mangueras", subtitle: "" ,colorLine :'#FFF177',colorText:'#716E6E'},
    { title: "Inspección de puertas", subtitle: "" ,colorLine :'#FFF177',colorText:'#716E6E'},

  ];

  return (
    <LayoutSidebar>
      <div className=" container-fluid" style={{ marginLeft: '20px' }}>
        <UrlRow breadcrumbs={breadcrumbs} />
        
        {/* Contenido Principal - Tarjetas Superiores */}
        <div className="container-fluid mt-4">
          <div className="container-fluid">
          <div className="row">
            {cardDataTop.map((card, index) => (
              <div className="col-md-6 mb-4" key={index}>
                <CardIncendio title={card.title} subtitle={card.subtitle} colorLine={card.colorLine} colorText={card.colorText} RouterDestiny={card.destiny} />
              </div>
            ))}
          </div>
          </div>
         
        </div>
        
        {/* Contenedor de Línea */}
        <div
          className="contenedorLinea"
          style={{
            backgroundColor: "#D9D9D9",
            height: "50px",
            width: "100%",
            marginTop: "20px",
            borderRadius: '5px',
            marginBottom: "20px",
          }}
        ></div>

        {/* Contenido Principal - Tarjetas Inferiores */}
        <div className="container-fluid mt-4">
          <div className="container-fluid">
            {cardDataBottom.map((card, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <CardIncendio title={card.title} subtitle={card.subtitle}  colorLine={card.colorLine} colorText={card.colorText} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutSidebar>
  );
}

export default Page;
