import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/Uselocalstorage";
import {
  initialProducts,
  initialCategories,
} from "../services/DummyData.jsx";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useLocalStorage(
    "sweetbiteProducts",
    initialProducts
  );

  const [categories, setCategories] = useLocalStorage(
    "sweetbiteCategories",
    initialCategories
  );
  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
    };

    setProducts((previousProducts) => [
      ...previousProducts,
      newProduct,
    ]);
  };
  const updateProduct = (id, updatedProduct) => {
    setProducts((previousProducts) =>
      previousProducts.map((product) =>
        product.id === Number(id)
          ? {
              ...product,
              ...updatedProduct,
            }
          : product
      )
    );
  };
  const deleteProduct = (id) => {
    setProducts((previousProducts) =>
      previousProducts.filter(
        (product) => product.id !== Number(id)
      )
    );
  };
  const getProductById = (id) => {
    return products.find(
      (product) => product.id === Number(id)
    );
  };
  const addCategory = (categoryName) => {
    const newCategory = {
      id: Date.now(),
      name: categoryName,
    };

    setCategories((previousCategories) => [
      ...previousCategories,
      newCategory,
    ]);
  };
  const updateCategory = (id, categoryName) => {
    setCategories((previousCategories) =>
      previousCategories.map((category) =>
        category.id === Number(id)
          ? {
              ...category,
              name: categoryName,
            }
          : category
      )
    );
  };

  const deleteCategory = (id) => {
    setCategories((previousCategories) =>
      previousCategories.filter(
        (category) => category.id !== Number(id)
      )
    );
  };

  const value = {
    products,
    categories,

    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,

    addCategory,
    updateCategory,
    deleteCategory,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}
export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error(
      "useProducts must be used inside ProductProvider"
    );
  }
  return context;
}
export default ProductContext;