const mongoose = require('mongoose');

// Define schema for storing cryptocurrency data
const cryptoDataSchema = new mongoose.Schema({
    coin: String,
    price: Number,
    marketCap: Number,
    change24h: Number,
    timestamp: { type: Date, default: Date.now }
});

// Export the model
module.exports = mongoose.model('CryptoData', cryptoDataSchema); 