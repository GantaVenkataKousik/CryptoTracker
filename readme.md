# CryptoTracker

CryptoTracker is a Node.js application that tracks the current price, market cap, and 24-hour change of three cryptocurrencies: Bitcoin, Matic, and Ethereum. It stores this data in a MongoDB database and provides API endpoints to retrieve the latest data and calculate the standard deviation of prices.

## Features

- Fetches cryptocurrency data from CoinGecko every 2 hours.
- Stores data in a MongoDB database.
- Provides an API to get the latest cryptocurrency data.
- Provides an API to calculate the standard deviation of the last 100 price records.

## Prerequisites

- Node.js
- MongoDB (local or MongoDB Atlas)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/CryptoTracker.git
   cd CryptoTracker
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up MongoDB:

   - If using a local MongoDB instance, ensure it is running.
   - If using MongoDB Atlas, update the connection string in `server.js`.

## Usage

1. Start the server:

   ```bash
   node server.js
   ```

2. Access the API endpoints:

   - **Get Latest Data:**
     - Endpoint: `/stats`
     - Query Params: `coin` (e.g., `bitcoin`, `matic-network`, `ethereum`)
     - Example: `http://localhost:3000/stats?coin=bitcoin`

   - **Get Price Deviation:**
     - Endpoint: `/deviation`
     - Query Params: `coin` (e.g., `bitcoin`, `matic-network`, `ethereum`)
     - Example: `http://localhost:3000/deviation?coin=bitcoin`

## Deployment

- Deploy the application using platforms like Heroku, AWS, or any cloud service.
- Use MongoDB Atlas for a cloud database.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
