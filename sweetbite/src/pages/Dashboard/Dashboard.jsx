import { FiPackage, FiGrid, FiAlertCircle, FiClock,} from "react-icons/fi";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useProducts } from "../../context/ProductContext";

function Dashboard() {
  const { products, categories } = useProducts();

  const outOfStockProducts = products.filter(
    (product) => product.quantity === 0
  );

  const recentProducts = [...products]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <Header title="Dashboard" subtitle="Welcome back! Here's what's happening at SweetBite today."/>

        <section className="stats-grid">
          <div className="stat-card glass-card">
            <div className="stat-icon products-icon">
              <FiPackage />
            </div>

            <div>
              <p>Total Products</p>
              <h2>{products.length}</h2>
            </div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-icon categories-icon">
              <FiGrid />
            </div>

            <div>
              <p>Total Categories</p>
              <h2>{categories.length}</h2>
            </div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-icon stock-icon">
              <FiAlertCircle />
            </div>

            <div>
              <p>Out of Stock</p>
              <h2>{outOfStockProducts.length}</h2>
            </div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-icon recent-icon">
              <FiClock />
            </div>

            <div>
              <p>Recent Products</p>
              <h2>{recentProducts.length}</h2>
            </div>
          </div>
        </section>

        <section className="recent-section glass-card">
          <div className="section-heading">
            <div>
              <h2>Recent Products</h2>
              <p>Recently added delicious items at SweetBite.</p>
            </div>
          </div>

          <div className="recent-products-list">
            {recentProducts.map((product) => (
              <div className="recent-product" key={product.id}>
                <img src={product.image} alt={product.name} className="recent-product-image"/>

                <div className="recent-product-info">
                  <h3>{product.name}</h3>

                  <p>{product.category}</p>
                </div>

                <div className="recent-product-price">
                  ₹{product.price}
                </div>

                <div className={`product-status ${product.quantity === 0 ? "out-stock": product.quantity <= 5? "low-stock": "in-stock"}`}>
                  {product.quantity === 0
                    ? "Out of Stock"
                    : product.quantity <= 5
                    ? "Low Stock"
                    : "In Stock"}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
