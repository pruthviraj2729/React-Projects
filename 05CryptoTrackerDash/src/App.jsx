import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import CoinTable from "./components/CoinTable";
import Sparkline from "./components/Sparkline";

const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h";

export default function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch coins
  const fetchCoins = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(COINGECKO_URL);
      setCoins(data);
    } catch (err) {
      setError("Failed to fetch data");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCoins();
    // Optional: refresh every 60 seconds
    const interval = setInterval(fetchCoins, 60000);
    return () => clearInterval(interval);
  }, [fetchCoins]);

  // Filter coins by search
  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Crypto Tracker Dashboard</h1>
        {error && <div className="text-red-400 mb-4">{error}</div>}
        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <CoinTable
            coins={filteredCoins.map((coin) => ({
              ...coin,
              sparkline_in_7d: coin.sparkline_in_7d?.price || [],
              SparklineComponent: <Sparkline data={coin.sparkline_in_7d?.price || []} />,
            }))}
            search={search}
            onSearchChange={setSearch}
          />
        )}
        <div className="text-sm text-gray-400 mt-4 text-center">
          Data from CoinGecko. Updates every 60 seconds.
        </div>
      </div>
    </div>
  );
}
