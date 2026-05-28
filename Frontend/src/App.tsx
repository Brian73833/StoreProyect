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

export default function App() {  const location = useLocation();  const hideHeaderFooter = ["/auth"].includes(location.pathname);

  return (    <div className="min-h-screen flex flex-col">      {!hideHeaderFooter && <Header />}      <div className="flex-1">
        <Routes>          <Route path="/welcome" element={<Welcome />} />
          <Route path="/auth" element={<AuthLogin />} />          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/profile" element={<Profile />} />
          </Route>          <Route path="*" element={<Navigate to="/welcome" replace />} />
        </Routes>
      </div>      {!hideHeaderFooter && <Footer />}
    </div>
  );
}
