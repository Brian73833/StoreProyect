import { useNavigate } from "react-router-dom";
import type { Product } from "../lib/types";
import { getImageUrl } from "../services/productService";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.productResourceId}`)}
      className={`bg-surface-container-lowest border border-slate-300 flex flex-col group overflow-hidden cursor-pointer
        ${product.stock > 0 ? "border-b-[4px] border-b-primary" : "border-b-[4px] border-b-secondary"}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={getImageUrl(product.imagePath)}
        />
        <div
          className={`absolute top-4 right-4 font-label-caps text-[10px] px-3 py-1 uppercase tracking-tighter
          ${product.stock > 0 ? "bg-primary text-on-primary" : "bg-secondary text-on-secondary"}`}
        >
          {product.stock > 0 ? "Stock" : "Sin Stock"}
        </div>
      </div>

      <div className="p-6 space-y-1 flex-grow">
        <span className="font-label-caps text-xs text-primary uppercase tracking-widest block">
          {product.categoryName || "General"}
        </span>
        <h3 className="font-headline-md text-2xl font-semibold text-on-surface">
          {product.name}
        </h3>
        <div className="pt-3 border-t border-slate-200">
          <p className="font-body-md text-base text-secondary">
            {product.description}
          </p>
        </div>
      </div>

      <div className="p-6 pt-0 mt-auto">
        <div className="flex justify-between items-baseline">
          <span className="font-headline-md text-2xl font-semibold text-primary">
            ₡{product.price}
            <span className="font-label-caps text-xs text-secondary">
              / {product.stock > 0 ? "unidad" : "agotado"}
            </span>
          </span>
          <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
            open_in_new
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
