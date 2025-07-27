"use client";

import React, { useState, useEffect } from "react";
import { axioInstance } from "../../../../utils/axioInstance";
import { useUserStore } from "../../../../store/userStore";
import { FaPaperPlane, FaTrash, FaTimes } from "react-icons/fa";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Swal from "sweetalert2";
import HasPermission from "../../../../components/HasPermission";
import Modal from "react-modal";
import styles from "./CommentsModal.module.css";


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    maxWidth: '90%',
    maxHeight: '80vh',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000
  }
};

const CommentsModal = ({ 
  task = null, 
  isOpen = false, 
  onClose = () => {} 
}) => {
  const { user } = useUserStore();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener comentarios cuando se abre el modal o cambia la tarea
  useEffect(() => {
    if (isOpen && task?.id) {
      fetchComments();
    } else {
      // Resetear estados cuando se cierra el modal
      setComments([]);
      setNewComment("");
      setLoading(true);
      setError(null);
    }
  }, [isOpen, task?.id]);

  const fetchComments = async () => {
    if (!task?.id) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await axioInstance.get(`/tasks/${task.id}/comments`);
      setComments(response?.data?.data || []);
    } catch (err) {
      setError("Error al cargar los comentarios");
      console.error("Error fetching comments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !task?.id) return;

    try {
      const response = await axioInstance.post(`/tasks/${task.id}/comments`, {
        body: newComment,
      });
      setComments([response?.data?.data, ...comments].filter(Boolean));
      setNewComment("");
    } catch (error) {
      Swal.fire("Error", "No se pudo enviar el comentario", "error");
      console.error("Error submitting comment:", error);
    }
  };

  const handleDelete = async (commentId) => {
    if (!commentId) return;

    Swal.fire({
      title: "¿Eliminar comentario?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axioInstance.delete(`/tasks/comments/${commentId}`);
          setComments(comments.filter(comment => comment?.id !== commentId));
          Swal.fire("Eliminado", "El comentario ha sido eliminado", "success");
        } catch (error) {
          Swal.fire("Error", "No se pudo eliminar el comentario", "error");
          console.error("Error deleting comment:", error);
        }
      }
    });
  };

  if (!task) {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="Comentarios de tarea"
      >
        <div className="alert alert-danger">
          No se ha proporcionado información de la tarea
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel={`Comentarios de la tarea: ${task?.title || 'Sin título'}`}
    >
      <div className={styles.modalHeader}>
        <h5 className="mb-0">Comentarios: {task?.title || 'Tarea sin título'}</h5>
        <button 
          onClick={onClose} 
          className={styles.closeButton}
          aria-label="Cerrar modal"
        >
          <FaTimes />
        </button>
      </div>

      <div className={styles.modalBody}>
        {/* Formulario para nuevo comentario */}
        <form onSubmit={handleSubmit} className={styles.commentForm}>
          <div className="form-group mb-3">
            <textarea
              className={`form-control ${styles.commentTextarea}`}
              rows="3"
              placeholder="Escribe un comentario..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              aria-label="Nuevo comentario"
            />
          </div>
          <div className="d-flex justify-content-end">
            <button 
              className="btn btn-primary d-flex align-items-center gap-2"
              type="submit"
              disabled={!newComment.trim()}
            >
              <FaPaperPlane /> Enviar
            </button>
          </div>
        </form>

        {/* Lista de comentarios */}
        <div className={styles.commentsList}>
          {loading ? (
            <div className="text-center py-4">Cargando comentarios...</div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : comments?.length === 0 ? (
            <div className="text-center py-3 text-muted">
              No hay comentarios aún
            </div>
          ) : (
            comments
              .filter(comment => comment) // Filtrar comentarios nulos
              .map((comment) => (
                <div key={comment?.id} className={styles.commentItem}>
                  <div className={styles.commentHeader}>
                    <div>
                      <strong className={styles.commentAuthor}>
                        {comment?.creator?.name || "Usuario desconocido"}
                      </strong>
                      <span className={styles.commentDate}>
                        {comment?.created_at 
                          ? format(new Date(comment.created_at), "PPPpp", { locale: es }) 
                          : "Fecha desconocida"}
                      </span>
                    </div>
                    
                    {(user?.id === comment?.user_id || user?.is_admin) && (
                      <HasPermission permissionName="comments-delete">
                        <button
                          onClick={() => handleDelete(comment?.id)}
                          className={styles.deleteButton}
                          title="Eliminar comentario"
                          aria-label="Eliminar comentario"
                          disabled={!comment?.id}
                        >
                          <FaTrash size={14} />
                        </button>
                      </HasPermission>
                    )}
                  </div>
                  
                  <div className={styles.commentContent}>
                    {comment?.body	 || "Contenido no disponible"}
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CommentsModal;