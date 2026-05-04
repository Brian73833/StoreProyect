// Define la estructura de un Producto
export type Product = {
  productResourceId: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imagePath: string;
  categoryId: number;
  categoryName?: string;
};

// Define la estructura de un Usuario
export type User = {
  userResourceId: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string; // Token de autenticación JWT
};

// Define la estructura de una Categoría
export type Category = {
  categoryId: number;
  name: string;
};
