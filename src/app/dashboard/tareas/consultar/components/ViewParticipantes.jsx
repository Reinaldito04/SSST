import React, { useState } from 'react';
import Modal from "react-modal";
import { axioInstance } from '../../../../utils/axioInstance';
import Swal from 'sweetalert2';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showAddSection, setShowAddSection] = useState(false);
  const participants = tasks?.participants || [];
  // Función para buscar usuarios en la API
  const searchUsers = async () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await axioInstance.get(`/users?search=${searchTerm}`);
      setSearchResults(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Función para agregar un nuevo participante
  const addParticipant = async (user) => {
    try {
      const response = await axioInstance.post(`/tasks/assign-participants`, 
        {
          taskId: tasks.id,
          userId: [user.id]
        }
      );
      Swal.fire({
        icon: "success",
        title: "Participante Agregado",
        text: "El participante se ha agregado correctamente",
        background: "#f8f9fa",
      })
      console.log("Participant added:", response.data);
    } catch (error) {
      console.error("Error adding participant:", error);
    } finally {
      setSearchTerm('');
      setSearchResults([]);
      setShowAddSection(false);
    }
  };

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
          {/* Sección para agregar nuevos participantes */}
          {showAddSection && (
            <div className="p-4 border-bottom">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control rounded-pill"
                  placeholder="Buscar usuarios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchUsers()}
                />
                <button 
                  className="btn btn-primary rounded-pill ms-2"
                  onClick={searchUsers}
                  disabled={isSearching || !searchTerm.trim()}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none'
                  }}
                >
                  {isSearching ? 'Buscando...' : 'Buscar'}
                </button>
              </div>
              
              {/* Resultados de búsqueda */}
              {searchResults.length > 0 && (
                <div className="search-results mt-3">
                  <h6 className="text-muted mb-2">Resultados de búsqueda:</h6>
                  <ul className="list-group">
                    {searchResults.map((user, index) => (
                      <li 
                        key={`search-${index}`}
                        className="list-group-item d-flex justify-content-between align-items-center py-2 px-3 mb-2 rounded"
                        style={{
                          borderLeft: 'none',
                          borderRight: 'none',
                          backgroundColor: '#f8f9fa'
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <div className="avatar-sm me-3" style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: '#e9ecef',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#6c757d',
                            fontWeight: 'bold'
                          }}>
                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <div>
                            <h6 className="mb-0 fw-semibold">{user.name || `Usuario ${index + 1}`}</h6>
                            {user.email && <small className="text-muted">{user.email}</small>}
                          </div>
                        </div>
                        <button 
                          className="btn btn-sm btn-outline-primary rounded-pill"
                          onClick={() => addParticipant(user)}
                        >
                          <i className="bi bi-plus"></i> Agregar
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          
          {/* Lista de participantes existentes */}
          {participants && participants.length > 0 ? (
            <ul className="list-group list-group-flush">
              {participants.map((participant, index) => (
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
                      {participant.name ? participant.name.charAt(0).toUpperCase() : (index + 1)}
                    </div>
                    <div>
                      <h6 className="mb-0 fw-semibold">{participant.name || `Participante ${index + 1}`}</h6>
                      {participant.email && <small className="text-muted">{participant.email}</small>}
                    </div>
                  </div>
                  {participant.role && (
                    <span 
                      className="badge rounded-pill px-3 py-2"
                      style={{
                        background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
                        color: '#2c3e50',
                        fontWeight: '500'
                      }}
                    >
                      {participant.role}
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
            onClick={() => setShowAddSection(!showAddSection)}
          >
            <i className={`bi ${showAddSection ? 'bi-x-circle' : 'bi-plus-circle'} me-2`}></i>
            {showAddSection ? 'Cancelar' : 'Agregar Participante'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ViewParticipantes;