import React from 'react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ currentPage, totalPages, onPageChange }) => {
  let startPage: number, endPage: number;

  if (totalPages <= 5) {
    // Less than 5 total pages so show all
    startPage = 1;
    endPage = totalPages;
  } else {
    // More than 5 total pages so calculate start and end pages
    if (currentPage <= 3) {
      startPage = 1;
      endPage = 5;
    } else if (currentPage + 2 >= totalPages) {
      startPage = totalPages - 4;
      endPage = totalPages;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }
  }

  const pageNumbers = Array.from({ length: (endPage - startPage + 1) }, (_, i) => startPage + i);

  return (
    <div style={{ marginTop: '20px' }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 0}
        style={{ margin: '0 2px' }}
      >
        Previous
      </button>
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number - 1)}
          disabled={currentPage === number - 1}
          style={{ margin: '0 2px' }}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        style={{ margin: '0 2px' }}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;