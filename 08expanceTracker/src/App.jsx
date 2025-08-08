import React from "react";
import { useState } from "react";
import "./App.css"

import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Balance from "./components/Balance";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever transactions change
  React.useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleAdd = (tx) => {
    setTransactions([tx, ...transactions]);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter((tx) => tx.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-indigo-600">Expense Tracker</h1>
        <Balance transactions={transactions} />
        <TransactionForm onAdd={handleAdd} />
        <TransactionList transactions={transactions} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App
