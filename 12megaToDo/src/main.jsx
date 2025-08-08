import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from "./App.jsx";

// For React 18+
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you use React 17 or below, you'd do:
// ReactDOM.render(<App />, document.getElementById("root"));

