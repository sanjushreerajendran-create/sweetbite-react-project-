import { useState, useEffect } from "react";
import { FiSearch, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import ProductTable from "../../components/ProductTable/ProductTable";
import Modal from "../../components/Modal/Modal";
import Pagination from "../../components/Pagination/Pagination";
import Loader from "../../components/Loader/Loader";

import { useProducts } from "../../context/ProductContext";

function Products() {
  const navigate = useNavigate();

  const {
    products,
    categories,
    deleteProduct,
  } = useProducts();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const productsPerPage = 5;
  useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 800);

  return () => clearTimeout(timer);
}, []);

  const filteredProducts = products.filter(
    (product) => {
      const search = searchTerm.toLowerCase();
      const matchesSearch = product.name.toLowerCase().includes(search) || product.sku.toLowerCase().includes(search);
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);
  


  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex,startIndex + productsPerPage);
  useEffect(() => {
  if (
    totalPages > 0 &&
    currentPage > totalPages
  ) {
    setCurrentPage(totalPages);
  }
}, [currentPage, totalPages]);

  const handleDeleteClick = (product) => { 
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedProduct) {
      deleteProduct(selectedProduct.id);
    }
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        {loading ? (
  <Loader text="Loading SweetBite products..." />
) : (
  <>
    <Header title="Products" subtitle="Manage all your delicious SweetBite products."/>

    <div className="products-top">

      <div className="products-search">
        <FiSearch />
       <input type="text" placeholder="Search by product name or SKU..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}/>
      </div>

      <div className="products-controls">

        <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
          <option value="All">
            All Categories
          </option>

          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        <button className="add-product-button" onClick={() => navigate("/add-product")}>
          <FiPlus />
          Add Product
        </button>

      </div>
    </div>

    <ProductTable products={currentProducts} onDelete={handleDeleteClick}/>

    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>

    <Modal
      isOpen={isModalOpen}
      title="Delete Product?"
      message={
        selectedProduct
          ? `Are you sure you want to delete "${selectedProduct.name}"?`
          : ""
      }
      onConfirm={handleConfirmDelete}
      onCancel={handleCancelDelete}
    />
  </>
)}
</main>
</div>
  );
}  
 export default Products;       