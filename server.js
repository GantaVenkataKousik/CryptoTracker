const cron = require('node-cron');
const fetchAndStoreCryptoData = require('./services/fetchCryptoData');

// Schedule the job to run every 2 hours
cron.schedule('0 */2 * * *', fetchAndStoreCryptoData);