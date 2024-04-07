// import axios from 'axios';
import { Deal } from '../types';
// const BASE_URL = import.meta.env.REACT_APP_API_BASE_URL;

interface DealsResponse {
  deals: Deal[];
  totalPageCount: string | null;
}

const cache: { [key: string]: { data: DealsResponse; expiry: number } } = {};

export const fetchDeals = async (pageNumber: number = 0, pageSize: number = 60, upperPrice?: number): Promise<DealsResponse> => {
  const cacheKey = `deals-${pageNumber}-${pageSize}-${upperPrice}`;
  const now = new Date().getTime();
  if (cache[cacheKey] && cache[cacheKey].expiry > now) {
    return cache[cacheKey].data;
  }

  let url = `https://www.cheapshark.com/api/1.0/deals?storeID=1&pageNumber=${pageNumber}&pageSize=${pageSize}`;
  if (upperPrice !== undefined) {
    url += `&upperPrice=${upperPrice}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const totalPageCount = response.headers.get('X-Total-Page-Count');
  const data = { deals: await response.json(), totalPageCount };

  // Cache the data for 5 minutes (300000 milliseconds)
  cache[cacheKey] = { data, expiry: now + 300000 };
  return data;
};

