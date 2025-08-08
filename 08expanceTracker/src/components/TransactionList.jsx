import React from "react";

export default function TransactionList({ transactions, onDelete }) {
  return (
    <ul className="space-y-2">
      {transactions.length === 0 && (
        <li className="text-gray-500 text-center">No transactions yet.</li>
      )}
      {transactions.map((tx) => (
        <li
          key={tx.id}
          className={`flex justify-between items-center px-4 py-2 rounded shadow-sm ${tx.amount < 0 ? "bg-red-50 border-l-4 border-red-400" : "bg-green-50 border-l-4 border-green-400"}`}
        >
          <span className="font-medium text-gray-700">{tx.text}</span>
          <span className={tx.amount < 0 ? "text-red-600 font-bold" : "text-green-600 font-bold"}>
            {tx.amount < 0 ? "-" : "+"}${Math.abs(tx.amount).toFixed(2)}
          </span>
          <button
            onClick={() => onDelete(tx.id)}
            className="ml-4 text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-red-500 hover:text-white transition"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
