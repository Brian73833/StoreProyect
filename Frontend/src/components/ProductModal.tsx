import React, { useState, useEffect } from "react";
import type { Category, Product } from "../lib/types";
import { addProduct } from "../services/productService";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onProductAdded: (product: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  categories,
  onProductAdded,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    categoryId: categories.length > 0 ? categories[0].categoryId : 0,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync categoryId whenever the categories list changes (e.g. loaded async)
  useEffect(() => {
    if (categories.length > 0) {
      setFormData((prev) => ({
        ...prev,
        categoryId:
          prev.categoryId === 0 ? categories[0].categoryId : prev.categoryId,
      }));
    }
  }, [categories]);

  // Reset form every time the modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        categoryId: categories.length > 0 ? categories[0].categoryId : 0,
      });
      setImageFile(null);
      setError(null);
    }
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock" || name === "categoryId"
          ? Number(value)
          : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price.toString());
      data.append("stock", formData.stock.toString());
      data.append("categoryId", formData.categoryId.toString());
      if (imageFile) {
        data.append("imageFile", imageFile);
      }

      const newProduct = await addProduct(data);
      onProductAdded(newProduct);
      onClose();
      // Reset form
      setFormData({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        categoryId: categories.length > 0 ? categories[0].categoryId : 0,
      });
      setImageFile(null);
    } catch (err) {
      setError("Error al añadir el producto. Verifica los datos.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-slide-up">
        <div className="p-6 md:p-8 border-b border-stone-100 flex justify-between items-center bg-stone-50">
          <h2 className="text-2xl font-bold text-stone-900 uppercase tracking-tight">
            Nuevo Producto
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-stone-200 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 md:p-8 space-y-6 max-h-[85vh] md:max-h-[70vh] overflow-y-auto"
        >
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 flex items-center gap-2">
              <span className="material-symbols-outlined">error</span>
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-1">
                Nombre
              </label>
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-100 rounded-xl focus:bg-white focus:border-primary outline-none transition-all"
                placeholder="Nombre del producto"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-1">
                Descripción
              </label>
              <textarea
                required
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-100 rounded-xl focus:bg-white focus:border-primary outline-none transition-all resize-none h-24"
                placeholder="Breve descripción..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-1">
                  Precio (₡)
                </label>
                <input
                  required
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-100 rounded-xl focus:bg-white focus:border-primary outline-none transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-1">
                  Stock
                </label>
                <input
                  required
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-100 rounded-xl focus:bg-white focus:border-primary outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-1">
                Imagen del Producto
              </label>
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="product-image"
                />

                {imageFile ? (
                  <div className="relative rounded-2xl overflow-hidden border-2 border-primary/20 bg-primary/5 p-4 flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center overflow-hidden border border-stone-100">
                        <img
                          src={URL.createObjectURL(imageFile)}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-stone-900 truncate max-w-[150px]">
                          {imageFile.name}
                        </p>
                        <p className="text-xs text-stone-500 font-medium">
                          {(imageFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <label
                      htmlFor="product-image"
                      className="cursor-pointer px-4 py-2 bg-white text-primary text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm border border-primary/10 hover:bg-primary hover:text-white transition-all"
                    >
                      Cambiar
                    </label>
                  </div>
                ) : (
                  <label
                    htmlFor="product-image"
                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-stone-200 rounded-2xl bg-stone-50 hover:bg-white hover:border-primary hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <span className="material-symbols-outlined text-stone-400 group-hover:text-primary transition-colors text-3xl">
                          add_photo_alternate
                        </span>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-stone-600 group-hover:text-primary transition-colors uppercase tracking-tight">
                          Seleccionar imagen
                        </p>
                        <p className="text-[10px] text-stone-400 font-medium uppercase tracking-widest mt-1">
                          PNG, JPG hasta 50MB
                        </p>
                      </div>
                    </div>
                  </label>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-1">
                Categoría
              </label>
              <select
                required
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-100 rounded-xl focus:bg-white focus:border-primary outline-none transition-all"
              >
                {categories.map((cat) => (
                  <option key={cat.categoryId} value={cat.categoryId}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin">
                  progress_activity
                </span>
              ) : (
                "Guardar Producto"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
