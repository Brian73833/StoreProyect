import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import AuthLogin from "./pages/AuthLogin";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  // Obtiene la ruta actual para saber en qué página estamos
  const location = useLocation();
  
  // Oculta el encabezado y el pie de página en la página de login
  const hideHeaderFooter = ["/auth"].includes(location.pathname);

  return (
    // Contenedor principal que ocupa toda la pantalla
    <div className="min-h-screen flex flex-col">
      {/* Muestra el Header si no está oculto */}
      {!hideHeaderFooter && <Header />}
      
      {/* Contenedor dinámico de las páginas */}
      <div className="flex-1">
        <Routes>
          {/* Rutas públicas a las que cualquiera puede acceder */}
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/auth" element={<AuthLogin />} />

          {/* Rutas protegidas que requieren iniciar sesión */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Redirige a /welcome si la ruta no existe */}
          <Route path="*" element={<Navigate to="/welcome" replace />} />
        </Routes>
      </div>
      
      {/* Muestra el Footer si no está oculto */}
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}
