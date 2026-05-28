import type { Category } from "../models/responses/Category";
import { config } from "../config";
import { getAuthHeader } from "./authService";
export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${config.api.url}/api/categories`);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
}
export async function addCategory(
  category: Omit<Category, "categoryResourceId">,
): Promise<Category> {
  const response = await fetch(`${config.api.url}/api/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(category),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to add category");
  }

  return response.json();
}
