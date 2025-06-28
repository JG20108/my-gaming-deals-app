import React from 'react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  filteredCount?: number;
  isFiltering?: boolean;
  totalApiDeals?: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  filteredCount = 0,
  isFiltering = false,
  totalApiDeals = 0,
}) => {
  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages && !isFiltering) {
      onPageChange(newPage);
    }
  };

  // Generate page numbers with ellipsis for large page counts
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Complex logic for ellipsis
      const startPages = 2; // Always show first 2 pages
      const endPages = 2; // Always show last 2 pages
      const middlePages = 3; // Show 3 pages around current

      // Always include first pages
      for (let i = 0; i < startPages && i < totalPages; i++) {
        pages.push(i);
      }

      // Calculate middle range
      const middleStart = Math.max(
        startPages,
        currentPage - Math.floor(middlePages / 2)
      );
      const middleEnd = Math.min(
        totalPages - endPages,
        currentPage + Math.floor(middlePages / 2)
      );

      // Add ellipsis before middle if needed
      if (middleStart > startPages) {
        pages.push('...');
      }

      // Add middle pages
      for (let i = middleStart; i <= middleEnd; i++) {
        if (i >= startPages && i < totalPages - endPages) {
          pages.push(i);
        }
      }

      // Add ellipsis after middle if needed
      if (middleEnd < totalPages - endPages - 1) {
        pages.push('...');
      }

      // Always include last pages
      for (let i = totalPages - endPages; i < totalPages; i++) {
        if (i >= 0) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="pagination-controls">
      {/* Page Information */}
      <div className="page-info">
        {isFiltering ? (
          <span>
            Showing {filteredCount} filtered deals (from {totalApiDeals} total)
          </span>
        ) : (
          <span>
            Page {currentPage + 1} of {totalPages} ({totalApiDeals} total deals)
          </span>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="pagination-buttons">
        {/* First Page */}
        <button
          onClick={() => handlePageChange(0)}
          disabled={currentPage === 0 || isFiltering}
          className="pagination-btn first"
          title={
            isFiltering ? 'Pagination disabled while filtering' : 'First page'
          }
        >
          ««
        </button>

        {/* Previous Page */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0 || isFiltering}
          className="pagination-btn prev"
          title={
            isFiltering
              ? 'Pagination disabled while filtering'
              : 'Previous page'
          }
        >
          ‹
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => (
          <span key={index}>
            {typeof page === 'number' ? (
              <button
                onClick={() => handlePageChange(page)}
                disabled={isFiltering}
                className={`pagination-btn page-number ${
                  currentPage === page ? 'active' : ''
                }`}
                title={
                  isFiltering
                    ? 'Pagination disabled while filtering'
                    : `Go to page ${page + 1}`
                }
              >
                {page + 1}
              </button>
            ) : (
              <span className="pagination-ellipsis">{page}</span>
            )}
          </span>
        ))}

        {/* Next Page */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1 || isFiltering}
          className="pagination-btn next"
          title={
            isFiltering ? 'Pagination disabled while filtering' : 'Next page'
          }
        >
          ›
        </button>

        {/* Last Page */}
        <button
          onClick={() => handlePageChange(totalPages - 1)}
          disabled={currentPage >= totalPages - 1 || isFiltering}
          className="pagination-btn last"
          title={
            isFiltering ? 'Pagination disabled while filtering' : 'Last page'
          }
        >
          »»
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;
