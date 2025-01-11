import axios from 'axios';

const API_URL = 'https://api.coingecko.com/api/v3';

// Fetch cryptocurrency data from CoinGecko
export const getCryptoStats = async (coin) => {
  try {
    const response = await axios.get(`${API_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        ids: coin,
        x_cg_demo_api_key: process.env.COINGECKO_API_KEY, // API Key in query parameter
      },
    });
    return response.data[0];  // Return the first coin's data (since we're using one coin at a time)
  } catch (error) {
    console.error('Error fetching cryptocurrency stats:', error.message);
    throw error;
  }
};

// Fetch standard deviation data from the database
export const getPriceDeviation = async (coin) => {
  try {
    const response = await axios.get(`${API_URL}/coins/${coin}`, {
      headers: {
        'x-cg-demo-api-key': process.env.COINGECKO_API_KEY, // API Key in header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching price deviation:', error.message);
    throw error;
  }
};
