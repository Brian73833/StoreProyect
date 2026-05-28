import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";const ProtectedRoute = () => {
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
