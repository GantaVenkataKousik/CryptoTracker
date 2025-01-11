const axios = require('axios');
const CryptoData = require('../models/CryptoData');

const COINS = ['bitcoin', 'matic-network', 'ethereum'];

async function fetchAndStoreCryptoData() {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: {
                ids: COINS.join(','),
                vs_currencies: 'usd',
                include_market_cap: true,
                include_24hr_change: true
            }
        });

        const data = response.data;

        for (const coin of COINS) {
            const coinData = data[coin];
            if (coinData) {
                const newCryptoData = new CryptoData({
                    coin,
                    price: coinData.usd,
                    marketCap: coinData.usd_market_cap,
                    change24h: coinData.usd_24h_change,
                    timestamp: new Date()
                });

                await newCryptoData.save();
            }
        }

        console.log('Crypto data fetched and stored successfully.');
    } catch (error) {
        console.error('Error fetching crypto data:', error);
    }
}

module.exports = fetchAndStoreCryptoData;