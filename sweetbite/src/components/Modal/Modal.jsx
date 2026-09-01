import { FiX, FiTrash2 } from "react-icons/fi";

function Modal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box glass-card">
        <button className="modal-close" onClick={onCancel}>
          <FiX />
        </button>

        <div className="modal-icon">
          <FiTrash2 />
        </div>

        <h2>{title}</h2>

        <p>{message}</p>

        <div className="modal-actions">
          <button className="modal-cancel" onClick={onCancel}>Cancel</button>

          <button className="modal-delete" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;