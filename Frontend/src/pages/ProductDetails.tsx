import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, getImageUrl } from "../services/productService";
import type { Product } from "../models/responses/Product";
import { ICON_STYLE } from "../lib/utils";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImg, setActiveImg] = useState<string>("");
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
        setActiveImg(getImageUrl(data.imagePath));
        setError(null);
      } catch (err) {
        setError("No se pudo cargar la información del producto.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-label-caps text-xs text-secondary uppercase tracking-widest animate-pulse">
            Loading architectural details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div data-cy="product-not-found" className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="text-center max-w-md">
          <span
            className="material-symbols-outlined text-error text-6xl mb-4"
            style={ICON_STYLE}
          >
            error_outline
          </span>
          <h2 className="font-headline-md text-2xl font-bold text-on-surface mb-2 uppercase">
            Product Not Found
          </h2>
          <p className="text-on-surface-variant mb-8">
            {error ||
              "The requested architectural piece is not available in our current catalog."}
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-stone-900 text-white px-8 py-3 font-label-caps text-xs uppercase tracking-widest hover:bg-primary transition-colors"
          >
            Return to Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-8 pb-24 px-6 md:px-16 max-w-7xl mx-auto bg-background text-on-surface animate-fade-in">
      <nav className="mb-12 flex items-center justify-between">
        <button
          onClick={() => navigate("/products")}
          className="flex items-center gap-2 group transition-all"
        >
          <span
            className="material-symbols-outlined text-secondary text-sm group-hover:-translate-x-1 transition-transform"
            style={ICON_STYLE}
          >
            arrow_back
          </span>
          <span className="font-label-caps text-xs text-secondary uppercase tracking-widest group-hover:text-primary transition-colors">
            Back to Catalog
          </span>
        </button>
        <div className="hidden md:flex items-center gap-3 text-[10px] font-label-caps text-outline uppercase tracking-[0.2em]">
          <span>{product.categoryName || "General"}</span>
          <span className="w-1 h-1 bg-outline-variant rounded-full"></span>
          <span className="text-primary font-bold">{product.name}</span>
        </div>
      </nav>

      <div className="grid grid-cols-12 gap-8 lg:gap-16">
        <div className="col-span-12 lg:col-span-7 animate-slide-up">
          <div className="relative aspect-[4/5] bg-surface-container overflow-hidden group border border-outline-variant">
            <img
              alt={product.name}
              className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-[1.02]"
              style={{ filter: "contrast(1.05) saturate(0.9)" }}
              src={activeImg}
            />

            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <span
                className="material-symbols-outlined text-white"
                style={ICON_STYLE}
              >
                zoom_in
              </span>
            </div>
          </div>
        </div>
        <div
          className="col-span-12 lg:col-span-5 flex flex-col pt-4 animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary font-label-caps text-[10px] uppercase tracking-widest rounded-full">
                {product.categoryName || "Premium Series"}
              </span>
            </div>

            <h1 data-cy="product-detail-name" className="font-headline-xl text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tighter text-on-surface uppercase mb-0 break-words">
              {product.name}
            </h1>
          </div>

          <div className="flex items-baseline gap-6 mb-8 border-b border-outline-variant pb-6">
            <span data-cy="product-detail-price" className="text-3xl font-bold text-primary">
              ₡{product.price}
            </span>
            <div className="flex items-center gap-2 text-xs">
              <span className={`w-2 h-2 rounded-full ${product.stock > 10 ? "bg-emerald-500 animate-pulse" : product.stock > 0 ? "bg-amber-500" : "bg-red-500"}`} />
              <span data-cy="product-detail-stock" className="font-medium text-outline uppercase tracking-wider">
                {product.stock > 0 ? `${product.stock} disponibles` : "Agotado"}
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-label-caps text-xs text-on-surface font-bold mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-8 h-px bg-on-surface"></span>
              Description
            </h3>
            <p data-cy="product-detail-description" className="font-body-md text-base text-on-surface-variant leading-relaxed">
              {product.description ||
                "No description available for this unique architectural element. Please contact our sales team for detailed material specifications and environmental impact reports."}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
