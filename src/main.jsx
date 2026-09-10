import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { ProductProvider } from "./context/ProductContext";

import "./index.css";
import "./styles/global.css";
import "./styles/forms.css";
import "./styles/dashboard.css";
import "./styles/products.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter >
      <ProductProvider>
        <App />
      </ProductProvider>
    </BrowserRouter>
  </React.StrictMode>
);
