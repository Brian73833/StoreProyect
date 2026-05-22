import type { Product } from "../models/responses/Product";
import { config } from "../config";
import { getAuthHeader } from "./authService";

export const getImageUrl = (path: string | null | undefined) => {
  // Si no hay imagen, devuelve una por defecto
  if (!path) return "https://via.placeholder.com/400x500?text=No+Image";

  // Si ya es un enlace completo, lo devuelve tal cual
  if (path.startsWith("http")) return path;

  // Combina la URL base con la ruta de la imagen
  return `${config.api.url}/${path}`;
};

// Función para obtener todos los productos
export async function getProducts(): Promise<Product[]> {
  // Petición GET para listar productos
  const response = await fetch(`${config.api.url}/api/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

// Función para obtener los detalles de un solo producto por su ID
export async function getProductById(id: string): Promise<Product> {
  // Petición GET para un producto específico
  const response = await fetch(`${config.api.url}/api/products/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product detail");
  }
  return response.json();
}

// Función para agregar un nuevo producto usando FormData
export async function addProduct(product: FormData): Promise<Product> {
  // Petición POST para crear un producto
  const response = await fetch(`${config.api.url}/api/products`, {
    method: "POST",
    headers: { ...getAuthHeader() },
    body: product,
  });
  if (!response.ok) {
    throw new Error("Failed to add product");
  }
  return response.json();
}

// Función para eliminar un producto por su ID
export async function deleteProduct(id: string): Promise<void> {
  // Petición DELETE para borrar el producto
  const response = await fetch(`${config.api.url}/api/products/${id}`, {
    method: "DELETE",
    headers: { ...getAuthHeader() },
  });
  if (!response.ok) {
    throw new Error("Failed to delete product");
  }
}

// Función para actualizar un producto existente usando FormData
export async function updateProduct(id: string, product: FormData): Promise<Product> {
  // Petición PUT para actualizar un producto
  const response = await fetch(`${config.api.url}/api/products/${id}`, {
    method: "PUT",
    headers: { ...getAuthHeader() },
    body: product,
  });
  if (!response.ok) {
    throw new Error("Failed to update product");
  }
  return response.json();
}
