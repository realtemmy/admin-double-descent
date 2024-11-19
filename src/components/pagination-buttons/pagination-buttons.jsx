import './pagination-button.scss'

const PaginationButton = ({ label, onClick, disabled }) => {
  return (
    <button
      className={`pagination-button ${disabled ? "disabled" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default PaginationButton;
