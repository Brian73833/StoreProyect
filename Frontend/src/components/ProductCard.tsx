import { useNavigate } from "react-router-dom";
import type { Product } from "../models/responses/Product";
import { getImageUrl } from "../services/productService";
import { deleteProduct } from "../services/productService";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  onEdit?: () => void;
  onDelete?: () => void;
}
const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  const isAdmin = !!onEdit;
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      setDeleting(true);
      await deleteProduct(product.productResourceId);
      onDelete?.();
    } catch {
      alert("Error al eliminar el producto.");
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.();
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.productResourceId}`)}
      className={`relative bg-surface-container-lowest border border-slate-300 flex flex-col group overflow-hidden cursor-pointer
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
        {isAdmin && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end justify-center pb-4 gap-2 opacity-0 group-hover:opacity-100">
            <button
              onClick={handleEdit}
              title="Editar producto"
              className="flex items-center gap-1 px-3 py-2 bg-white text-primary text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg hover:bg-primary hover:text-white transition-all"
            >
              <span className="material-symbols-outlined text-base">edit</span>
              Editar
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              title="Eliminar producto"
              className="flex items-center gap-1 px-3 py-2 bg-white text-red-500 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
            >
              {deleting ? (
                <span className="material-symbols-outlined text-base animate-spin">
                  progress_activity
                </span>
              ) : (
                <span className="material-symbols-outlined text-base">delete</span>
              )}
              {deleting ? "..." : "Eliminar"}
            </button>
          </div>
        )}
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
