import React, { useState } from "react";

export default function TransactionForm({ onAdd }) {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || !amount) return;
    onAdd({
      id: Date.now(),
      text,
      amount: parseFloat(amount),
    });
    setText("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
      <input
        type="text"
        placeholder="Enter description"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <input
        type="number"
        placeholder="Amount (+ for income, - for expense)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button type="submit" className="bg-indigo-600 text-white rounded py-2 font-semibold hover:bg-indigo-700 transition">Add Transaction</button>
    </form>
  );
}
