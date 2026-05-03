import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductModal from "../components/ProductModal";
import CategoryModal from "../components/CategoryModal";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../hooks/useProducts";
import { ICON_STYLE } from "../lib/utils";

const Products: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.isAdmin || false;

  const { products, categories, loading, error, addProduct, addCategory } =
    useProducts();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === 0 || p.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="pt-8 pb-16 sm:pb-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto bg-background text-on-surface font-body-md">
      {/* Back to Home */}
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
            onClick={() => setIsCategoryModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-secondary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold shadow-xl shadow-secondary/20 hover:shadow-2xl hover:scale-[1.02] transition-all uppercase tracking-widest text-xs sm:text-sm"
          >
            <span className="material-symbols-outlined text-lg">category</span>
            Añadir Categoría
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:shadow-2xl hover:scale-[1.02] transition-all uppercase tracking-widest text-xs sm:text-sm"
          >
            <span className="material-symbols-outlined text-lg">add_circle</span>
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

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onCategoryAdded={addCategory}
      />

      {/* ── Search & Filter ── */}
      <section className="mb-12 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          {/* Search */}
          <div className="w-full md:w-1/2 space-y-3">
            <label className="font-label-caps text-xs text-secondary block uppercase tracking-widest">
              Buscar producto
            </label>
            <div className="relative">
              <input
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

          {/* Filtro por categoría */}
          <div className="w-full md:w-64 space-y-3">
            <label className="font-label-caps text-xs text-secondary block uppercase tracking-widest">
              Categoría
            </label>
            <select
              className="w-full bg-surface-container-low border-b-2 border-outline focus:border-primary focus:ring-0 px-4 py-3 font-body-md text-base transition-all outline-none appearance-none cursor-pointer"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(Number(e.target.value))}
            >
              <option value={0}>Todos los productos</option>
              {categories.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Conteo de resultados */}
        <p className="font-body-md text-sm text-secondary">
          {filtered.length === products.length
            ? `${products.length} productos`
            : `${filtered.length} de ${products.length} productos`}
        </p>
      </section>

      {/* ── Product Grid ── */}
      {loading ? (
        <div className="py-20 text-center text-primary font-body-md text-lg animate-pulse">
          Cargando productos...
        </div>
      ) : error ? (
        <div className="py-20 text-center text-error font-body-md text-lg">
          {error}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.productResourceId} product={p} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-secondary font-body-md text-lg">
          No se encontraron productos.
        </div>
      )}

      {/* ── Estándares de calidad ── */}
      <section className="mt-16 sm:mt-20 pt-10 sm:pt-12 border-t-2 border-slate-400">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6">
            <span className="font-label-caps text-xs text-primary uppercase tracking-widest block">
              Quality Standards
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-on-surface">
              Architectural Integrity
            </h2>
            <p className="font-body-lg text-lg sm:text-xl text-secondary leading-relaxed">
              Every ceramic component produced in our factory undergoes rigorous
              thermal stress testing and compression analysis to ensure
              structural longevity.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-4 sm:pt-6">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-headline-md text-2xl font-semibold text-on-surface">
                  ISO 9001
                </h4>
                <p className="font-body-md text-base text-secondary mt-1">
                  Certified quality management in every kiln batch.
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-headline-md text-2xl font-semibold text-on-surface">
                  100% Raw Clay
                </h4>
                <p className="font-body-md text-base text-secondary mt-1">
                  Locally sourced, sustainable mineral extraction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Products;
