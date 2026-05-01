import { useState, useEffect } from "react";
import type { Product, Category } from "../lib/types";
import { getProducts } from "../services/productService";
import { getCategories } from "../services/categoryService";

interface UseProductsResult {
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  addProduct: (product: Product) => void;
  addCategory: (category: Category) => void;
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
        setError(null);
      } catch (err) {
        setError("Error al cargar los datos. Por favor, intenta de nuevo.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addProduct = (product: Product) =>
    setProducts((prev) => [product, ...prev]);

  const addCategory = (category: Category) =>
    setCategories((prev) => [...prev, category]);

  return { products, categories, loading, error, addProduct, addCategory };
}
