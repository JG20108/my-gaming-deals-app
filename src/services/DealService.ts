// import axios from 'axios';

// const BASE_URL = import.meta.env.REACT_APP_API_BASE_URL;

export const fetchDeals = async () => {
  const response = await fetch('https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
