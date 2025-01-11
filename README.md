
# Cryptocurrency Dashboard

This project is a Node.js-based backend service that fetches real-time cryptocurrency data (price, market cap, 24-hour change) for cryptocurrencies such as Bitcoin, Ethereum, and Matic, and stores this data in MongoDB. The application exposes two key API endpoints:
1. `/stats`: Fetches the latest stats for a given cryptocurrency.
2. `/deviation`: Calculates the standard deviation of the price for a given cryptocurrency using the last 100 records.

The system runs a cron job every 2 hours to fetch updated data and save it to the database.

## Features

- **Cryptocurrency Stats:** Fetch real-time stats such as price, market cap, and 24-hour change.
- **Price Deviation:** Calculate the standard deviation for a given cryptocurrency's price using the last 100 stored records.
- **MongoDB Integration:** Stores and retrieves cryptocurrency data with MongoDB.
- **Cron Job:** Scheduled background task that fetches data every 2 hours.

---

## Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v14 or above)
- **npm** (v6 or above)
- **Git**

---

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the root directory and add the following:

   ```env
   PORT=8000
   MONGO_URI=your_mongodb_connection_string
   COINGECKO_API_KEY=your_coingecko_api_key
   ```

4. **Start the Server**

   Start the application by running the following command:

   ```bash
   npm start
   ```

   The backend will be available at `http://localhost:8000`.

---

## API Endpoints

### 1. **`/stats`** (Fetch cryptocurrency stats)
- **Method**: `GET`
- **Query Parameters**:
  - `coin` (required) - Coin name (e.g., `bitcoin`, `ethereum`, `matic-network`).
- **Response**:
  ```json
  {
    "price": <current_price>,
    "marketCap": <market_cap>,
    "24hChange": <price_change_percentage_24h>
  }
  ```

- **Example**: `/stats?coin=bitcoin`

### 2. **`/deviation`** (Calculate price deviation)
- **Method**: `GET`
- **Query Parameters**:
  - `coin` (required) - Coin name (e.g., `bitcoin`, `ethereum`, `matic-network`).
- **Response**:
  ```json
  {
    "deviation": <price_deviation>
  }
  ```

- **Example**: `/deviation?coin=bitcoin`

---

## Cron Job

This application runs a cron job every 2 hours to fetch cryptocurrency data for Bitcoin, Ethereum, and Matic, and saves the latest data in MongoDB.

- The cron job fetches the current price, market cap, and 24-hour change for each cryptocurrency.
- The cron job will automatically execute every 2 hours, updating the database with new data.

---

---

## Development and Testing

### Development

To run the server in development mode with live reloading, use the following:

```bash
npm run dev
```

### Testing

You can test the API endpoints using **Postman** or **cURL**:

1. **Test Stats**: `GET http://localhost:8000/stats?coin=bitcoin`
2. **Test Deviation**: `GET http://localhost:8000/deviation?coin=bitcoin`

Run unit tests (if implemented):

```bash
npm test
```

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them.
4. Open a pull request for review.

---

