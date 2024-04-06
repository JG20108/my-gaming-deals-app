import axios from 'axios';

const BASE_URL = import.meta.env.REACT_APP_API_BASE_URL;

export const fetchDeals = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/deals`);
    return response.data;
  } catch (error) {
    console.error("Error fetching deals:", error);
    throw error;
  }
};