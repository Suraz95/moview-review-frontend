import { useState, useEffect } from "react";

const Pagination = ({ totalPages }) => {
  const [currentPage, setCurrentPage] = useState(() => {
    // Get the current page from localStorage or default to 0
    return parseInt(localStorage.getItem("currentPage")) || 0;
  });

  useEffect(() => {
    // Save the current page to localStorage whenever it changes
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="w-full flex items-center justify-end -ml-5">
      <div className="join">
        <button
          onClick={previousPage}
          className="join-item btn btn-xs btn-primary btn-outline"
          disabled={currentPage <= 0} // Disable Prev if already at first page
        >
          Prev
        </button>
        <button className="join-item btn btn-xs btn-ghost">
          Page {currentPage + 1}
        </button>
        <button
          onClick={nextPage}
          className="join-item btn btn-xs btn-primary btn-outline"
          disabled={currentPage >= totalPages - 1} // Disable Next if at last page
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
