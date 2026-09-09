import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Products from "./pages/Products/Products";
import AddProduct from "./pages/AddProduct/AddProduct";
import EditProduct from "./pages/EditProduct/EditProduct";
import Categories from "./pages/Categories/Categories";
import Settings from "./pages/Settings/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/edit-product/:id" element={<EditProduct />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
