export type User = {
  userResourceId: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string; // Token de autenticación JWT
};
