import React, { useState, useEffect } from 'react';
import { fetchDeals } from '../../services/DealService';
import DealsGrid from '../organisms/DealsGrid';
import FiltersSidebar from '../organisms/FiltersSidebar';
import DealsHeader from '../organisms/DealsHeader';
import { SortOption } from '../molecules/SortControls';
import { DEFAULT_SORT_OPTION, mapSortToAPI } from '../../utils/sortUtils';

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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<SortOption>(DEFAULT_SORT_OPTION);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // Pass search query, price range, metacritic score, and sort options to fetchDeals for server-side filtering and sorting
    const lowerPrice = salePriceRange[0] > 0 ? salePriceRange[0] : undefined;
    const upperPrice = salePriceRange[1] < 10 ? salePriceRange[1] : undefined;
    const minMetacritic =
      metacriticScoreFilter[0] > 0 ? metacriticScoreFilter[0] : undefined;
    const { sortBy, desc } = mapSortToAPI(sortOption);

    fetchDeals(
      currentPage,
      60,
      upperPrice,
      searchQuery.trim() || undefined,
      lowerPrice,
      minMetacritic,
      sortBy,
      desc
    )
      .then(({ deals, totalPageCount }) => {
        setDeals(deals);
        setTotalPages(totalPageCount ? parseInt(totalPageCount, 10) : 0);
      })
      .catch((error: Error) => {
        console.error('Failed to fetch deals:', error);
      });
  }, [
    currentPage,
    searchQuery,
    salePriceRange,
    metacriticScoreFilter,
    sortOption,
  ]); // Add sortOption as dependency

  // Check if any filters are active (not at default values)
  const areFiltersActive = () => {
    return (
      // Remove metacriticScoreFilter from client-side filter check since it's now server-side
      savingsFilter[0] !== 0 ||
      savingsFilter[1] !== 100 ||
      dealRatingFilter[0] !== 0 ||
      dealRatingFilter[1] !== 10
    );
    // Note: searchQuery, salePriceRange, and metacriticScoreFilter are NOT included here since they're handled server-side
  };

  const filteredDeals = deals
    // Remove client-side Metacritic filtering since we now use server-side filtering
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
  // Removed client-side search, price, Metacritic filters, and sorting since we now use server-side processing

  // Remove client-side sorting since we now use server-side sorting
  const sortedAndFilteredDeals = filteredDeals;

  const handleSortChange = (newSortOption: SortOption) => {
    setSortOption(newSortOption);
  };

  // Handle search query changes
  const handleSearch = (query: string) => {
    console.log('🔍 [Search] Search query:', query);
    setSearchQuery(query);
    // Reset to first page when searching
    setCurrentPage(0);
  };

  // Clear all filters to default values
  const handleClearFilters = () => {
    console.log('🔄 [Filters] Clearing all filters to default values');
    setMetacriticScoreFilter([0, 100]);
    setSalePriceRange([0, 10]);
    setSavingsFilter([0, 100]);
    setDealRatingFilter([0, 10]);
    setSearchQuery(''); // Clear search query too
    // Note: We don't reset sortOption as sorting is separate from filtering
  };

  // Calculate pagination data based on filter state
  const isFiltering = areFiltersActive(); // Only client-side filters count as "filtering"

  const paginationData = {
    currentPage: isFiltering ? 0 : currentPage, // Reset to page 1 when client-side filtering
    totalPages: isFiltering ? 1 : totalPages, // Single page when client-side filtering, normal pagination for search
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
        onSearch={handleSearch}
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
