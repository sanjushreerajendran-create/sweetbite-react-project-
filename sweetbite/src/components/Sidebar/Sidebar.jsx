import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiPackage,
  FiPlusCircle,
  FiGrid,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useState } from "react";

function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("sweetbiteUser");
    navigate("/");
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button className="mobile-menu-button" onClick={() => setIsOpen(true)}>
        <FiMenu />
      </button>

      {isOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}>
          
        </div>
      )}

      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-top">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">🧁</div>

            <div>
              <h2>SweetBite</h2>
              <span>Admin Panel</span>
            </div>

            <button className="sidebar-close" onClick={closeSidebar}>
              <FiX />
            </button>
          </div>

          <nav className="sidebar-nav">
            <NavLink to="/dashboard" className="nav-item" onClick={closeSidebar}>
              <FiHome />
              <span>Dashboard</span>
            </NavLink>

            <NavLink to="/products" className="nav-item" onClick={closeSidebar}>
              <FiPackage />
              <span>Products</span>
            </NavLink>

            <NavLink to="/add-product" className="nav-item" onClick={closeSidebar}>
              <FiPlusCircle />
              <span>Add Product</span>
            </NavLink>

            <NavLink to="/categories" className="nav-item" onClick={closeSidebar}>
              <FiGrid />
              <span>Categories</span>
            </NavLink>

            <NavLink to="/settings" className="nav-item" onClick={closeSidebar}>
              <FiSettings />
              <span>Settings</span>
            </NavLink>
          </nav>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          <FiLogOut />
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
}
export default Sidebar;