const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const dotenv = require('dotenv');
const CryptoData = require('./models/CryptoData');

const app = express();
const PORT = process.env.PORT || 9001;

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// API to get latest data
app.get('/stats', async (req, res) => {
    const { coin } = req.query;

    if (!coin) {
        return res.status(400).json({ error: 'Coin query parameter is required' });
    }

    try {
        const latestData = await CryptoData.findOne({ coin }).sort({ timestamp: -1 });

        if (!latestData) {
            return res.status(404).json({ error: 'No data found for the specified coin' });
        }

        res.json({
            coin: latestData.coin,
            price: latestData.price,
            marketCap: latestData.marketCap,
            change24h: latestData.change24h,
            timestamp: latestData.timestamp
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API to get standard deviation
app.get('/deviation', async (req, res) => {
    const { coin } = req.query;
    const data = await CryptoData.find({ coin }).sort({ timestamp: -1 }).limit(100);
    if (data.length > 0) {
        const prices = data.map(d => d.price);
        const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
        const variance = prices.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / prices.length;
        const deviation = Math.sqrt(variance);
        res.json({ deviation });
    } else {
        res.status(404).send('Not enough data');
    }
});

// Root route to display welcome message
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Crypto Tracker</title>
            <style>
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    font-family: Arial, sans-serif;
                }
                h1 {
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <h1>Welcome to Crypto Tracker</h1>
        </body>
        </html>
    `);
});

const fetchAndStoreCryptoData = require('./services/fetchCryptoData');

// Schedule the job to run every 2 hours
cron.schedule('0 */2 * * *', fetchAndStoreCryptoData);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});