'use client';
import React from "react";
import LayoutSidebar from "../../components/layoutSidebar.jsx";
import UrlRow from "../../components/urlRow.jsx";
import { FiDatabase, FiFileText, FiDownload } from "react-icons/fi";
import styles from "../ier/consultar/styles/consultarPage.module.css";
import clsx from "clsx";
import { axioInstance } from "../../utils/axioInstance.jsx";
function page() {
  const breadcrumbs = [
    {
      label: "Inicio",
      link: "/dashboard",
    },
    {
      label: "Configuración",
      link: "/dashboard/config",
    },
  ];

  // Función para manejar la descarga (simulada)
 const handleDownload = (type) => {
  const link = document.createElement('a');
  link.href = `/${type}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.click();
};

 const getSQL = async () => {
  try {
    const response = await axioInstance.get("/backup/download-sql", {
      responseType: "blob", // ¡Importante para archivos!
    });

    // Crear un enlace para descargar el archivo
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;

    // Nombre de archivo sugerido (puedes extraerlo del header si tu backend lo envía)
    link.setAttribute("download", "backup.sql");
    document.body.appendChild(link);
    link.click();

    // Limpiar
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error al obtener el SQL:", error);
  }
};


  return (
    <LayoutSidebar>
      {/* Breadcrumbs */}
      <div
        className="contenedorURL"
        style={{
          marginLeft: "20px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          className="contenedorurl"
          style={{
            marginLeft: "20px",
          }}
        >
          <UrlRow
            breadcrumbs={breadcrumbs}
            styles={{
              marginLeft: "20px",
            }}
          />
        </div>
      </div>

      <div className="container mt-4">
        <div className={clsx(styles.headerContainer)}>
          <FiDatabase size={40} className={styles.headerIcon} />
          <h2 className={styles.title}>Configuracion</h2>
        </div>
      </div>
      
      <div className={clsx(styles.contenedorPage, "container")}>
        {/* Sección de Documentación */}
        <div className="card mb-4">
          <div className="card-header bg-primary text-white">
            <h5><FiFileText className="me-2" />Documentación del Sistema</h5>
          </div>
          <div className="card-body">
            <div className="row">
              {/* Manual de Usuario */}
              <div className="col-md-4 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Manual de Usuario</h5>
                    <p className="card-text">
                      Guía completa para los usuarios finales del sistema.
                    </p>
                  </div>
                  <div className="card-footer bg-transparent">
                    <button 
                      className="btn btn-primary w-100"
                      onClick={() => handleDownload('ManualUsuario.pdf')}
                    >
                      <FiDownload className="me-2" /> Descargar
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Manual de Uso */}
              <div className="col-md-4 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Manual de Uso</h5>
                    <p className="card-text">
                      Instrucciones detalladas sobre el funcionamiento del sistema.
                    </p>
                  </div>
                  <div className="card-footer bg-transparent">
                    <button 
                      className="btn btn-primary w-100"
                      onClick={() => handleDownload('ManualPlan.pdf')}
                    >
                      <FiDownload className="me-2" /> Descargar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de Respaldo de Base de Datos */}
        <div className="card">
          <div className="card-header bg-success text-white">
            <h5><FiDatabase className="me-2" />Respaldo de Base de Datos</h5>
          </div>
          <div className="card-body">
            <p>
              Genera un respaldo completo de la base de datos del sistema.
            </p>
            <div className="d-grid gap-2">
              <button 
                className="btn btn-success"
                onClick={() => getSQL()}
              >
                <FiDownload className="me-2" /> Generar Respaldo
              </button>
            </div>
          </div>
        </div>
      </div>
    </LayoutSidebar>
  );
}

export default page;