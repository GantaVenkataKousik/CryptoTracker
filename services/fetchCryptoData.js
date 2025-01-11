const axios = require('axios');
const CryptoData = require('../models/CryptoData');

// List of cryptocurrencies to track
const COINS = ['bitcoin', 'matic-network', 'ethereum'];

// Function to fetch and store cryptocurrency data
async function fetchAndStoreCryptoData() {
    try {
        for (const coin of COINS) {
            const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
                params: {
                    ids: coin,
                    vs_currencies: 'usd',
                    include_market_cap: 'true',
                    include_24hr_change: 'true'
                }
            });

            const data = response.data[coin];
            const cryptoData = new CryptoData({
                coin,
                price: data.usd,
                marketCap: data.usd_market_cap,
                change24h: data.usd_24h_change
            });

            await cryptoData.save();
        }
    } catch (error) {
        console.error('Error fetching data from CoinGecko:', error);
    }
}

module.exports = fetchAndStoreCryptoData;