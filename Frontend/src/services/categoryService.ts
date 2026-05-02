import type { Category } from "../lib/types";
import { BASE_URL } from "../lib/config";

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${BASE_URL}/api/categories`);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
}

export async function addCategory(
  category: Omit<Category, "categoryId">,
  token: string
): Promise<Category> {
  const response = await fetch(`${BASE_URL}/api/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  });
  if (!response.ok) {
    throw new Error("Failed to add category");
  }
  return response.json();
}
