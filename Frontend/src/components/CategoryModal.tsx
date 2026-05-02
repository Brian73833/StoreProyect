import React, { useState } from "react";
import type { Category } from "../lib/types";
import { addCategory } from "../services/categoryService";
import { useAuth } from "../context/AuthContext";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryAdded: (category: Category) => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, onClose, onCategoryAdded }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const newCategory = await addCategory({ name }, token!);
      onCategoryAdded(newCategory);
      onClose();
      setName("");
    } catch (err) {
      setError("Error al añadir la categoría.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-slide-up">
        <div className="p-8 border-b border-stone-100 flex justify-between items-center bg-stone-50">
          <h2 className="text-2xl font-bold text-stone-900 uppercase tracking-tight">Nueva Categoría</h2>
          <button onClick={onClose} className="p-2 hover:bg-stone-200 rounded-full transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 flex items-center gap-2">
              <span className="material-symbols-outlined">error</span>
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-1">Nombre de la Categoría</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-100 rounded-xl focus:bg-white focus:border-primary outline-none transition-all"
              placeholder="Ej: Accesorios, Construcción, etc."
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-secondary text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin">progress_activity</span>
              ) : (
                "Guardar Categoría"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
