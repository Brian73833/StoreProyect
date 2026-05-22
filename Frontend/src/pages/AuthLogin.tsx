import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authHero from "../assets/auth-hero.png";
import { useAuth } from "../context/AuthContext";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const AuthLogin: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleAuthSuccess = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full flex bg-[#FDFCFB]">
      {/* Sección de presentación visual */}
      <div className="hidden lg:block lg:w-1/2 relative h-screen sticky top-0 overflow-hidden">
        <img
          src={authHero}
          alt="Auth Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
        <div className="relative z-10 p-16 flex flex-col justify-start items-start h-full text-white">
          <div className="flex flex-row items-center gap-3 mb-8">
            <div className="w-16 h-16 bg-[#E2725B] rounded-2xl flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-white text-3xl">
                storefront
              </span>
            </div>
            <span className="text-3xl font-extrabold tracking-tight uppercase">
              Store
            </span>
          </div>
          <div className="max-w-xl text-left">
            <h1 className="text-4xl font-extrabold leading-tight mb-6">
              Descubre un mundo de exclusividad.
            </h1>
            <p className="text-base text-white/90 font-medium leading-relaxed">
              Únete a nuestra comunidad y disfruta de una experiencia de compra
              única con productos seleccionados especialmente para ti.
            </p>
          </div>
        </div>
      </div>

      {/* Sección del formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-16 bg-white overflow-y-auto min-h-screen">
        <div className="w-full max-w-[480px]">
          {/* Botón para volver */}
          <button
            onClick={() => navigate("/welcome")}
            className="flex items-center gap-2 text-stone-500 hover:text-[#E2725B] transition-colors mb-8 group"
          >
            <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">
              arrow_back
            </span>
            <span className="font-bold text-sm uppercase tracking-widest">
              Volver
            </span>
          </button>

          {/* Logo en versión móvil */}
          <div className="flex lg:hidden items-center gap-2 mb-12">
            <div className="w-10 h-10 bg-[#E2725B] rounded-xl flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-white">
                storefront
              </span>
            </div>
            <span className="text-xl font-extrabold tracking-tight uppercase text-stone-800">
              Store
            </span>
          </div>

          {/* Encabezado */}
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-stone-900 mb-2">
              {activeTab === "login"
                ? "¡Bienvenido de nuevo!"
                : "Crea tu cuenta"}
            </h2>
            <p className="text-stone-500 font-medium">
              {activeTab === "login"
                ? "Ingresa tus credenciales para acceder a tu cuenta."
                : "Regístrate para comenzar tu experiencia premium."}
            </p>
          </div>

          {/* Tabs de Iniciar sesión / Registrarse */}
          <div className="flex p-1 bg-stone-100 rounded-2xl mb-10 relative">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 relative z-10 ${
                activeTab === "login"
                  ? "text-stone-900"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 relative z-10 ${
                activeTab === "register"
                  ? "text-stone-900"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              Registrarse
            </button>
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-xl shadow-sm transition-all duration-300 ease-out ${
                activeTab === "login" ? "left-1" : "left-[calc(50%+2px)]"
              }`}
            />
          </div>

          {activeTab === "login" ? (
            <LoginForm onSuccess={handleAuthSuccess} />
          ) : (
            <RegisterForm onSuccess={handleAuthSuccess} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;
