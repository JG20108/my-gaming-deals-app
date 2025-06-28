import React from 'react';
import SearchBar from '../molecules/SearchBar';
import RangeFilterDual from '../molecules/RangeFilterDual';
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
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
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
  currentPage,
  totalPages,
  onPageChange,
}) => (
  <div className="filters-sidebar">
    <SearchBar onSearch={(query) => console.log(query)} />
    <RangeFilterDual
      label="Metacritic Score"
      min={0}
      max={100}
      step={10}
      value={metacriticScoreFilter}
      onChange={(value: number[]) =>
        setMetacriticScoreFilter([value[0], value[1]])
      }
    />
    <RangeFilterDual
      label="Sale Price"
      min={0}
      max={100}
      step={10}
      value={salePriceRange}
      onChange={(value: number[]) => setSalePriceRange([value[0], value[1]])}
    />
    <RangeFilterDual
      label="Savings"
      min={0}
      max={100}
      step={10}
      value={savingsFilter}
      onChange={(value: number[]) => setSavingsFilter([value[0], value[1]])}
    />
    <RangeFilterDual
      label="Deal Rating"
      min={0}
      max={10}
      step={1}
      value={dealRatingFilter}
      onChange={(value: number[]) => setDealRatingFilter([value[0], value[1]])}
    />
    <PaginationControls
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />
  </div>
);

export default FiltersSidebar;
