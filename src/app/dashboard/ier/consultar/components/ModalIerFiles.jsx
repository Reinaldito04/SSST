import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  FaDownload,
  FaUpload,
  FaTimes,
  FaSpinner,
  FaFilePdf,
  FaTrash,
} from "react-icons/fa";
import { axioInstance } from "../../../../utils/axioInstance";
import Swal from "sweetalert2";

// Estilos mejorados para el modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "900px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
    padding: "25px 30px",
    border: "none",
    backgroundColor: "#f8f9fa",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(3px)",
    zIndex: 1000,
  },
};

// Estilos para la tabla
const tableStyles = {
  header: {
    backgroundColor: "#343a40",
    color: "white",
  },
  row: {
    transition: "background-color 0.2s ease",
  },
  rowHover: {
    backgroundColor: "#f1f1f1",
  },
};

function ModalIerFiles({ ier, isOpen, onClose }) {
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIer, setCurrentIer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchIerData = async () => {
    if (!ier) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axioInstance.get(`/iers/${ier.id}`);
      setCurrentIer(response.data.data);

      setIsLoading(false);
    } catch (error) {
      console.error("Error al obtener datos del IER:", error);
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron actualizar los archivos",
        background: "#f8f9fa",
      });
    }
  };

  useEffect(() => {
    fetchIerData();
  }, [ier]);
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFilesToUpload(selectedFiles);
  };

  const handleUpload = async () => {
    if (filesToUpload.length === 0) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("ier_id", ier.id);

      filesToUpload.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });

      const response = await axioInstance.post("/iers/assign-files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        icon: "success",
        title: "Archivos subidos",
        text: `Se subieron ${filesToUpload.length} archivo(s) correctamente`,
        timer: 2000,
        showConfirmButton: false,
        background: "#f8f9fa",
      });
      setFilesToUpload([]);
      document.getElementById("file-upload").value = "";

      await fetchIerData();
    } catch (error) {
      console.error("Error al subir archivos:", error);

      let errorMessage = "Error al subir los archivos";
      if (error.response) {
        if (error.response.status === 413) {
          errorMessage = "Los archivos son demasiado grandes (máximo 10MB)";
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        }
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        background: "#f8f9fa",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteFile = async (file) => {
    try {
      await axioInstance.post(`/iers/delete-files`, {
        file_ids: [file.id],
        ier_id: ier.id,
      });
      Swal.fire({
        icon: "success",
        title: "Archivo eliminado",
        text: `El archivo ${file.name} se ha eliminado correctamente`,
        timer: 2000,
        showConfirmButton: false,
        background: "#f8f9fa",
      });
      await fetchIerData();
    } catch (error) {
      console.error("Error al eliminar el archivo:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al eliminar el archivo",
        background: "#f8f9fa",
      });
    }
  };

  const handleDownloadFile = async (file) => {
    setIsDownloading(true);
    try {
      const response = await axioInstance.get(`/files/${file.id}`, {
        responseType: "blob",
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      const contentDisposition = response.headers["content-disposition"];
      let fileName = file.name;

      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
        if (fileNameMatch && fileNameMatch[1]) {
          fileName = fileNameMatch[1];
        }
      }

      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      Swal.fire({
        icon: "success",
        title: "Descarga completada",
        text: `El archivo ${fileName} se ha descargado correctamente`,
        timer: 2000,
        showConfirmButton: false,
        background: "#f8f9fa",
      });
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al descargar el archivo",
        background: "#f8f9fa",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const removeFileFromUploadList = (index) => {
    const updatedFiles = [...filesToUpload];
    updatedFiles.splice(index, 1);
    setFilesToUpload(updatedFiles);
  };

  const closeModal = () => {
    onClose();
    setFilesToUpload([]);
    setCurrentIer([]);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Archivos del IER"
      ariaHideApp={false}
    >
      <div className="modal-header d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <h5 className="modal-title font-weight-bold text-dark">
          <FaFilePdf className="mr-2 text-danger" />
          Archivos del IER:{" "}
          <span className="text-primary">{ier?.name || "Sin nombre"}</span>
        </h5>
        <button
          onClick={closeModal}
          className="btn btn-sm btn-outline-secondary rounded-circle p-2"
          aria-label="Cerrar"
          style={{ width: "40px", height: "40px" }}
        >
          <FaTimes />
        </button>
      </div>

    {isLoading ? (
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="spinner-border text-primary" role="status">
          </div>
        </div>
      ) : null}

      {!isLoading ? (
<div
        className="table-responsive rounded-lg shadow-sm mb-4"
        style={{
          maxHeight: "200px",
          overflowY: "auto",
        }}
      >

        
        <table className="table table-hover mb-0">
          <thead style={tableStyles.header}>
            <tr>
              <th className="py-3">Nombre del Archivo</th>
              <th className="py-3">Tipo</th>
              <th className="py-3">Tamaño</th>
              <th className="py-3">Fecha de Subida</th>
              <th className="py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentIer?.files?.length > 0 ? (
              currentIer.files.map((archivo, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="align-middle font-weight-medium">
                    {archivo.name}
                  </td>
                  <td className="align-middle text-uppercase text-muted">
                    {archivo.file_extension}
                  </td>
                  <td className="align-middle">
                    {(archivo.file_size / 1024).toFixed(2)} KB
                  </td>
                  <td className="align-middle">
                    {new Date(archivo.created_at).toLocaleDateString()}
                  </td>
                  <td className="align-middle text-center d-flex gap-2 justify-content-center">
                    <button
                      onClick={() => handleDownloadFile(archivo)}
                      disabled={isDownloading || isDeleting}
                      className="btn btn-sm btn-primary rounded-pill px-3 py-1"
                      style={{ minWidth: "110px" }}
                    >
                      {isDownloading ? (
                        <>
                          <FaSpinner className="fa-spin mr-2" /> Descargando...
                        </>
                      ) : (
                        <>
                          <FaDownload className="mr-2" /> Descargar
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDeleteFile(archivo)}
                      disabled={isDownloading || isDeleting}
                      className="btn btn-sm btn-danger rounded-pill px-3 py-1"
                      style={{ minWidth: "110px" }}
                    >
                      {isDeleting ? (
                        <>
                          <FaSpinner className="fa-spin mr-2" /> Eliminando...
                        </>
                      ) : (
                        <>
                          <FaTrash className="mr-2" /> Eliminar
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-muted">
                  No hay archivos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      ) : null}

      

      <div className="mt-4 p-4 border rounded bg-white shadow-sm">
        <h6 className="font-weight-bold mb-3 d-flex align-items-center">
          <FaUpload className="mr-2 text-success" />
          Subir nuevos archivos
        </h6>
        <div className="mb-3">
          <div className="custom-file">
            <input
              type="file"
              id="file-upload"
              className="custom-file-input"
              onChange={handleFileChange}
              accept=".pdf"
              multiple
            />
            <label
              className="custom-file-label border rounded-pill px-4 py-2 bg-light"
              htmlFor="file-upload"
              style={{ cursor: "pointer" }}
            >
              {filesToUpload.length > 0
                ? `${filesToUpload.length} archivo(s) seleccionado(s)`
                : "Seleccionar archivos (PDF)"}
            </label>
          </div>
          <small className="text-muted d-block mt-2">
            Formatos aceptados: PDF (máx. 10MB cada uno)
          </small>
        </div>

        {filesToUpload.length > 0 && (
          <div className="mb-3">
            <h6 className="font-weight-bold mb-2">Archivos a subir:</h6>
            <ul className="list-group rounded-lg overflow-hidden">
              {filesToUpload.map((file, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center py-2 px-3"
                  style={{ borderLeft: "4px solid #28a745" }}
                >
                  <span
                    className="text-truncate mr-2"
                    style={{ maxWidth: "70%" }}
                  >
                    {file.name}{" "}
                    <small className="text-muted">
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </small>
                  </span>
                  <button
                    className="btn btn-sm btn-outline-danger rounded-circle p-1 align-self-center justify-self-center"
                    style={{ width: "28px", height: "28px" }}
                    onClick={() => removeFileFromUploadList(index)}
                    title="Eliminar"
                  >
                    <FaTimes size={12} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={filesToUpload.length === 0 || isUploading}
          className="btn btn-success w-100 py-2 rounded-pill font-weight-bold shadow-sm"
          style={{
            transition: "all 0.3s ease",
            opacity: filesToUpload.length === 0 ? 0.7 : 1,
          }}
        >
          {isUploading ? (
            <>
              <FaSpinner className="fa-spin mr-2" /> Subiendo archivos...
            </>
          ) : (
            <>
              <FaUpload className="mr-2" /> Subir{" "}
              {filesToUpload.length > 0 ? `(${filesToUpload.length})` : ""}
            </>
          )}
        </button>
      </div>
    </Modal>
  );
}

export default ModalIerFiles;
