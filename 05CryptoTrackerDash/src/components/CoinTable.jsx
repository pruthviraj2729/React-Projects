import React from 'react';

const CoinTable = ({ coins }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white rounded shadow text-gray-900">
        <thead>
          <tr>
            <th className="py-2 px-4">#</th>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4">Symbol</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">24h Change</th>
            <th className="py-2 px-4">Market Cap</th>
            <th className="py-2 px-4">7d</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.id} className="border-t hover:bg-gray-50">
              <td className="py-2 px-4">{coin.market_cap_rank}</td>
              <td className="py-2 px-4 flex items-center gap-2">
                <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                {coin.name}
              </td>
              <td className="py-2 px-4 uppercase">{coin.symbol}</td>
              <td className="py-2 px-4">${coin.current_price.toLocaleString()}</td>
              <td className={`py-2 px-4 ${coin.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'}`}>{coin.price_change_percentage_24h.toFixed(2)}%</td>
              <td className="py-2 px-4">${coin.market_cap.toLocaleString()}</td>
              <td className="py-2 px-4">
                {coin.SparklineComponent}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinTable;
