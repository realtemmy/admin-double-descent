import PaginationButton from "../pagination-buttons/pagination-buttons";
import './pagination.scss'

const Pagination = ({ currentPage, totalDocs, onPageChange }) => {
  // console.log(currentPage);
  const totalPages = Math.ceil(totalDocs / 20);
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(++currentPage);
    }
  };

  const handleNumberClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const renderPageNumbers = () => {
    const pages = [];
    let start = currentPage - 2;
    if (currentPage < 3) {
      start = 1;
    }
    for (let i = start; i <= Math.min(start + 4, totalPages); i++) {
      pages.push(
        <PaginationButton
          key={i}
          label={i}
          onClick={() => handleNumberClick(i)}
          disabled={i === currentPage}
        />
      );
    }
    return pages;
  };

  return (
    <div className="pagination-container">
      {/* Previous Button */}
      <PaginationButton
        label="Previous"
        onClick={handlePrevClick}
        disabled={currentPage === 1}
      />

      {/* Numbered Pages */}
      {renderPageNumbers()}

      {/* Next Button */}
      <PaginationButton
        label="Next"
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      />
    </div>
  );
};

export default Pagination;
