import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { User } from "../models/responses/User";interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoggedIn: boolean;
  isAdmin: boolean;
  isLoading: boolean;
}const AuthContext = createContext<AuthContextType | undefined>(undefined);export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem("user");
      }
    }    setIsLoading(false);
  }, []);  const login = (userData: User) => {
    setUser(userData);
    const { token, ...userWithoutToken } = userData;
    localStorage.setItem("user", JSON.stringify(userWithoutToken));
  };  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };  const isLoggedIn = !!user;  const isAdmin = user?.roles?.includes("Administrator") ?? false;

  return (    <AuthContext.Provider
      value={{ user, login, logout, isLoggedIn, isAdmin, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
