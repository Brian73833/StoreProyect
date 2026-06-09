import React, { useState } from "react";
import { registerUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { getPasswordStrength } from "../lib/utils";
import FieldError from "./FieldError";
import PasswordStrengthBar from "./PasswordStrengthBar";
import PasswordRequirements from "./PasswordRequirements";

interface RegisterFormProps {
  onSuccess: () => void;
}

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignUpErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

function validateSignUpForm(data: SignUpFormData): SignUpErrors {
  const errors: SignUpErrors = {};
  if (!data.name.trim()) errors.name = "El nombre es obligatorio.";
  else if (data.name.trim().length > 50) errors.name = "Máximo 50 caracteres.";

  if (!data.email.trim())
    errors.email = "El correo electrónico es obligatorio.";
  else if (!EMAIL_REGEX.test(data.email)) errors.email = "Correo inválido.";

  if (!data.password) errors.password = "La contraseña es obligatoria.";
  else if (!PASSWORD_REGEX.test(data.password))
    errors.password = "Debe ser más robusta.";

  if (!data.confirmPassword) errors.confirmPassword = "Confirma tu contraseña.";
  else if (data.password !== data.confirmPassword)
    errors.confirmPassword = "No coinciden.";

  return errors;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState<SignUpFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<SignUpErrors>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const passwordStrength = getPasswordStrength(formData.password);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof SignUpErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const valErrors = validateSignUpForm(formData);
    if (Object.keys(valErrors).length > 0) {
      setErrors(valErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const data = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      login(data);
      onSuccess();
    } catch (error: any) {
      setErrors({ general: error.message || "Error de conexión" });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (hasError: boolean, withRightPadding = false) =>
    `w-full pl-12 ${withRightPadding ? "pr-12" : "pr-4"} py-4 bg-stone-50 border-2 rounded-2xl focus:bg-white focus:ring-4 outline-none transition-all font-medium text-stone-800 placeholder:text-stone-300 ${hasError
      ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
      : "border-stone-100 focus:border-[#E2725B] focus:ring-[#E2725B]/5"
    }`;

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div className="space-y-1">
        <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-1">
          Nombre
        </label>
        <div className="group relative">
          <span
            className={`material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.name ? "text-red-400" : "text-stone-400 group-focus-within:text-[#E2725B]"}`}
          >
            person
          </span>
          <input
            data-cy="register-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={inputClass(!!errors.name)}
            placeholder="Juan Pérez"
          />
        </div>
        <FieldError message={errors.name} />
      </div>

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
            data-cy="register-email"
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
            data-cy="register-password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            className={inputClass(!!errors.password, true)}
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

        {(passwordFocused || formData.password) && (
          <PasswordStrengthBar strength={passwordStrength} />
        )}
        <FieldError message={errors.password} />
        {!errors.password && (
          <PasswordRequirements password={formData.password} />
        )}
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-1">
          Confirmar Contraseña
        </label>
        <div className="group relative">
          <span
            className={`material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.confirmPassword ? "text-red-400" : "text-stone-400 group-focus-within:text-[#E2725B]"}`}
          >
            lock
          </span>
          <input
            data-cy="register-confirm-password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            className={inputClass(!!errors.confirmPassword, true)}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
          >
            <span className="material-symbols-outlined text-xl">
              {showConfirmPassword ? "visibility_off" : "visibility"}
            </span>
          </button>
        </div>
        <FieldError message={errors.confirmPassword} />
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
        data-cy="register-submit"
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-[#E2725B] hover:bg-[#c95d47] disabled:opacity-60 text-white font-extrabold rounded-2xl shadow-xl transition-all active:scale-[0.98] uppercase tracking-widest text-sm flex items-center justify-center gap-2"
      >
        {loading ? "Creando cuenta…" : "Registrarse"}
      </button>
    </form>
  );
};

export default RegisterForm;
