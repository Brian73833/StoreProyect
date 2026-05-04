import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authHero from "../assets/auth-hero.png";
import { loginUser, registerUser } from "../services/authService";
import type { User } from "../lib/types";
import { useAuth } from "../context/AuthContext";
import { getPasswordStrength } from "../lib/utils";
import FieldError from "../components/FieldError";

// Interfaces
interface LoginFormData {
  email: string;
  password: string;
}

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
  general?: string;
}

interface SignUpErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

// Validadores
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

function validateLoginForm(data: LoginFormData): LoginErrors {
  const errors: LoginErrors = {};

  if (!data.email.trim()) {
    errors.email = "El correo electrónico es obligatorio.";
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = "Ingresa un correo electrónico válido.";
  }

  if (!data.password) {
    errors.password = "La contraseña es obligatoria.";
  }

  return errors;
}

function validateSignUpForm(data: SignUpFormData): SignUpErrors {
  const errors: SignUpErrors = {};

  if (!data.name.trim()) {
    errors.name = "El nombre es obligatorio.";
  } else if (data.name.trim().length > 50) {
    errors.name = "El nombre no puede superar los 50 caracteres.";
  }

  if (!data.email.trim()) {
    errors.email = "El correo electrónico es obligatorio.";
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = "Ingresa un correo electrónico válido.";
  }

  if (!data.password) {
    errors.password = "La contraseña es obligatoria.";
  } else if (!PASSWORD_REGEX.test(data.password)) {
    errors.password =
      "Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.";
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = "Debes confirmar tu contraseña.";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden.";
  }

  return errors;
}

