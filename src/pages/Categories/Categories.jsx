import { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck,} from "react-icons/fi";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Modal from "../../components/Modal/Modal";

import { useProducts } from "../../context/ProductContext";

function Categories() {
  const {
    categories,
    products,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useProducts();
  const [newCategory, setNewCategory] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const handleAddCategory = (event) => {
    event.preventDefault();
    const trimmedName = newCategory.trim();
    if (!trimmedName) {
      setError("Please enter a category name.");
      return;
    }
    const alreadyExists = categories.some((category) =>
        category.name.toLowerCase() ===
        trimmedName.toLowerCase()
    );
    if (alreadyExists) {
      setError("This category already exists.");
      return;
    }
    addCategory(trimmedName);

    setNewCategory("");
    setError("");
  };

  const handleEditClick = (category) => {
    setEditingCategoryId(category.id);
    setEditingName(category.name);
    setError("");
  };

  const handleSaveEdit = (categoryId) => {
    const trimmedName = editingName.trim();
    if (!trimmedName) {
      setError("Category name cannot be empty.");
      return;
    }
    const alreadyExists = categories.some(
      (category) =>
        category.id !== categoryId &&
        category.name.toLowerCase() ===
          trimmedName.toLowerCase()
    );
    if (alreadyExists) {
      setError("This category already exists.");
      return;
    }
    updateCategory(categoryId, trimmedName);

    setEditingCategoryId(null);
    setEditingName("");
    setError("");
  };
  const handleCancelEdit = () => {
    setEditingCategoryId(null);
    setEditingName("");
    setError("");
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedCategory) {
      deleteCategory(selectedCategory.id);
    }
    setSelectedCategory(null);
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setSelectedCategory(null);
    setIsModalOpen(false);
  };

  const getProductCount = (categoryName) => {
    return products.filter(
      (product) =>
        product.category === categoryName
    ).length;
  };
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <Header title="Categories" subtitle="Organize your SweetBite products into categories."/>
        <div className="category-layout">
          
          <section className="category-add-card glass-card">
            <h2>Add New Category</h2>
            <p>Create a new category for your bakery products.</p>
            <form onSubmit={handleAddCategory} className="category-form">
              <input type="text" placeholder="Example: Donuts" value={newCategory} onChange={(event) => setNewCategory(event.target.value)}/>
              <button type="submit">
                <FiPlus />
                Add Category
              </button>
            </form>

            {error && (
              <div className="category-error">
                {error}
              </div>
            )}
          </section>

          <section className="category-list-card glass-card">
            <div className="category-list-heading">
              <div>
                <h2>All Categories</h2>
                <p> {categories.length} categories available</p>
              </div>
            </div>

            <div className="category-list">
              {categories.map((category) => (
                <div className="category-item" key={category.id}>
                  {editingCategoryId ===
                  category.id ? (
                    <>
                      <div className="category-edit-input">
                        <input type="text" value={editingName} onChange={(event) => setEditingName(event.target.value)}autoFocus/>
                      </div>

                      <div className="category-actions">
                        <button className="category-save" onClick={() => handleSaveEdit(category.id)} title="Save">
                          <FiCheck />
                        </button>
                        <button className="category-cancel" onClick={handleCancelEdit} title="Cancel">
                          <FiX />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="category-info">
                        <div className="category-icon">
                          🧁
                        </div>

                        <div>
                          <h3>{category.name}</h3>
                          <p>{getProductCount(category.name)}{" "}products</p>
                        </div>
                      </div>

                      <div className="category-actions">
                        <button className="category-edit" onClick={() => handleEditClick(category)} title="Edit">
                          <FiEdit2 />
                        </button>
                        <button className="category-delete" onClick={() => handleDeleteClick(category)} title="Delete">
                          <FiTrash2 />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
        <Modal isOpen={isModalOpen} title="Delete Category?" message={ selectedCategory ? `Are you sure you want to delete "${selectedCategory.name}"?`: ""} onConfirm={handleConfirmDelete} onCancel={handleCancelDelete}/>
      </main>
    </div>
  );
}
export default Categories;