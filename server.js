const express = require('express');
const mongoose = require('mongoose');
const CryptoData = require('./models/CryptoData');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/crypto', { useNewUrlParser: true, useUnifiedTopology: true });

// API to get latest data
app.get('/stats', async (req, res) => {
    const { coin } = req.query;
    const latestData = await CryptoData.findOne({ coin }).sort({ timestamp: -1 });
    if (latestData) {
        res.json({
            price: latestData.price,
            marketCap: latestData.marketCap,
            '24hChange': latestData.change24h
        });
    } else {
        res.status(404).send('Data not found');
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


const cron = require('node-cron');
const fetchAndStoreCryptoData = require('./services/fetchCryptoData');

// Schedule the job to run every 2 hours
cron.schedule('0 */2 * * *', fetchAndStoreCryptoData);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});