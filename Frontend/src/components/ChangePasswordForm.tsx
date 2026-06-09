import React from "react";
import PasswordStrengthBar from "./PasswordStrengthBar";
import PasswordRequirements from "./PasswordRequirements";
import type { PasswordStrength } from "../lib/utils";

interface ChangePasswordFormProps {
  formData: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordStrength: PasswordStrength;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  formData,
  handleChange,
  passwordStrength,
}) => {
  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="space-y-2">
        <label className="text-xs font-bold text-stone-400 uppercase tracking-widest ml-1">
          Contraseña Actual
        </label>
        <div className="relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-stone-400 group-focus-within:text-[#E2725B] transition-colors duration-300">
            password
          </span>
          <input
            data-cy="profile-current-password"
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-4 focus:ring-[#E2725B]/5 focus:border-[#E2725B] outline-none transition-all duration-300 font-medium text-stone-700"
            placeholder="••••••••"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-stone-400 uppercase tracking-widest ml-1">
          Nueva Contraseña
        </label>
        <div className="relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-stone-400 group-focus-within:text-[#E2725B] transition-colors duration-300">
            lock_reset
          </span>
          <input
            data-cy="profile-new-password"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-4 focus:ring-[#E2725B]/5 focus:border-[#E2725B] outline-none transition-all duration-300 font-medium text-stone-700"
            placeholder="Mínimo 8 caracteres"
          />
        </div>

        {formData.newPassword && (
          <PasswordStrengthBar strength={passwordStrength} />
        )}

        {formData.newPassword && (
          <PasswordRequirements password={formData.newPassword} />
        )}
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-stone-400 uppercase tracking-widest ml-1">
          Confirmar Nueva Contraseña
        </label>
        <div className="relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-stone-400 group-focus-within:text-[#E2725B] transition-colors duration-300">
            verified
          </span>
          <input
            data-cy="profile-confirm-password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-4 focus:ring-[#E2725B]/5 focus:border-[#E2725B] outline-none transition-all duration-300 font-medium text-stone-700"
            placeholder="Repite la nueva contraseña"
          />
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
