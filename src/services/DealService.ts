// import axios from 'axios';

// const BASE_URL = import.meta.env.REACT_APP_API_BASE_URL;

export const fetchDeals = async (pageNumber: number = 0, pageSize: number = 60, upperPrice?: number) => {
  let url = `https://www.cheapshark.com/api/1.0/deals?storeID=1&pageNumber=${pageNumber}&pageSize=${pageSize}`;
  if (upperPrice !== undefined) {
    url += `&upperPrice=${upperPrice}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const totalPageCount = response.headers.get('X-Total-Page-Count');
  return { deals: await response.json(), totalPageCount };
};
