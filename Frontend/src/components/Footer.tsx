import React from "react";
import { useNavigate } from "react-router-dom";

// Componente del pie de página de la aplicación
const Footer: React.FC = () => {
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-300">
      {/* Contenido principal del footer */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Columna de la marca */}
          <div className="lg:col-span-1">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2.5 group cursor-pointer mb-6"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[#E2725B] to-[#c95d47] rounded-xl flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-white text-xl">
                  storefront
                </span>
              </div>
              <span className="text-lg font-extrabold tracking-tight uppercase text-white group-hover:text-[#E2725B] transition-colors duration-300">
                Store
              </span>
            </button>
            <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
              Soluciones cerámicas de alta calidad para proyectos
              arquitectónicos contemporáneos. Más de 100 años de excelencia.
            </p>
            {/* Iconos de redes sociales */}
            <div className="flex gap-3 mt-6">
              {["public", "mail", "call"].map((icon) => (
                <button
                  key={icon}
                  className="w-10 h-10 bg-stone-800 hover:bg-[#E2725B] rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group/social"
                >
                  <span className="material-symbols-outlined text-stone-400 group-hover/social:text-white text-lg transition-colors">
                    {icon}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-6">
              Navegación
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Inicio", path: "/" },
                { label: "Catálogo", path: "/products" },
                { label: "Perfil", path: "/profile" },
              ].map(({ label, path }) => (
                <li key={path}>
                  <button
                    onClick={() => navigate(path)}
                    className="text-stone-400 hover:text-white transition-colors duration-200 text-sm font-medium flex items-center gap-2 group/link cursor-pointer"
                  >
                    <span className="w-0 group-hover/link:w-3 h-px bg-[#E2725B] transition-all duration-300" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-6">
              Soporte
            </h4>
            <ul className="space-y-3">
              {[
                "Centro de Ayuda",
                "Términos y Condiciones",
                "Política de Privacidad",
                "Devoluciones",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-stone-400 hover:text-white transition-colors duration-200 text-sm font-medium flex items-center gap-2 group/link"
                  >
                    <span className="w-0 group-hover/link:w-3 h-px bg-[#E2725B] transition-all duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-6">
              Contacto
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#E2725B] text-lg mt-0.5">
                  location_on
                </span>
                <p className="text-stone-400 text-sm leading-relaxed">
                  Calle Principal #123
                  <br />
                  Ciudad, Estado 12345
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#E2725B] text-lg">
                  call
                </span>
                <p className="text-stone-400 text-sm">+52 (123) 456-7890</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#E2725B] text-lg">
                  mail
                </span>
                <p className="text-stone-400 text-sm">info@store.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-6 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-stone-500 text-xs font-medium tracking-wide">
            © {currentYear} Store. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2 text-stone-600 text-xs">
            <span className="material-symbols-outlined text-sm">verified</span>
            <span className="font-medium">SSL Certificado · Pagos Seguros</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
