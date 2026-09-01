import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiImage, FiSave, FiArrowLeft } from "react-icons/fi";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useProducts } from "../../context/ProductContext";

function AddProduct() {
  const navigate = useNavigate();
  const { categories, addProduct } = useProducts();
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setFormData((previousData) => ({
      ...previousData,
      image: previewUrl,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    if (
      !formData.name ||
      !formData.sku ||
      !formData.description ||
      !formData.price ||
      formData.quantity === "" ||
      !formData.category
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    if (Number(formData.price) <= 0) {
      setError("Price must be greater than 0.");
      return;
    }
    if (Number(formData.quantity) < 0) {
      setError("Quantity cannot be negative.");
      return;
    }
    const finalProduct = {
      ...formData,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      image:
        formData.image ||
        "https://via.placeholder.com/500x500?text=SweetBite",
    };
    addProduct(finalProduct);
    navigate("/products");
  };
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <Header title="Add Product" subtitle="Add a new delicious product to your SweetBite store."/>
        <div className="form-page-container glass-card">
          <div className="form-top">
            <div>
              <h2>Product Information</h2>
              <p>Fill in the details below to add a new product.</p>
            </div>
            <button className="back-button" onClick={() => navigate("/products")}>
              <FiArrowLeft />
              Back
            </button>
          </div>

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
             <div className="form-group">
                <label>Product Name *</label>
                <input type="text" name="name" placeholder="Example: Chocolate Cake" value={formData.name} onChange={handleChange}/>
              </div>
            
              <div className="form-group">
                <label>SKU Code *</label>
                <input type="text" name="sku" placeholder="Example: SB-CAKE-011" value={formData.sku} onChange={handleChange}/>
              </div>
            
              <div className="form-group">
                <label>Price (₹) *</label>
                <input type="number" name="price" placeholder="Example: 599" value={formData.price} onChange={handleChange}min="1"/>
              </div>

              <div className="form-group">
                <label>Quantity *</label>
                <input type="number" name="quantity" placeholder="Example: 10" value={formData.quantity} onChange={handleChange}min="0"/>
              </div>

              <div className="form-group full-width">
                <label>Category *</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group full-width">
                <label>Description *</label>
                <textarea name="description" placeholder="Write a delicious description..." value={formData.description} onChange={handleChange} rows="5"/>
              </div>

              <div className="form-group full-width">
                <label>Product Image</label>
                <label className="image-upload-area" htmlFor="product-image">
                  <input id="product-image" type="file" accept="image/*" onChange={handleImageChange}/>
                  <FiImage />
                  <span>Click to upload product image</span>
                  <small>PNG, JPG or JPEG</small>
                </label>
              </div>

              {imagePreview && (
                <div className="image-preview-container full-width">
                  <p>Image Preview</p>
                  <img src={imagePreview} alt="Product preview" className="image-preview"/>
                </div>
              )}
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-button" onClick={() => navigate("/products")}>Cancel</button>
              <button type="submit" className="save-button">
                <FiSave />Add Product
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
export default AddProduct;
