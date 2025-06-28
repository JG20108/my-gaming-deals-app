import React, { useState, useEffect } from 'react';
import { fetchDeals } from '../../services/DealService';
import DealsGrid from '../organisms/DealsGrid';
import FiltersSidebar from '../organisms/FiltersSidebar';
import DealsHeader from '../organisms/DealsHeader';
import { SortOption } from '../molecules/SortControls';
import { sortDeals, DEFAULT_SORT_OPTION } from '../../utils/sortUtils';

interface Deal {
  dealID: string;
  title: string;
  salePrice: string;
  normalPrice: string;
  savings: string;
  thumb: string;
  metacriticScore: string;
  metacriticLink: string;
  steamRatingText: string;
  steamAppID: string;
  dealRating: string;
}

const DealsPage: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [metacriticScoreFilter, setMetacriticScoreFilter] = useState<
    [number, number]
  >([0, 100]);
  const [salePriceRange, setSalePriceRange] = useState<[number, number]>([
    0, 10,
  ]);
  const [savingsFilter, setSavingsFilter] = useState<[number, number]>([
    0, 100,
  ]);
  const [dealRatingFilter, setDealRatingFilter] = useState<[number, number]>([
    0, 10,
  ]);
  const [sortOption, setSortOption] = useState<SortOption>(DEFAULT_SORT_OPTION);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchDeals(currentPage)
      .then(({ deals, totalPageCount }) => {
        setDeals(deals);
        setTotalPages(totalPageCount ? parseInt(totalPageCount, 10) : 0);
      })
      .catch((error: Error) => {
        console.error('Failed to fetch deals:', error);
      });
  }, [currentPage]);

  // Check if any filters are active (not at default values)
  const areFiltersActive = () => {
    return (
      metacriticScoreFilter[0] !== 0 ||
      metacriticScoreFilter[1] !== 100 ||
      salePriceRange[0] !== 0 ||
      salePriceRange[1] !== 10 ||
      savingsFilter[0] !== 0 ||
      savingsFilter[1] !== 100 ||
      dealRatingFilter[0] !== 0 ||
      dealRatingFilter[1] !== 10
    );
  };

  const filteredDeals = deals
    .filter(
      (deal) =>
        Number(deal.metacriticScore) >= metacriticScoreFilter[0] &&
        Number(deal.metacriticScore) <= metacriticScoreFilter[1]
    )
    .filter(
      (deal) =>
        Number(deal.salePrice) >= salePriceRange[0] &&
        Number(deal.salePrice) <= salePriceRange[1]
    )
    .filter(
      (deal) =>
        Number(deal.savings) >= savingsFilter[0] &&
        Number(deal.savings) <= savingsFilter[1]
    )
    .filter(
      (deal) =>
        Number(deal.dealRating) >= dealRatingFilter[0] &&
        Number(deal.dealRating) <= dealRatingFilter[1]
    );

  const sortedAndFilteredDeals = sortDeals(filteredDeals, sortOption);

  const handleSortChange = (newSortOption: SortOption) => {
    setSortOption(newSortOption);
  };

  // Clear all filters to default values
  const handleClearFilters = () => {
    console.log('🔄 [Filters] Clearing all filters to default values');
    setMetacriticScoreFilter([0, 100]);
    setSalePriceRange([0, 10]);
    setSavingsFilter([0, 100]);
    setDealRatingFilter([0, 10]);
    // Note: We don't reset sortOption as sorting is separate from filtering
  };

  // Calculate pagination data based on filter state
  const isFiltering = areFiltersActive();
  const paginationData = {
    currentPage: isFiltering ? 0 : currentPage, // Reset to page 1 when filtering
    totalPages: isFiltering ? 1 : totalPages, // Single page when filtering
    filteredCount: filteredDeals.length,
    isFiltering: isFiltering,
    totalApiDeals: totalPages * 60, // Assuming 60 deals per page from API
  };

  return (
    <div>
      <DealsHeader
        metacriticScoreFilter={metacriticScoreFilter}
        salePriceRange={salePriceRange}
        savingsFilter={savingsFilter}
        dealRatingFilter={dealRatingFilter}
        sortOption={sortOption}
      />

      <DealsGrid deals={sortedAndFilteredDeals} />

      <FiltersSidebar
        metacriticScoreFilter={metacriticScoreFilter}
        setMetacriticScoreFilter={setMetacriticScoreFilter}
        salePriceRange={salePriceRange}
        setSalePriceRange={setSalePriceRange}
        savingsFilter={savingsFilter}
        setSavingsFilter={setSavingsFilter}
        dealRatingFilter={dealRatingFilter}
        setDealRatingFilter={setDealRatingFilter}
        sortOption={sortOption}
        onSortChange={handleSortChange}
        currentPage={paginationData.currentPage}
        totalPages={paginationData.totalPages}
        onPageChange={setCurrentPage}
        filteredCount={paginationData.filteredCount}
        isFiltering={paginationData.isFiltering}
        totalApiDeals={paginationData.totalApiDeals}
        onClearFilters={handleClearFilters}
      />
    </div>
  );
};

export default DealsPage;
