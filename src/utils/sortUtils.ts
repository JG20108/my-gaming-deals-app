import { SortField, SortOption } from '../components/molecules/SortControls';

/**
 * Default sort option - Deal Rating descending (highest first)
 */
export const DEFAULT_SORT_OPTION: SortOption = {
  field: 'dealRating',
  direction: 'desc',
};

/**
 * Maps our internal sort options to CheapShark API sort parameters
 * Only supports server-side sorting for fields available in the API
 *
 * @param sortOption - Our internal sort configuration
 * @returns Object with sortBy and desc parameters for the API
 */
export const mapSortToAPI = (
  sortOption: SortOption
): { sortBy?: string; desc?: boolean } => {
  const { field, direction } = sortOption;

  // Map our field names to CheapShark API sort values
  // Based on API docs: DealRating, Title, Savings, Price, Metacritic, Reviews, Release, Store, Recent
  const apiSortMap: { [key in SortField]: string } = {
    dealRating: 'DealRating',
    salePrice: 'Price',
    savings: 'Savings',
  };

  const sortBy = apiSortMap[field];

  // Fix: CheapShark API interprets desc parameter inversely from expected
  // When user wants "High to Low" (desc), API needs desc=false
  // When user wants "Low to High" (asc), API needs desc=true
  const desc = direction === 'asc';

  return { sortBy, desc };
};
