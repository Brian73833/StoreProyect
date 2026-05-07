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
