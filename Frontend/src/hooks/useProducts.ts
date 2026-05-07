import { useState, useEffect } from "react";
import type { Product, Category } from "../types";
import { getProducts } from "../services/productService";
import { getCategories } from "../services/categoryService";

// Define la estructura de lo que devolverá este hook personalizado
interface UseProductsResult {
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  addProduct: (product: Product) => void;
  addCategory: (category: Category) => void;
}

// Hook personalizado para manejar la carga de productos y categorías
export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Se ejecuta al montar el componente para obtener los datos de la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Obtiene productos y categorías al mismo tiempo
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        
        // Guarda los datos obtenidos en el estado
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

  // Función para agregar un producto a la lista local
  const addProduct = (product: Product) =>
    setProducts((prev) => [product, ...prev]);

  // Función para agregar una categoría a la lista local
  const addCategory = (category: Category) =>
    setCategories((prev) => [...prev, category]);

  // Retorna los datos y funciones para que puedan ser usados por los componentes
  return { products, categories, loading, error, addProduct, addCategory };
}
