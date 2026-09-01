import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages },(_, index) => index + 1);

  return (
    <div className="pagination">
      <button onClick={() =>onPageChange(currentPage - 1)}disabled={currentPage === 1}>
        <FiChevronLeft />
      </button>

      {pages.map((page) => (
        <button key={page}className={currentPage === page? "active-page": ""}onClick={() => onPageChange(page)}>
          {page}
        </button>
      ))}

      <button onClick={() => onPageChange(currentPage + 1)}disabled={currentPage === totalPages}>
        <FiChevronRight />
      </button>
    </div>
  );
}
export default Pagination;