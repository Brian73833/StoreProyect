import type { Category } from "../types";
import { config } from "../config";

// Función para obtener la lista de todas las categorías
export async function getCategories(): Promise<Category[]> {
  // Petición GET para obtener las categorías
  const response = await fetch(`${config.api.url}/api/categories`);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
}

// Función para crear una nueva categoría
export async function addCategory(
  category: Omit<Category, "categoryId">,
): Promise<Category> {
  // Petición POST enviando los datos de la nueva categoría
  const response = await fetch(`${config.api.url}/api/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
    credentials: "include", // Incluye las cookies de sesión
  });

  if (!response.ok) {
    throw new Error("Failed to add category");
  }

  return response.json();
}
