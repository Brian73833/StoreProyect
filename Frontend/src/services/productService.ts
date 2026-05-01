import type { Product } from "../lib/types";
import { BASE_URL } from "../lib/config";

export const getImageUrl = (path: string | null | undefined) => {
  if (!path) return "https://via.placeholder.com/400x500?text=No+Image";
  if (path.startsWith("http")) return path;
  return `${BASE_URL}/${path}`;
};

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/api/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

export async function getProductById(id: string): Promise<Product> {
  const response = await fetch(`${BASE_URL}/api/products/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product detail");
  }
  return response.json();
}

export async function addProduct(product: FormData): Promise<Product> {
  const response = await fetch(`${BASE_URL}/api/products`, {
    method: "POST",
    body: product,
  });
  if (!response.ok) {
    throw new Error("Failed to add product");
  }
  return response.json();
}

export async function deleteProduct(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/api/products/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete product");
  }
}
