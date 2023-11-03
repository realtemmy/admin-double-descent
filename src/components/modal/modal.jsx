import "./modal.scss"

const Modal = ({ message, onClose, onCallAction }) => {
  // console.log(action);
  return (
    <div className="modal-container" onClick={onClose}>
      <div className="content">
        <div className="message">Are you sure you want to {message} ?</div>
        <div className="btn-container">
          <button className="cancel" onClick={onClose}>
            cancel
          </button>
          <button className="confirm" onClick={onCallAction}>
            confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
