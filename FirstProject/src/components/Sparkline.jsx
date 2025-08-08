import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const Sparkline = ({ data }) => {
  if (!data || data.length === 0) return null;
  const chartData = data.map((price, idx) => ({ idx, price }));
  return (
    <ResponsiveContainer width={100} height={30}>
      <LineChart data={chartData}>
        <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Sparkline;