// Componente
const AuthLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  // Redirigir si el usuario ya inició sesión
  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  // Estado del inicio de sesión
  const [loginData, setLoginData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState<LoginErrors>({});
  const [loginLoading, setLoginLoading] = useState(false);

  // Estado del registro
  const [signUpData, setSignUpData] = useState<SignUpFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [signUpErrors, setSignUpErrors] = useState<SignUpErrors>({});
  const [signUpLoading, setSignUpLoading] = useState(false);

  const passwordStrength = getPasswordStrength(signUpData.password);

  // ─── Handlers ───────────────────────────────────────────────────────────────
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (loginErrors[name as keyof LoginErrors]) {
      setLoginErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (signUpErrors[name as keyof SignUpErrors]) {
      setSignUpErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateLoginForm(loginData);
    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      return;
    }
    setLoginErrors({});
    setLoginLoading(true);
    try {
      const data: User = await loginUser({
        email: loginData.email,
        password: loginData.password,
      });
      login(data);
      navigate("/");
    } catch (error: any) {
      console.error("Error en el login:", error);
      setLoginErrors({
        general: error.message || "Error de conexión con el servidor",
      });
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateSignUpForm(signUpData);
    if (Object.keys(errors).length > 0) {
      setSignUpErrors(errors);
      return;
    }
    setSignUpErrors({});
    setSignUpLoading(true);
    try {
      const data: User = await registerUser({
        name: signUpData.name,
        email: signUpData.email,
        password: signUpData.password,
      });
      login(data);
      navigate("/");
    } catch (error: any) {
      console.error("Error en el registro:", error);
      setSignUpErrors({
        general: error.message || "Error de conexión con el servidor",
      });
    } finally {
      setSignUpLoading(false);
    }
  };

  // Función auxiliar de los inputs
  const inputClass = (hasError: boolean) =>
    `w-full pl-12 pr-4 py-4 bg-stone-50 border-2 rounded-2xl focus:bg-white focus:ring-4 outline-none transition-all font-medium text-stone-800 placeholder:text-stone-300 ${
      hasError
        ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
        : "border-stone-100 focus:border-[#E2725B] focus:ring-[#E2725B]/5"
    }`;

  const inputClassPassword = (hasError: boolean) =>
    `w-full pl-12 pr-12 py-4 bg-stone-50 border-2 rounded-2xl focus:bg-white focus:ring-4 outline-none transition-all font-medium text-stone-800 placeholder:text-stone-300 ${
      hasError
        ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
        : "border-stone-100 focus:border-[#E2725B] focus:ring-[#E2725B]/5"
    }`;

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

          {/* FORMULARIO DE INICIO DE SESIÓN   */}
          {activeTab === "login" ? (
            <form className="space-y-5" onSubmit={handleLoginSubmit} noValidate>
              {/* Correo Electrónico */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-1">
                  Correo Electrónico
                </label>
                <div className="group relative">
                  <span
                    className={`material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                      loginErrors.email
                        ? "text-red-400"
                        : "text-stone-400 group-focus-within:text-[#E2725B]"
                    }`}
                  >
                    mail
                  </span>
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    className={inputClass(!!loginErrors.email)}
                    placeholder="ejemplo@correo.com"
                    autoComplete="email"
                  />
                </div>
                <FieldError message={loginErrors.email} />
              </div>

              {/* Contraseña */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-1">
                  Contraseña
                </label>
                <div className="group relative">
                  <span
                    className={`material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                      loginErrors.password
                        ? "text-red-400"
                        : "text-stone-400 group-focus-within:text-[#E2725B]"
                    }`}
                  >
                    lock
                  </span>
                  <input
                    id="login-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={loginData.password}
                    onChange={handleLoginChange}
                    className={inputClassPassword(!!loginErrors.password)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
                <FieldError message={loginErrors.password} />
              </div>

              {/* Error general del inicio de sesión */}
              {loginErrors.general && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <span className="material-symbols-outlined text-red-500 text-xl shrink-0">
                    warning
                  </span>
                  <p className="text-red-600 text-sm font-semibold">
                    {loginErrors.general}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-4 bg-[#E2725B] hover:bg-[#c95d47] disabled:opacity-60 disabled:cursor-not-allowed text-white font-extrabold rounded-2xl shadow-xl shadow-[#E2725B]/20 hover:shadow-2xl hover:shadow-[#E2725B]/30 transition-all active:scale-[0.98] uppercase tracking-widest text-sm flex items-center justify-center gap-2"
              >
                {loginLoading ? (
                  <>
                    <span className="material-symbols-outlined text-xl animate-spin">
                      progress_activity
                    </span>
                    Verificando…
                  </>
                ) : (
                  "Entrar al Sistema"
                )}
              </button>
            </form>
          ) : (
            /* FORMULARIO DE REGISTRO */
            <form
              className="space-y-5"
              onSubmit={handleRegisterSubmit}
              noValidate
            >
              {/* Nombre */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-1">
                  Nombre
                </label>
                <div className="group relative">
                  <span
                    className={`material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                      signUpErrors.name
                        ? "text-red-400"
                        : "text-stone-400 group-focus-within:text-[#E2725B]"
                    }`}
                  >
                    person
                  </span>
                  <input
                    id="register-name"
                    name="name"
                    type="text"
                    value={signUpData.name}
                    onChange={handleSignUpChange}
                    className={inputClass(!!signUpErrors.name)}
                    placeholder="Juan Pérez"
                    maxLength={50}
                    autoComplete="name"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <FieldError message={signUpErrors.name} />
                  <span
                    className={`text-xs ml-auto mr-1 font-medium ${
                      signUpData.name.length > 45
                        ? "text-red-400"
                        : "text-stone-400"
                    }`}
                  >
                    {signUpData.name.length}/50
                  </span>
                </div>
              </div>

              {/* Correo Electrónico */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-1">
                  Correo Electrónico
                </label>
                <div className="group relative">
                  <span
                    className={`material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                      signUpErrors.email
                        ? "text-red-400"
                        : "text-stone-400 group-focus-within:text-[#E2725B]"
                    }`}
                  >
                    mail
                  </span>
                  <input
                    id="register-email"
                    name="email"
                    type="email"
                    value={signUpData.email}
                    onChange={handleSignUpChange}
                    className={inputClass(!!signUpErrors.email)}
                    placeholder="ejemplo@correo.com"
                    autoComplete="email"
                  />
                </div>
                <FieldError message={signUpErrors.email} />
              </div>

              {/* Contraseña */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-1">
                  Contraseña
                </label>
                <div className="group relative">
                  <span
                    className={`material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                      signUpErrors.password
                        ? "text-red-400"
                        : "text-stone-400 group-focus-within:text-[#E2725B]"
                    }`}
                  >
                    lock
                  </span>
                  <input
                    id="register-password"
                    name="password"
                    type={showRegisterPassword ? "text" : "password"}
                    value={signUpData.password}
                    onChange={handleSignUpChange}
                    className={inputClassPassword(!!signUpErrors.password)}
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowRegisterPassword(!showRegisterPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">
                      {showRegisterPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>

                {/* Barra de seguridad de la contraseña */}
                {signUpData.password && (
                  <div className="mt-2 space-y-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className="h-1 flex-1 rounded-full transition-all duration-300"
                          style={{
                            backgroundColor:
                              level <= passwordStrength.score
                                ? passwordStrength.color
                                : "#e7e5e4",
                          }}
                        />
                      ))}
                    </div>
                    <p
                      className="text-xs font-semibold ml-1"
                      style={{ color: passwordStrength.color }}
                    >
                      {passwordStrength.label}
                    </p>
                  </div>
                )}

                <FieldError message={signUpErrors.password} />

                {/* Sugerencias de requisitos de la contraseña */}
                {!signUpErrors.password && (
                  <ul className="mt-2 space-y-0.5 ml-1">
                    {[
                      { regex: /.{8,}/, text: "Mínimo 8 caracteres" },
                      { regex: /[A-Z]/, text: "Una letra mayúscula" },
                      { regex: /[a-z]/, text: "Una letra minúscula" },
                      { regex: /\d/, text: "Un número" },
                      { regex: /[\W_]/, text: "Un carácter especial (!@#$…)" },
                    ].map(({ regex, text }) => {
                      const met = regex.test(signUpData.password);
                      return (
                        <li
                          key={text}
                          className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                            met ? "text-green-600" : "text-stone-400"
                          }`}
                        >
                          <span className="material-symbols-outlined text-sm leading-none">
                            {met ? "check_circle" : "radio_button_unchecked"}
                          </span>
                          {text}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* Confirmar Contraseña */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-1">
                  Confirmar Contraseña
                </label>
                <div className="group relative">
                  <span
                    className={`material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                      signUpErrors.confirmPassword
                        ? "text-red-400"
                        : "text-stone-400 group-focus-within:text-[#E2725B]"
                    }`}
                  >
                    lock
                  </span>
                  <input
                    id="register-confirm-password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={signUpData.confirmPassword}
                    onChange={handleSignUpChange}
                    className={inputClassPassword(
                      !!signUpErrors.confirmPassword,
                    )}
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">
                      {showConfirmPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>

                {/* Indicador de que las contraseñas coinciden */}
                {signUpData.confirmPassword &&
                  !signUpErrors.confirmPassword && (
                    <p className="flex items-center gap-1 text-green-600 text-xs font-semibold mt-1 ml-1">
                      <span className="material-symbols-outlined text-sm leading-none">
                        check_circle
                      </span>
                      Las contraseñas coinciden
                    </p>
                  )}
                <FieldError message={signUpErrors.confirmPassword} />
              </div>

              {/* Error general del registro */}
              {signUpErrors.general && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <span className="material-symbols-outlined text-red-500 text-xl shrink-0">
                    warning
                  </span>
                  <p className="text-red-600 text-sm font-semibold">
                    {signUpErrors.general}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={signUpLoading}
                className="w-full py-4 bg-[#E2725B] hover:bg-[#c95d47] disabled:opacity-60 disabled:cursor-not-allowed text-white font-extrabold rounded-2xl shadow-xl shadow-[#E2725B]/20 hover:shadow-2xl hover:shadow-[#E2725B]/30 transition-all active:scale-[0.98] uppercase tracking-widest text-sm flex items-center justify-center gap-2"
              >
                {signUpLoading ? (
                  <>
                    <span className="material-symbols-outlined text-xl animate-spin">
                      progress_activity
                    </span>
                    Creando cuenta…
                  </>
                ) : (
                  "Registrarse"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;
