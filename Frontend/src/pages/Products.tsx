import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductModal from "../components/ProductModal";
import EditProductModal from "../components/EditProductModal";
import CategoryModal from "../components/CategoryModal";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../hooks/useProducts";
import { ICON_STYLE } from "../lib/utils";
import type { Product } from "../models/responses/Product";

const Products: React.FC = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const {
    products,
    categories,
    loading,
    error,
    addProduct,
    addCategory,
    updateProduct,
    removeProduct,
  } = useProducts();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const handleEditProduct = (product: Product) => {
    setProductToEdit(product);
    setIsEditModalOpen(true);
  };

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || p.categoryName === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="pt-8 pb-16 sm:pb-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto bg-background text-on-surface font-body-md">
      <div className="mb-6">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-secondary hover:text-primary font-semibold transition-colors duration-200 group"
        >
          <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform duration-200">
            arrow_back
          </span>
          Volver al inicio
        </button>
      </div>
      {isAdmin && (
        <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
          <button
            data-cy="add-category-btn"
            onClick={() => setIsCategoryModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-secondary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold shadow-xl shadow-secondary/20 hover:shadow-2xl hover:scale-[1.02] transition-all uppercase tracking-widest text-xs sm:text-sm"
          >
            <span className="material-symbols-outlined text-lg">category</span>
            Añadir Categoría
          </button>
          <button
            data-cy="add-product-btn"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:shadow-2xl hover:scale-[1.02] transition-all uppercase tracking-widest text-xs sm:text-sm"
          >
            <span className="material-symbols-outlined text-lg">
              add_circle
            </span>
            Añadir Producto
          </button>
        </div>
      )}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categories={categories}
        onProductAdded={addProduct}
      />
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setProductToEdit(null);
        }}
        categories={categories}
        product={productToEdit}
        onProductUpdated={updateProduct}
      />
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onCategoryAdded={addCategory}
      />
      <section className="mb-12 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="w-full md:w-1/2 space-y-3">
            <label className="font-label-caps text-xs text-secondary block uppercase tracking-widest">
              Buscar producto
            </label>
            <div className="relative">
              <input
                data-cy="search-input"
                className="w-full bg-surface-container-low border-b-2 border-outline focus:border-primary focus:ring-0 px-4 py-3 font-body-md text-base transition-all outline-none"
                placeholder="Escribe el nombre del producto..."
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span
                className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline"
                style={ICON_STYLE}
              >
                search
              </span>
            </div>
          </div>
          <div className="w-full md:w-64 space-y-3">
            <label className="font-label-caps text-xs text-secondary block uppercase tracking-widest">
              Categoría
            </label>
            <select
              data-cy="category-select"
              className="w-full bg-surface-container-low border-b-2 border-outline focus:border-primary focus:ring-0 px-4 py-3 font-body-md text-base transition-all outline-none appearance-none cursor-pointer"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Todos los productos</option>
              {categories.map((category) => (
                <option key={category.categoryResourceId} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="font-body-md text-sm text-secondary">
          {filtered.length === products.length
            ? `${products.length} productos`
            : `${filtered.length} de ${products.length} productos`}
        </p>
      </section>
      {loading ? (
        <div className="py-20 text-center text-primary font-body-md text-lg animate-pulse">
          Cargando productos...
        </div>
      ) : error ? (
        <div className="py-20 text-center text-error font-body-md text-lg">
          {error}
        </div>
      ) : filtered.length > 0 ? (
        <div data-cy="products-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard
              key={p.productResourceId}
              product={p}
              onEdit={isAdmin ? () => handleEditProduct(p) : undefined}
              onDelete={
                isAdmin ? () => removeProduct(p.productResourceId) : undefined
              }
            />
          ))}
        </div>
      ) : (
        <div data-cy="no-results-message" className="py-20 text-center text-secondary font-body-md text-lg">
          No se encontraron productos.
        </div>
      )}
    </main>
  );
};

export default Products;
