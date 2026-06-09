import React from "react";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();



  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-900/60 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-dark/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="flex flex-col space-y-6">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2.5 group cursor-pointer self-start"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
                <span className="material-symbols-outlined text-white text-xl">
                  storefront
                </span>
              </div>
              <span className="text-lg font-extrabold tracking-tight uppercase text-white group-hover:text-primary transition-colors duration-300">
                Store
              </span>
            </button>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              Soluciones cerámicas de alta calidad para proyectos arquitectónicos contemporáneos. Elevando la estética y durabilidad de tus espacios.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-stone-900 border border-stone-800/80 flex items-center justify-center text-stone-400 hover:text-white hover:bg-primary hover:border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H7v3h2v9h3v-9h2.72l.42-3H12V6.5c0-.86.22-1.42 1.48-1.42H15V2.12c-.28-.04-1.23-.12-2.33-.12C10.38 2 8.7 3.39 8.7 5.88V8z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-stone-900 border border-stone-800/80 flex items-center justify-center text-stone-400 hover:text-white hover:bg-primary hover:border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://wa.me/521234567890"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-stone-900 border border-stone-800/80 flex items-center justify-center text-stone-400 hover:text-white hover:bg-primary hover:border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20"
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.858.002-2.634-1.02-5.11-2.881-6.974-1.86-1.863-4.332-2.887-6.969-2.889-5.441 0-9.865 4.42-9.869 9.86-.001 1.776.467 3.51 1.358 5.048L1.93 21.057l4.717-1.903zm11.96-6.195c-.322-.162-1.91-.942-2.206-1.05-.297-.108-.513-.162-.73.162-.215.322-.835 1.05-.1.162-.215-.322-.835 1.05-1.02 1.266-.188.216-.375.243-.697.08-.322-.162-1.358-.5-2.587-1.597-.957-.854-1.602-1.91-1.79-2.233-.187-.323-.02-.497.14-.658.146-.145.323-.376.485-.565.16-.188.215-.323.323-.538.107-.215.053-.404-.026-.566-.08-.162-.73-1.758-1.002-2.41-.264-.635-.532-.549-.73-.559-.188-.01-.404-.012-.62-.012-.215 0-.566.08-.863.404-.297.323-1.132 1.106-1.132 2.697 0 1.59 1.159 3.125 1.32 3.34.162.216 2.28 3.483 5.525 4.883.772.333 1.374.53 1.843.68.775.246 1.48.212 2.037.129.62-.093 1.91-.78 2.18-1.535.27-.756.27-1.402.188-1.536-.08-.135-.297-.216-.619-.378z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex flex-col space-y-6 lg:pl-8">
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest">
              Navegación
            </h4>
            <ul className="space-y-3.5">
              {[
                { label: "Home", path: "/" },
                { label: "Catálogo", path: "/products" },
                { label: "Perfil", path: "/profile" },
              ].map(({ label, path }) => (
                <li key={path}>
                  <button
                    onClick={() => navigate(path)}
                    className="text-stone-400 hover:text-white transition-all duration-300 text-sm font-medium flex items-center gap-2 group/link cursor-pointer hover:translate-x-1"
                  >
                    <span className="w-0 group-hover/link:w-3 h-px bg-primary transition-all duration-300" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col space-y-6">
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest">
              Contacto
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5 group-hover:scale-110 transition-transform duration-200">
                  location_on
                </span>
                <p className="text-stone-400 text-sm leading-relaxed group-hover:text-stone-300 transition-colors duration-200">
                  Calle Principal #123
                  <br />
                  Ciudad, Estado 12345
                </p>
              </div>
              <div className="flex items-center gap-3 group">
                <span className="material-symbols-outlined text-primary text-lg group-hover:scale-110 transition-transform duration-200">
                  call
                </span>
                <p className="text-stone-400 text-sm group-hover:text-stone-300 transition-colors duration-200">
                  +52 (123) 456-7890
                </p>
              </div>
              <div className="flex items-center gap-3 group">
                <span className="material-symbols-outlined text-primary text-lg group-hover:scale-110 transition-transform duration-200">
                  mail
                </span>
                <p className="text-stone-400 text-sm group-hover:text-stone-300 transition-colors duration-200">
                  info@store.com
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest">
              Novedades
            </h4>
            <div className="space-y-3">
              <p className="text-stone-400 text-sm leading-relaxed">
                Suscríbete para recibir noticias, ofertas y lanzamientos de nuevas colecciones cerámicas.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-900 bg-stone-950/80 backdrop-blur-md relative z-10">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-stone-500 text-xs font-medium tracking-wide">
            © {currentYear} Store. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6 text-xs text-stone-500 font-medium">
            <a className="hover:text-white transition-colors duration-200">
              Política de Privacidad
            </a>
            <a className="hover:text-white transition-colors duration-200">
              Términos de Servicio
            </a>
          </div>
        </div>
      </div>
    </footer >
  );
};

export default Footer;
