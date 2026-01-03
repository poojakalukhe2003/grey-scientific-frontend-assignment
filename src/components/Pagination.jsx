export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous Page"
      >
        Prev
      </button>
      <span className="pagination-page-info">
        {currentPage} / {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next Page"
      >
        Next
      </button>
    </div>
  );
}