import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CoinSparkline from './CoinSparkline';

export default function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoins();
    const interval = setInterval(fetchCoins, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const fetchCoins = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets',
        {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 100,
            page: 1,
            sparkline: true,
            price_change_percentage: '24h',
          },
        }
      );
      setCoins(res.data);
    } catch (err) {
      setCoins([]);
    }
    setLoading(false);
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Crypto Tracker Dashboard</h1>
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by name or symbol..."
          className="p-2 rounded bg-gray-800 text-white w-full max-w-md border border-gray-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-3">#</th>
              <th className="py-2 px-3 text-left">Coin</th>
              <th className="py-2 px-3">Symbol</th>
              <th className="py-2 px-3">Price</th>
              <th className="py-2 px-3">24h %</th>
              <th className="py-2 px-3">Market Cap</th>
              <th className="py-2 px-3">7d Sparkline</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-6">Loading...</td>
              </tr>
            ) : (
              filteredCoins.map((coin) => (
                <tr key={coin.id} className="border-b border-gray-700 hover:bg-gray-700/40 transition">
                  <td className="py-2 px-3">{coin.market_cap_rank}</td>
                  <td className="py-2 px-3 flex items-center gap-2">
                    <img src={coin.image} alt={coin.name} className="w-6 h-6 mr-2" />
                    <span>{coin.name}</span>
                  </td>
                  <td className="py-2 px-3 uppercase">{coin.symbol}</td>
                  <td className="py-2 px-3">${coin.current_price.toLocaleString()}</td>
                  <td className={`py-2 px-3 ${coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {coin.price_change_percentage_24h?.toFixed(2)}%
                  </td>
                  <td className="py-2 px-3">${coin.market_cap.toLocaleString()}</td>
                  <td className="py-2 px-3">
                    <CoinSparkline data={coin.sparkline_in_7d?.price} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <p className="text-gray-400 mt-6 text-center text-xs">Data from CoinGecko. Updates every 30 seconds.</p>
    </div>
  );
}
