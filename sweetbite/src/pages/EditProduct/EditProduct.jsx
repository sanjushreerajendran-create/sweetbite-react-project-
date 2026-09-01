import { useEffect, useState } from "react";
import { useNavigate, useParams,} from "react-router-dom";
import { FiImage, FiSave, FiArrowLeft,} from "react-icons/fi";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useProducts } from "../../context/ProductContext";

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    products,
    categories,
    updateProduct,
  } = useProducts();
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    image: "",
  });
  const [imagePreview, setImagePreview] =
    useState("");

  const [error, setError] = useState("");
  const product = products.find(
    (item) => item.id === Number(id)
  );
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        sku: product.sku || "",
        description: product.description || "",
        price: product.price || "",
        quantity: product.quantity ?? "",
        category: product.category || "",
        image: product.image || "",
      });

      setImagePreview(product.image || "");
    }
  }, [product]);
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
    const updatedProduct = {
      ...formData,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      image:
        formData.image ||
        product.image ||
        "https://via.placeholder.com/500x500?text=SweetBite",
    };
    updateProduct(id, updatedProduct);
    navigate("/products");
  };
  if (!product) {
    return (
      <div className="dashboard-layout">
        <Sidebar />
        <main className="dashboard-main">
          <Header title="Product Not Found" subtitle="The product you are trying to edit does not exist."/>
          <div className="form-page-container glass-card">
            <h2>Product Not Found</h2>
            <p style={{ marginTop: "10px" }}>This product may have been deleted.</p>
            <button className="back-button" onClick={() => navigate("/products")} style={{ marginTop: "20px" }}>
              <FiArrowLeft />
              Back to Products
            </button>
          </div>
        </main>
      </div>
    );
  }
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <Header title="Edit Product" subtitle="Update your SweetBite product information."/>
        <div className="form-page-container glass-card">
          <div className="form-top">
            <div>
              <h2>Edit Product Information</h2>
              <p>Update the details and save your changes.</p>
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
                <input type="text" name="name" value={formData.name} onChange={handleChange}/>
              </div>

            <div className="form-group">
                <label>SKU Code *</label>
                <input type="text" name="sku" value={formData.sku} onChange={handleChange}/>
              </div>

            <div className="form-group">
                <label>Price (₹) *</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} min="1"/>
              </div>

            <div className="form-group">
                <label>Quantity *</label>
                <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} min="0"/>
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
                <textarea name="description" value={formData.description} onChange={handleChange} rows="5"/>
              </div>

              <div className="form-group full-width">
                <label>Product Image</label>
                <label className="image-upload-area" htmlFor="edit-product-image">
                  <input id="edit-product-image" type="file" accept="image/*" onChange={handleImageChange}/>
                  <FiImage />
                  <span>Click to change product image</span>
                  <small>PNG, JPG or JPEG</small>
                </label>
              </div>

              {imagePreview && (
                <div className="image-preview-container full-width">
                  <p>Product Image Preview</p>
                  <img src={imagePreview} alt="Product preview" className="image-preview"/>
                </div>
              )}
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-button" onClick={() => navigate("/products")}>Cancel</button>
              <button type="submit" className="save-button">
                <FiSave />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
export default EditProduct;