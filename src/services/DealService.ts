// import axios from 'axios';
import { Deal } from '../types';
// const BASE_URL = import.meta.env.REACT_APP_API_BASE_URL;

interface DealsResponse {
  deals: Deal[];
  totalPageCount: string | null;
}

const cache: { [key: string]: { data: DealsResponse; expiry: number } } = {};

export const fetchDeals = async (
  pageNumber: number = 0,
  pageSize: number = 60,
  upperPrice?: number,
  title?: string
): Promise<DealsResponse> => {
  const cacheKey = `deals-${pageNumber}-${pageSize}-${upperPrice}-${
    title || ''
  }`;
  const now = new Date().getTime();

  // Log cache check
  console.log(`🔍 [DealService] Checking cache for key: ${cacheKey}`);

  if (cache[cacheKey] && cache[cacheKey].expiry > now) {
    console.log(
      `✅ [DealService] Cache HIT - returning cached data for ${cacheKey}`
    );
    console.log(
      `📊 [DealService] Cached data contains ${cache[cacheKey].data.deals.length} deals`
    );
    return cache[cacheKey].data;
  }

  console.log(
    `❌ [DealService] Cache MISS - fetching fresh data for ${cacheKey}`
  );

  let url = `https://www.cheapshark.com/api/1.0/deals?storeID=1&pageNumber=${pageNumber}&pageSize=${pageSize}`;
  if (upperPrice !== undefined) {
    url += `&upperPrice=${upperPrice}`;
  }
  if (title && title.trim() !== '') {
    // URL encode the title parameter for safe transmission
    url += `&title=${encodeURIComponent(title.trim())}`;
  }

  // Log request details
  console.log(`🌐 [DealService] Making API request to: ${url}`);
  console.log(`📋 [DealService] Request parameters:`, {
    pageNumber,
    pageSize,
    upperPrice,
    title: title || 'none',
    storeID: 1,
  });

  try {
    const response = await fetch(url);

    // Log response details
    console.log(`📡 [DealService] Response received:`, {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      url: response.url,
    });

    // Log all response headers
    console.log(`📋 [DealService] Response headers:`);
    response.headers.forEach((value, key) => {
      console.log(`  ${key}: ${value}`);
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ [DealService] API Error Response:`, {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(
        `Network response was not ok: ${response.status} ${response.statusText}`
      );
    }

    const totalPageCount = response.headers.get('X-Total-Page-Count');
    console.log(
      `📄 [DealService] Total page count from header: ${totalPageCount}`
    );

    const rawDeals = await response.json();
    console.log(`📦 [DealService] Raw API response received:`, {
      type: Array.isArray(rawDeals) ? 'array' : typeof rawDeals,
      length: Array.isArray(rawDeals) ? rawDeals.length : 'N/A',
      firstDeal:
        Array.isArray(rawDeals) && rawDeals.length > 0 ? rawDeals[0] : null,
      searchTerm: title || 'none',
    });

    // Log sample of deals data structure
    if (Array.isArray(rawDeals) && rawDeals.length > 0) {
      console.log(`🎮 [DealService] Sample deal structure:`, rawDeals[0]);
      console.log(`📊 [DealService] All deal keys:`, Object.keys(rawDeals[0]));
    }

    const data = { deals: rawDeals, totalPageCount };

    // Cache the data for 5 minutes (300000 milliseconds)
    cache[cacheKey] = { data, expiry: now + 300000 };
    console.log(
      `💾 [DealService] Data cached with expiry: ${new Date(
        now + 300000
      ).toLocaleString()}`
    );
    console.log(
      `✅ [DealService] Successfully fetched ${rawDeals.length} deals`
    );

    return data;
  } catch (error) {
    console.error(`💥 [DealService] Error fetching deals:`, {
      error: error instanceof Error ? error.message : 'Unknown error',
      url,
      cacheKey,
      timestamp: new Date().toISOString(),
    });
    throw error;
  }
};
