import { getCryptoStats, getPriceDeviation } from '../services/cryptoService.js';

// Controller for /stats endpoint
export const getStats = async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: 'Coin parameter is required.' });
  }

  try {
    const stats = await getCryptoStats(coin);
    res.json({
      price: stats.current_price,
      marketCap: stats.market_cap,
      '24hChange': stats.price_change_percentage_24h,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cryptocurrency stats.' });
  }
};

// Controller for /deviation endpoint
export const getDeviation = async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: 'Coin parameter is required.' });
  }

  try {
    const deviationData = await getPriceDeviation(coin);
    const prices = deviationData.market_data?.prices || [];

    // Calculating standard deviation for the last 100 prices
    if (prices.length > 1) {
      const pricesArray = prices.slice(-100).map(price => price[1]);  // Get the price values only
      const mean = pricesArray.reduce((acc, val) => acc + val, 0) / pricesArray.length;
      const deviation = Math.sqrt(pricesArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / pricesArray.length);

      return res.json({ deviation });
    } else {
      return res.status(400).json({ error: 'Not enough data to calculate deviation.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch price deviation.' });
  }
};
