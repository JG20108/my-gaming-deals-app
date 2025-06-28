/**
 * Service for fetching gaming deals from CheapShark API
 * Implements caching with TTL to optimize performance and reduce API calls
 * Follows Single Responsibility Principle - handles only data fetching logic
 */

// Simple in-memory cache with TTL
const cache = new Map<string, { data: any; expiry: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Generic cache check function
 * @param key - Cache key to check
 * @returns Cached data if valid, null if expired or not found
 */
const getCachedData = (key: string) => {
  const cached = cache.get(key);
  if (cached && cached.expiry > Date.now()) {
    return cached.data;
  }
  if (cached) {
    cache.delete(key); // Clean up expired cache
  }
  return null;
};

/**
 * Cache data with TTL
 * @param key - Cache key
 * @param data - Data to cache
 */
const setCachedData = (key: string, data: any) => {
  cache.set(key, {
    data,
    expiry: Date.now() + CACHE_TTL,
  });
};

interface FetchDealsParams {
  pageNumber?: number;
  pageSize?: number;
  upperPrice?: number;
  lowerPrice?: number;
  metacritic?: number;
  sortBy?: string;
  desc?: boolean;
  title?: string;
}

/**
 * Fetches deals from CheapShark API with caching and server-side filtering/sorting
 * @param params - API parameters for filtering, sorting, and pagination
 * @returns Promise containing deals array and total page count
 */
export const fetchDeals = async (params: FetchDealsParams = {}) => {
  const {
    pageNumber = 0,
    pageSize = 60,
    upperPrice,
    lowerPrice,
    metacritic,
    sortBy,
    desc,
    title,
  } = params;

  // Create cache key based on all parameters
  const cacheKey = `deals-${pageNumber}-${pageSize}-${upperPrice}-${lowerPrice}-${metacritic}-${sortBy}-${desc}-${
    title || 'none'
  }`;

  // Check cache first
  const cachedData = getCachedData(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    // Build API URL with parameters
    const baseUrl = 'https://www.cheapshark.com/api/1.0/deals';
    const urlParams = new URLSearchParams({
      storeID: '1', // Steam only for now
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      onSale: 'true', // Only show deals with actual discounts
    });

    // Add optional parameters only if they have valid values
    if (upperPrice !== undefined && upperPrice > 0) {
      urlParams.append('upperPrice', upperPrice.toString());
    }
    if (lowerPrice !== undefined && lowerPrice > 0) {
      urlParams.append('lowerPrice', lowerPrice.toString());
    }
    if (metacritic !== undefined && metacritic > 0) {
      urlParams.append('metacritic', metacritic.toString());
    }
    if (sortBy) {
      urlParams.append('sortBy', sortBy);
    }
    if (desc !== undefined) {
      urlParams.append('desc', desc ? '1' : '0');
    }
    if (title && title !== 'none') {
      urlParams.append('title', title);
    }

    const url = `${baseUrl}?${urlParams.toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Get total page count from response headers
    const totalPageCount = response.headers.get('X-Total-Page-Count');

    const rawDeals = await response.json();

    // Transform the API response to match our interface
    const deals = rawDeals.map((deal: any) => ({
      dealID: deal.dealID,
      title: deal.title,
      salePrice: deal.salePrice,
      normalPrice: deal.normalPrice,
      savings: deal.savings,
      thumb: deal.thumb,
      metacriticScore: deal.metacriticScore,
      metacriticLink: deal.metacriticLink,
      steamRatingText: deal.steamRatingText,
      steamAppID: deal.steamAppID,
      dealRating: deal.dealRating,
    }));

    const result = {
      deals,
      totalPageCount: totalPageCount ? parseInt(totalPageCount, 10) : 1,
    };

    // Cache the result
    setCachedData(cacheKey, result);

    return result;
  } catch (error) {
    console.error('Error fetching deals:', error);
    throw error;
  }
};
