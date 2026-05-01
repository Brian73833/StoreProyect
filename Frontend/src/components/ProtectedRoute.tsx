import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { isLoggedIn, isLoading } = useAuth();

  // Wait until the auth state is resolved from localStorage before deciding
  if (isLoading) {
    return null; // or a loading spinner
  }

  if (!isLoggedIn) {
    return <Navigate to="/welcome" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
