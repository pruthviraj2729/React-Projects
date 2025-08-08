import React from 'react';
import { LineChart, Line } from 'recharts';

export default function CoinSparkline({ data }) {
  if (!data || !Array.isArray(data)) return null;
  const chartData = data.map((price, idx) => ({ idx, price }));
  return (
    <LineChart width={90} height={32} data={chartData}>
      <Line type="monotone" dataKey="price" stroke="#60a5fa" dot={false} strokeWidth={2} />
    </LineChart>
  );
}
