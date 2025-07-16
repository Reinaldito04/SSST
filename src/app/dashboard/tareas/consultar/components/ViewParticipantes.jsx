import React from 'react';
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    border: "none",
    borderRadius: "12px",
    overflow: "hidden",
    width: "90%",
    maxWidth: "550px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 1050,
    backdropFilter: "blur(3px)",
  },
};

function ViewParticipantes({ tasks, open, close }) {
  return (
    <Modal
      isOpen={open}
      onRequestClose={close}
      style={customStyles}
      contentLabel="Ver Participantes"
      closeTimeoutMS={300}
    >
      <div className="modal-content border-0">
        {/* Encabezado con gradiente */}
        <div className="modal-header border-0 text-white" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}>
          <h5 className="modal-title fw-bold">
            <i className="bi bi-people-fill me-2"></i>
            Lista de Participantes
          </h5>
          <button 
            type="button" 
            className="btn-close btn-close-white" 
            onClick={close}
            aria-label="Close"
          ></button>
        </div>
        
        {/* Cuerpo del modal */}
        <div className="modal-body p-0">
          {tasks && tasks.length > 0 ? (
            <ul className="list-group list-group-flush">
              {tasks.map((task, index) => (
                <li 
                  key={index} 
                  className="list-group-item d-flex justify-content-between align-items-center py-3 px-4"
                  style={{
                    borderLeft: 'none',
                    borderRight: 'none',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'inherit'}
                >
                  <div className="d-flex align-items-center">
                    <div className="avatar-sm me-3" style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: '#e9ecef',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#6c757d',
                      fontWeight: 'bold'
                    }}>
                      {task.name ? task.name.charAt(0).toUpperCase() : (index + 1)}
                    </div>
                    <div>
                      <h6 className="mb-0 fw-semibold">{task.name || `Participante ${index + 1}`}</h6>
                      {task.email && <small className="text-muted">{task.email}</small>}
                    </div>
                  </div>
                  {task.role && (
                    <span 
                      className="badge rounded-pill px-3 py-2"
                      style={{
                        background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
                        color: '#2c3e50',
                        fontWeight: '500'
                      }}
                    >
                      {task.role}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-people text-muted" style={{ fontSize: '3rem', opacity: 0.5 }}></i>
              <p className="mt-3 text-muted">No hay participantes disponibles</p>
            </div>
          )}
        </div>
        
        {/* Pie del modal */}
        <div className="modal-footer border-0 bg-light">
          <button 
            type="button" 
            className="btn btn-outline-secondary rounded-pill px-4"
            onClick={close}
          >
            Cerrar
          </button>
          <button 
            type="button" 
            className="btn btn-primary rounded-pill px-4"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none'
            }}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Agregar Participante
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ViewParticipantes;