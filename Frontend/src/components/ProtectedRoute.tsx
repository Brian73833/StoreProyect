import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Componente para proteger rutas que requieren autenticación
const ProtectedRoute = () => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return null; 
  }

  if (!isLoggedIn) {
    return <Navigate to="/welcome" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
