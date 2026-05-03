import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authService";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();
  const userName = user?.name || "Usuario";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Error logging out:", err);
    }
    logout();
    setMenuOpen(false);
    navigate("/welcome");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-stone-200/60 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-[72px]">
          {/* Logo + Store Name */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer"
            id="header-logo"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#E2725B] to-[#c95d47] rounded-xl flex items-center justify-center shadow-lg shadow-[#E2725B]/20 group-hover:shadow-xl group-hover:shadow-[#E2725B]/30 transition-all duration-300 group-hover:scale-105">
              <span className="material-symbols-outlined text-white text-lg sm:text-xl">
                storefront
              </span>
            </div>
            <span className="text-base sm:text-xl font-extrabold tracking-tight uppercase text-stone-800 group-hover:text-[#E2725B] transition-colors duration-300">
              Store
            </span>
          </button>

          {/* Desktop Navigation */}
          {isLoggedIn && (
            <nav className="hidden md:flex items-center gap-1 bg-stone-100/50 p-1.5 rounded-2xl border border-stone-200/50">
              <button
                onClick={() => navigate("/")}
                className="px-5 py-2 text-sm font-bold text-stone-600 hover:text-[#E2725B] hover:bg-white rounded-xl transition-all duration-300 active:scale-95"
              >
                Home
              </button>
              <button
                onClick={() => navigate("/products")}
                className="px-5 py-2 text-sm font-bold text-stone-600 hover:text-[#E2725B] hover:bg-white rounded-xl transition-all duration-300 active:scale-95"
              >
                Catálogo
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="px-5 py-2 text-sm font-bold text-stone-600 hover:text-[#E2725B] hover:bg-white rounded-xl transition-all duration-300 active:scale-95"
              >
                Perfil
              </button>
            </nav>
          )}

          {/* Right Side */}
          {!isLoggedIn ? (
            /* Login Button */
            <button
              onClick={() => navigate("/auth")}
              id="header-login-btn"
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-[#E2725B] to-[#d4634e] text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-[#E2725B]/20 hover:shadow-xl hover:shadow-[#E2725B]/30 hover:scale-105 active:scale-[0.98] transition-all duration-300 uppercase tracking-wider"
            >
              <span className="material-symbols-outlined text-base sm:text-lg">login</span>
              <span className="hidden sm:inline">Iniciar Sesión</span>
            </button>
          ) : (
            /* Hamburger Menu */
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                id="header-hamburger-btn"
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                  menuOpen
                    ? "bg-stone-100 text-[#E2725B]"
                    : "text-stone-600 hover:bg-stone-50 hover:text-stone-800"
                }`}
              >
                {/* User avatar circle */}
                <div className="w-8 h-8 bg-gradient-to-br from-[#E2725B] to-[#c95d47] rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                  {userName.charAt(0).toUpperCase()}
                </div>
                {/* Hamburger icon with animation */}
                <div className="flex flex-col gap-[5px] w-5">
                  <span
                    className={`block h-[2px] bg-current rounded-full transition-all duration-300 origin-center ${
                      menuOpen ? "rotate-45 translate-y-[7px]" : ""
                    }`}
                  />
                  <span
                    className={`block h-[2px] bg-current rounded-full transition-all duration-300 ${
                      menuOpen ? "opacity-0 scale-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`block h-[2px] bg-current rounded-full transition-all duration-300 origin-center ${
                      menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl shadow-stone-900/10 border border-stone-100 overflow-hidden transition-all duration-300 origin-top-right ${
                  menuOpen
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
              >
                {/* User Info Header */}
                <div className="px-5 py-4 bg-gradient-to-r from-stone-50 to-stone-100/50 border-b border-stone-100">
                  <p className="text-sm font-bold text-stone-800 truncate">
                    {userName}
                  </p>
                  <p className="text-xs text-stone-400 font-medium mt-0.5">
                    Sesión activa
                  </p>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/");
                    }}
                    id="header-menu-home"
                    className="w-full flex items-center gap-3 px-5 py-3 text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-all duration-200 group"
                  >
                    <span className="material-symbols-outlined text-xl text-stone-400 group-hover:text-[#E2725B] transition-colors">
                      home
                    </span>
                    <span className="text-sm font-semibold">Home</span>
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/profile");
                    }}
                    id="header-menu-perfil"
                    className="w-full flex items-center gap-3 px-5 py-3 text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-all duration-200 group"
                  >
                    <span className="material-symbols-outlined text-xl text-stone-400 group-hover:text-[#E2725B] transition-colors">
                      person
                    </span>
                    <span className="text-sm font-semibold">Perfil</span>
                  </button>

                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/products");
                    }}
                    id="header-menu-catalogo"
                    className="w-full flex items-center gap-3 px-5 py-3 text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-all duration-200 group"
                  >
                    <span className="material-symbols-outlined text-xl text-stone-400 group-hover:text-[#E2725B] transition-colors">
                      inventory_2
                    </span>
                    <span className="text-sm font-semibold">Catálogo</span>
                  </button>

                  <div className="mx-4 my-1 border-t border-stone-100" />

                  <button
                    onClick={handleLogout}
                    id="header-menu-logout"
                    className="w-full flex items-center gap-3 px-5 py-3 text-red-500 hover:text-red-600 hover:bg-red-50/50 transition-all duration-200 group"
                  >
                    <span className="material-symbols-outlined text-xl group-hover:translate-x-0.5 transition-transform">
                      logout
                    </span>
                    <span className="text-sm font-semibold">Cerrar Sesión</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
