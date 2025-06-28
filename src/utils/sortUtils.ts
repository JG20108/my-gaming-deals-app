import { Deal } from '../types';
import {
  SortField,
  SortDirection,
  SortOption,
} from '../components/molecules/SortControls';

/**
 * Sorts an array of deals based on the provided sort option
 * Follows the Single Responsibility Principle by handling only sorting logic
 *
 * @param deals - Array of deals to sort
 * @param sortOption - Sort configuration (field and direction)
 * @returns Sorted array of deals
 */
export const sortDeals = (deals: Deal[], sortOption: SortOption): Deal[] => {
  const { field, direction } = sortOption;

  return [...deals].sort((a, b) => {
    let aValue: number;
    let bValue: number;

    // Extract numeric values based on the sort field
    switch (field) {
      case 'dealRating':
        aValue = Number(a.dealRating) || 0;
        bValue = Number(b.dealRating) || 0;
        break;
      case 'metacriticScore':
        aValue = Number(a.metacriticScore) || 0;
        bValue = Number(b.metacriticScore) || 0;
        break;
      case 'salePrice':
        aValue = Number(a.salePrice) || 0;
        bValue = Number(b.salePrice) || 0;
        break;
      case 'savings':
        aValue = Number(a.savings) || 0;
        bValue = Number(b.savings) || 0;
        break;
      default:
        // Fallback to dealRating if unknown field
        aValue = Number(a.dealRating) || 0;
        bValue = Number(b.dealRating) || 0;
        break;
    }

    // Apply sort direction
    const comparison = aValue - bValue;
    return direction === 'asc' ? comparison : -comparison;
  });
};

/**
 * Default sort option - Deal Rating descending (highest first)
 */
export const DEFAULT_SORT_OPTION: SortOption = {
  field: 'dealRating',
  direction: 'desc',
};
