import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { User } from "../models/responses/User";

// Define la estructura de los datos de autenticación
interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoggedIn: boolean;
  isLoading: boolean;
}

// Crea el contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor que envuelve la app y comparte el estado
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Guarda los datos del usuario y el estado de carga
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Se ejecuta al cargar la aplicación para buscar un usuario guardado
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        // Convierte el texto guardado a un objeto de usuario
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem("user");
      }
    }
    // Termina el estado de carga
    setIsLoading(false);
  }, []);

  // Función para iniciar sesión y guardar al usuario
  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Función para cerrar sesión y borrar los datos
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Verifica si el usuario ha iniciado sesión
  const isLoggedIn = !!user;

  return (
    // Comparte los datos y funciones con el resto de la aplicación
    <AuthContext.Provider
      value={{ user, login, logout, isLoggedIn, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Función para usar el contexto de autenticación fácilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
