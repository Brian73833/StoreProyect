import React, { useState } from "react";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import FieldError from "./FieldError";

interface LoginFormProps {
  onSuccess: () => void;
}

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
  general?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof LoginErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const data = await loginUser(formData);
      login(data);
      onSuccess();
    } catch (error: any) {
      setErrors({ general: error.message || "Error de conexión" });
    } finally {
      setLoading(false);
    }
  };

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
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div className="space-y-1">
        <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-1">
          Correo Electrónico
        </label>
        <div className="group relative">
          <span
            className={`material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.email ? "text-red-400" : "text-stone-400 group-focus-within:text-[#E2725B]"}`}
          >
            mail
          </span>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClass(!!errors.email)}
            placeholder="ejemplo@correo.com"
          />
        </div>
        <FieldError message={errors.email} />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-1">
          Contraseña
        </label>
        <div className="group relative">
          <span
            className={`material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.password ? "text-red-400" : "text-stone-400 group-focus-within:text-[#E2725B]"}`}
          >
            lock
          </span>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            className={inputClassPassword(!!errors.password)}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
          >
            <span className="material-symbols-outlined text-xl">
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </button>
        </div>
        <FieldError message={errors.password} />
      </div>

      {errors.general && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <span className="material-symbols-outlined text-red-500 text-xl shrink-0">
            warning
          </span>
          <p className="text-red-600 text-sm font-semibold">{errors.general}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-[#E2725B] hover:bg-[#c95d47] disabled:opacity-60 text-white font-extrabold rounded-2xl shadow-xl transition-all active:scale-[0.98] uppercase tracking-widest text-sm flex items-center justify-center gap-2"
      >
        {loading ? "Verificando…" : "Entrar al Sistema"}
      </button>
    </form>
  );
};

export default LoginForm;
