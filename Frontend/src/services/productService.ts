import type { Product } from "../lib/types";
import { BASE_URL } from "../lib/config";

export const getImageUrl = (path: string | null | undefined) => {
  // Si no hay imagen, devuelve una por defecto
  if (!path) return "https://via.placeholder.com/400x500?text=No+Image";

  // Si ya es un enlace completo, lo devuelve tal cual
  if (path.startsWith("http")) return path;

  // Combina la URL base con la ruta de la imagen
  return `${BASE_URL}/${path}`;
};

// Función para obtener todos los productos
export async function getProducts(): Promise<Product[]> {
  // Petición GET para listar productos
  const response = await fetch(`${BASE_URL}/api/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

// Función para obtener los detalles de un solo producto por su ID
export async function getProductById(id: string): Promise<Product> {
  // Petición GET para un producto específico
  const response = await fetch(`${BASE_URL}/api/products/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product detail");
  }
  return response.json();
}

// Función para agregar un nuevo producto usando FormData
export async function addProduct(product: FormData): Promise<Product> {
  // Petición POST para crear un producto
  const response = await fetch(`${BASE_URL}/api/products`, {
    method: "POST",
    body: product,
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to add product");
  }
  return response.json();
}

// Función para eliminar un producto por su ID
export async function deleteProduct(id: string): Promise<void> {
  // Petición DELETE para borrar el producto
  const response = await fetch(`${BASE_URL}/api/products/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to delete product");
  }
}
