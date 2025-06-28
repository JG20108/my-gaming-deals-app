import { SortOption } from '../components/molecules/SortControls';

/**
 * Generates a human-readable description of active filters
 * Follows Single Responsibility Principle by handling only filter description logic
 */
export const generateFilterDescription = (
  metacriticScoreFilter: [number, number],
  salePriceRange: [number, number],
  savingsFilter: [number, number],
  dealRatingFilter: [number, number]
): string => {
  const activeFilters: string[] = [];

  // Check if Metacritic Score filter is not at default range
  if (metacriticScoreFilter[0] !== 0 || metacriticScoreFilter[1] !== 100) {
    activeFilters.push(
      `Metacritic Score: ${metacriticScoreFilter[0]}-${metacriticScoreFilter[1]}`
    );
  }

  // Check if Sale Price filter is not at default range
  if (salePriceRange[0] !== 0 || salePriceRange[1] !== 10) {
    activeFilters.push(
      `Sale Price: $${salePriceRange[0]}-$${salePriceRange[1]}`
    );
  }

  // Check if Savings filter is not at default range
  if (savingsFilter[0] !== 0 || savingsFilter[1] !== 100) {
    activeFilters.push(`Savings: ${savingsFilter[0]}%-${savingsFilter[1]}%`);
  }

  // Check if Deal Rating filter is not at default range
  if (dealRatingFilter[0] !== 0 || dealRatingFilter[1] !== 10) {
    activeFilters.push(
      `Deal Rating: ${dealRatingFilter[0]}-${dealRatingFilter[1]}/10`
    );
  }

  return activeFilters.length > 0 ? activeFilters.join(', ') : 'All deals';
};

/**
 * Generates a human-readable description of the current sort option
 */
export const generateSortDescription = (sortOption: SortOption): string => {
  const fieldLabels: Record<string, string> = {
    dealRating: 'Deal Rating',
    metacriticScore: 'Metacritic Score',
    salePrice: 'Sale Price',
    savings: 'Savings',
  };

  const directionLabels: Record<string, string> = {
    desc: 'High to Low',
    asc: 'Low to High',
  };

  const fieldLabel = fieldLabels[sortOption.field] || 'Deal Rating';
  const directionLabel = directionLabels[sortOption.direction] || 'High to Low';

  return `${fieldLabel} (${directionLabel})`;
};
