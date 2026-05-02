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

export type User = {
  userResourceId: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
};

export type Category = {
  categoryId: number;
  name: string;
};
