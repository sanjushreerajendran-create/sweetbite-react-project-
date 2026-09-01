import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function ProductTable({products,onDelete,}) {
  const navigate = useNavigate();

  const getStatus = (quantity) => {
    if (quantity === 0) {
      return "Out of Stock";
    }

    if (quantity <= 5) {
      return "Low Stock";
    }

    return "In Stock";
  };

  const getStatusClass = (quantity) => {
    if (quantity === 0) {
      return "out-stock";
    }

    if (quantity <= 5) {
      return "low-stock";
    }

    return "in-stock";
  };

  return (
    <div className="product-table-wrapper glass-card">
      <table className="product-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="table-product">
                    <img src={product.image}alt={product.name}/>
                    <span>{product.name}</span>
                  </div>
                </td>

                <td>{product.sku}</td>
                <td>{product.category}</td>
                <td>₹{product.price}</td>
                <td>{product.quantity}</td>

                <td>
                  <span className={`product-status ${getStatusClass(product.quantity)}`}>
                    {getStatus(product.quantity)}
                  </span>
                </td>

                <td>
                  <div className="table-actions">
                    <button className="edit-button" onClick={() =>navigate(`/edit-product/${product.id}`)}>
                      <FiEdit2 />
                    </button>
                    <button className="delete-button" onClick={() => onDelete(product)}>
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="empty-products">No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;