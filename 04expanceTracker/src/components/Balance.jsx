import React from "react";

export default function Balance({ transactions }) {
  const balance = transactions.reduce((acc, tx) => acc + tx.amount, 0);
  return (
    <div className="mb-6 text-center">
      <h2 className="text-lg font-semibold text-gray-700">Balance</h2>
      <h3 className="text-3xl font-bold text-green-600">${balance.toFixed(2)}</h3>
    </div>
  );
}
