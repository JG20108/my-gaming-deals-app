import React from 'react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  filteredCount: number;
  isFiltering: boolean;
  totalApiDeals: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  filteredCount,
  isFiltering,
  totalApiDeals,
}) => {
  const handlePageChange = (newPage: number, source: string) => {
    console.log(
      `🔢 [Pagination] ${source} clicked - changing from page ${currentPage} to page ${newPage}`
    );
    onPageChange(newPage);
  };

  // Enhanced pagination logic with better page visibility
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const currentPageDisplay = currentPage + 1; // Convert to 1-based for display

    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPageDisplay > 4) {
        // Add ellipsis if current page is far from start
        pages.push('...');
      }

      // Calculate range around current page
      let startRange = Math.max(2, currentPageDisplay - 1);
      let endRange = Math.min(totalPages - 1, currentPageDisplay + 1);

      // Adjust range if we're near the beginning
      if (currentPageDisplay <= 4) {
        startRange = 2;
        endRange = Math.min(6, totalPages - 1);
      }

      // Adjust range if we're near the end
      if (currentPageDisplay >= totalPages - 3) {
        startRange = Math.max(2, totalPages - 5);
        endRange = totalPages - 1;
      }

      // Add the range pages
      for (let i = startRange; i <= endRange; i++) {
        pages.push(i);
      }

      if (currentPageDisplay < totalPages - 3) {
        // Add ellipsis if current page is far from end
        pages.push('...');
      }

      // Always show last page (if more than 1 page total)
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  console.log(
    '🔢 [Pagination] Rendering - currentPage:',
    currentPage,
    'totalPages:',
    totalPages
  );

  const buttonStyle: React.CSSProperties = {
    margin: '0 2px',
    padding: '8px 12px',
    fontSize: '14px',
    fontFamily: 'Orbitron, system-ui, Avenir, Helvetica, Arial, sans-serif',
  };

  const activeButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#646cff',
    color: 'white',
    fontWeight: 'bold',
  };

  const ellipsisStyle: React.CSSProperties = {
    margin: '0 2px',
    padding: '8px 4px',
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: 'Orbitron, system-ui, Avenir, Helvetica, Arial, sans-serif',
  };

  const pageInfoStyle: React.CSSProperties = {
    margin: '10px 0',
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontFamily: 'Orbitron, system-ui, Avenir, Helvetica, Arial, sans-serif',
  };

  return (
    <div style={{ marginTop: '20px' }}>
      {/* Page Information */}
      <div style={pageInfoStyle}>
        {isFiltering
          ? `Showing ${filteredCount} filtered deals (from ${totalApiDeals} total)`
          : `Page ${
              currentPage + 1
            } of ${totalPages} (${totalApiDeals} total deals)`}
      </div>

      {/* Navigation Controls */}
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        {/* First Page Button */}
        <button
          onClick={() => handlePageChange(0, 'First page button')}
          disabled={currentPage <= 0 || isFiltering}
          style={buttonStyle}
          title={
            isFiltering
              ? 'Pagination disabled while filtering'
              : 'Go to first page'
          }
        >
          ««
        </button>

        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1, 'Previous button')}
          disabled={currentPage <= 0 || isFiltering}
          style={buttonStyle}
          title={
            isFiltering
              ? 'Pagination disabled while filtering'
              : 'Go to previous page'
          }
        >
          ‹ Prev
        </button>

        {/* Page Numbers */}
        {!isFiltering &&
          pageNumbers.map((pageNum, index) => {
            if (pageNum === '...') {
              return (
                <span key={`ellipsis-${index}`} style={ellipsisStyle}>
                  ...
                </span>
              );
            }

            const pageIndex = (pageNum as number) - 1; // Convert back to 0-based
            const isActive = currentPage === pageIndex;

            return (
              <button
                key={pageNum}
                onClick={() =>
                  handlePageChange(pageIndex, `Page ${pageNum} button`)
                }
                disabled={isActive}
                style={isActive ? activeButtonStyle : buttonStyle}
                title={`Go to page ${pageNum}`}
              >
                {pageNum}
              </button>
            );
          })}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1, 'Next button')}
          disabled={currentPage >= totalPages - 1 || isFiltering}
          style={buttonStyle}
          title={
            isFiltering
              ? 'Pagination disabled while filtering'
              : 'Go to next page'
          }
        >
          Next ›
        </button>

        {/* Last Page Button */}
        <button
          onClick={() => handlePageChange(totalPages - 1, 'Last page button')}
          disabled={currentPage >= totalPages - 1 || isFiltering}
          style={buttonStyle}
          title={
            isFiltering
              ? 'Pagination disabled while filtering'
              : 'Go to last page'
          }
        >
          »»
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;
