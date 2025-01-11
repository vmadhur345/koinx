import cron from 'node-cron';
import { getCryptoStats } from './cryptoService.js';
import Crypto from '../models/crypto.js';

// Cron job runs every 2 hours
cron.schedule('0 */2 * * *', async () => {
  console.log('Cron job started at', new Date());

  const coins = ['bitcoin', 'matic-network', 'ethereum'];  // List of coins to fetch data for

  for (const coin of coins) {
    try {
      console.log(`Fetching data for ${coin}...`);
      const stats = await getCryptoStats(coin);
      console.log(`Fetched stats for ${coin}:`, stats);

      const newCryptoData = new Crypto({
        coin: coin,
        price: stats.current_price,
        marketCap: stats.market_cap,
        change24h: stats.price_change_percentage_24h,
      });

      await newCryptoData.save(); // Save data to the MongoDB database
      console.log(`Data saved for ${coin}:`, newCryptoData);
    } catch (error) {
      console.error(`Error fetching or saving data for ${coin}:`, error.message);
    }
  }
});

console.log('Cron job scheduled to run every 2 hours.');
