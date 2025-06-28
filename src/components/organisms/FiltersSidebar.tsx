import React from 'react';
import SearchBar from '../molecules/SearchBar';
import RangeFilterDual from '../molecules/RangeFilterDual';
import SortControls, { SortOption } from '../molecules/SortControls';
import PaginationControls from '../molecules/PaginationControls';

interface FiltersSidebarProps {
  metacriticScoreFilter: [number, number];
  setMetacriticScoreFilter: React.Dispatch<
    React.SetStateAction<[number, number]>
  >;
  salePriceRange: [number, number];
  setSalePriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  savingsFilter: [number, number];
  setSavingsFilter: React.Dispatch<React.SetStateAction<[number, number]>>;
  dealRatingFilter: [number, number];
  setDealRatingFilter: React.Dispatch<React.SetStateAction<[number, number]>>;
  sortOption: SortOption;
  onSortChange: (sortOption: SortOption) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  filteredCount: number;
  isFiltering: boolean;
  totalApiDeals: number;
  onClearFilters: () => void;
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  metacriticScoreFilter,
  setMetacriticScoreFilter,
  salePriceRange,
  setSalePriceRange,
  savingsFilter,
  setSavingsFilter,
  dealRatingFilter,
  setDealRatingFilter,
  sortOption,
  onSortChange,
  currentPage,
  totalPages,
  onPageChange,
  filteredCount,
  isFiltering,
  totalApiDeals,
  onClearFilters,
}) => {
  // Clear All Filters button styling
  const clearButtonStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    marginBottom: '20px',
    backgroundColor: isFiltering ? '#646cff' : 'rgba(100, 108, 255, 0.3)',
    color: isFiltering ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
    border: '2px solid',
    borderColor: isFiltering ? '#646cff' : 'rgba(100, 108, 255, 0.5)',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    fontFamily: 'Orbitron, system-ui, Avenir, Helvetica, Arial, sans-serif',
    cursor: isFiltering ? 'pointer' : 'not-allowed',
    transition: 'all 0.25s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    boxShadow: isFiltering ? '0 2px 4px rgba(100, 108, 255, 0.3)' : 'none',
  };

  const clearButtonHoverStyle: React.CSSProperties = {
    backgroundColor: '#535bf2',
    borderColor: '#535bf2',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 8px rgba(100, 108, 255, 0.4)',
  };

  return (
    <div className="filters-sidebar">
      <SearchBar onSearch={(query) => console.log(query)} />

      <SortControls sortOption={sortOption} onSortChange={onSortChange} />

      {/* Clear All Filters Button */}
      <button
        onClick={onClearFilters}
        disabled={!isFiltering}
        style={clearButtonStyle}
        title={
          isFiltering
            ? 'Reset all filters to default values'
            : 'No active filters to clear'
        }
        onMouseEnter={(e) => {
          if (isFiltering) {
            Object.assign(e.currentTarget.style, {
              ...clearButtonStyle,
              ...clearButtonHoverStyle,
            });
          }
        }}
        onMouseLeave={(e) => {
          Object.assign(e.currentTarget.style, clearButtonStyle);
        }}
      >
        🔄 Clear All Filters
      </button>

      <RangeFilterDual
        label="Metacritic Score"
        min={0}
        max={100}
        step={1}
        value={metacriticScoreFilter}
        onChange={(value: number[]) =>
          setMetacriticScoreFilter([value[0], value[1]])
        }
      />
      <RangeFilterDual
        label="Sale Price"
        min={0}
        max={100}
        step={1}
        value={salePriceRange}
        onChange={(value: number[]) => setSalePriceRange([value[0], value[1]])}
      />
      <RangeFilterDual
        label="Savings"
        min={0}
        max={100}
        step={1}
        value={savingsFilter}
        onChange={(value: number[]) => setSavingsFilter([value[0], value[1]])}
      />
      <RangeFilterDual
        label="Deal Rating"
        min={0}
        max={10}
        step={1}
        value={dealRatingFilter}
        onChange={(value: number[]) =>
          setDealRatingFilter([value[0], value[1]])
        }
      />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        filteredCount={filteredCount}
        isFiltering={isFiltering}
        totalApiDeals={totalApiDeals}
      />
    </div>
  );
};

export default FiltersSidebar;
