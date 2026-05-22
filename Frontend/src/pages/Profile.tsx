import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { updateUser, deleteUser } from "../services/authService";
import { getPasswordStrength } from "../lib/utils";
import ChangePasswordForm from "../components/ChangePasswordForm";
import DeleteAccountForm from "../components/DeleteAccountForm";

// Componente de la página de perfil de usuario

export default function Profile() {
  const navigate = useNavigate();
  const { user, login, logout, isAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Estados para el modo de edición
  const [isEditing, setIsEditing] = useState(false);
  const [shouldChangePassword, setShouldChangePassword] = useState(false);

  // Estados para eliminar la cuenta
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const passwordStrength = getPasswordStrength(formData.newPassword);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setSuccess(null);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // If we were editing and click back/cancel, reset to user data
      if (user) {
        setFormData((prev) => ({
          ...prev,
          name: user.name,
          email: user.email,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
      }
      setIsEditing(false);
      setShouldChangePassword(false);
      setError(null);
      setSuccess(null);
    } else {
      setIsEditing(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    if (!user) return;

    if (shouldChangePassword) {
      if (!formData.currentPassword) {
        setError("Debes ingresar tu contraseña actual para cambiarla");
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        setError("Las contraseñas nuevas no coinciden");
        return;
      }
      if (formData.newPassword.length < 8) {
        setError("La nueva contraseña debe tener al menos 8 caracteres");
        return;
      }
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const updatedUser = await updateUser(user.userResourceId, {
        name: formData.name,
        email: formData.email,
        currentPassword: shouldChangePassword
          ? formData.currentPassword
          : undefined,
        newPassword: shouldChangePassword ? formData.newPassword : undefined,
      });

      login(updatedUser);
      setSuccess("Información actualizada correctamente");
      setIsEditing(false);
      setShouldChangePassword(false);
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (err: any) {
      setError(err.message || "Error al actualizar el perfil");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !deletePassword) return;

    setDeleteLoading(true);
    setDeleteError(null);

    try {
      await deleteUser(user.userResourceId, deletePassword);
      logout();
      navigate("/");
    } catch (err: any) {
      setDeleteError(err.message || "Error al eliminar la cuenta");
    } finally {
      setDeleteLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <span className="material-symbols-outlined text-stone-300 text-6xl">
          person_off
        </span>
        <p className="text-stone-500 font-medium">
          Por favor inicia sesión para ver tu perfil.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Botón para volver al inicio */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-stone-500 hover:text-[#E2725B] font-semibold transition-colors duration-200 group"
        >
          <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform duration-200">
            arrow_back
          </span>
          Volver al inicio
        </button>
      </div>
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-stone-200/50 overflow-hidden border border-stone-100">
        {/* Sección de encabezado */}
        <div className="bg-gradient-to-br from-[#E2725B] to-[#c95d47] px-8 py-14 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl"></div>

          <div className="relative flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
            <div className="bg-white/20 p-1 rounded-3xl backdrop-blur-md shadow-inner">
              <div className="w-24 h-24 md:w-28 md:h-28 bg-white rounded-[1.25rem] flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-[#E2725B] text-5xl md:text-6xl font-light">
                  person
                </span>
              </div>
            </div>
            <div className="pb-2">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                {user.name}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-2 opacity-90">
                <span className="material-symbols-outlined text-lg">mail</span>
                <p className="font-medium text-sm md:text-base">{user.email}</p>
              </div>
              {isAdmin && (
                <div className="inline-flex items-center gap-1.5 mt-4 px-4 py-1.5 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-sm border border-white/30">
                  <span className="material-symbols-outlined text-xs">
                    verified_user
                  </span>
                  Administrador
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 md:p-14 space-y-10">
          {/* Formulario principal del perfil */}
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {/* Información Personal */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center border border-stone-100 text-[#E2725B]">
                    <span className="material-symbols-outlined font-light">
                      account_circle
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-stone-800 tracking-tight">
                    Información Básica
                  </h2>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-400 uppercase tracking-widest ml-1">
                      Nombre Completo
                    </label>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-stone-400 group-focus-within:text-[#E2725B] transition-colors duration-300">
                        person
                      </span>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full pl-12 pr-4 py-4 border rounded-2xl outline-none transition-all duration-300 font-medium ${
                          isEditing
                            ? "bg-stone-50 border-stone-200 focus:ring-4 focus:ring-[#E2725B]/5 focus:border-[#E2725B] text-stone-700"
                            : "bg-stone-100/50 border-transparent text-stone-500 cursor-not-allowed"
                        }`}
                        placeholder="Tu nombre"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-400 uppercase tracking-widest ml-1">
                      Correo Electrónico
                    </label>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-stone-400 group-focus-within:text-[#E2725B] transition-colors duration-300">
                        mail
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full pl-12 pr-4 py-4 border rounded-2xl outline-none transition-all duration-300 font-medium ${
                          isEditing
                            ? "bg-stone-50 border-stone-200 focus:ring-4 focus:ring-[#E2725B]/5 focus:border-[#E2725B] text-stone-700"
                            : "bg-stone-100/50 border-transparent text-stone-500 cursor-not-allowed"
                        }`}
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Gestión de la Cuenta */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center border border-stone-100 text-[#E2725B]">
                    <span className="material-symbols-outlined font-light">
                      manage_accounts
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-stone-800 tracking-tight">
                    Gestionar cuenta
                  </h2>
                </div>

                <div className="space-y-5">
                  {!isEditing && (
                    <div className="flex flex-col gap-4 animate-in fade-in duration-300 h-full justify-center">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full group relative flex items-center justify-center gap-3 px-10 py-4 font-bold rounded-2xl active:scale-[0.98] disabled:opacity-50 transition-all duration-300 shadow-xl bg-[#E2725B] text-white hover:bg-[#c95d47] shadow-[#E2725B]/20"
                      >
                        <span className="material-symbols-outlined group-hover:rotate-12 transition-transform duration-300">
                          edit_note
                        </span>
                        Modificar información
                      </button>

                      <DeleteAccountForm
                        showDeleteForm={showDeleteForm}
                        setShowDeleteForm={setShowDeleteForm}
                        deletePassword={deletePassword}
                        setDeletePassword={setDeletePassword}
                        handleDeleteAccount={handleDeleteAccount}
                        deleteLoading={deleteLoading}
                        deleteError={deleteError}
                        setDeleteError={setDeleteError}
                      />
                    </div>
                  )}

                  {isEditing && (
                    <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 space-y-3 animate-in fade-in slide-in-from-top-4 duration-300">
                      <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                        ¿Cambiar contraseña?
                      </p>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="radio"
                            name="changePassword"
                            checked={!shouldChangePassword}
                            onChange={() => setShouldChangePassword(false)}
                            className="w-4 h-4 accent-[#E2725B]"
                          />
                          <span className="text-sm font-bold text-stone-600 group-hover:text-[#E2725B] transition-colors">
                            No
                          </span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="radio"
                            name="changePassword"
                            checked={shouldChangePassword}
                            onChange={() => setShouldChangePassword(true)}
                            className="w-4 h-4 accent-[#E2725B]"
                          />
                          <span className="text-sm font-bold text-stone-600 group-hover:text-[#E2725B] transition-colors">
                            Sí
                          </span>
                        </label>
                      </div>
                    </div>
                  )}

                  {isEditing && shouldChangePassword && (
                    <ChangePasswordForm
                      formData={formData}
                      handleChange={handleChange}
                      passwordStrength={passwordStrength}
                    />
                  )}

                  {isEditing && (
                    <div className="flex items-center gap-4 pt-2 animate-in fade-in duration-300">
                      <button
                        type="button"
                        onClick={handleEditToggle}
                        className="flex-1 px-6 py-4 bg-stone-100 text-stone-600 font-bold rounded-2xl hover:bg-stone-200 active:scale-[0.98] transition-all duration-300"
                      >
                        Volver
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-[2] group relative flex items-center justify-center gap-3 px-8 py-4 font-bold rounded-2xl active:scale-[0.98] disabled:opacity-50 transition-all duration-300 shadow-xl bg-stone-900 text-white hover:bg-stone-800 shadow-stone-900/10"
                      >
                        {loading ? (
                          <>
                            <span className="material-symbols-outlined animate-spin">
                              progress_activity
                            </span>
                            Guardando...
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined group-hover:rotate-12 transition-transform duration-300">
                              save
                            </span>
                            Guardar
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Notificaciones */}
            {(error || success) && (
              <div className="min-h-[60px] animate-in fade-in slide-in-from-top-2 duration-300">
                {error && (
                  <div className="flex items-center gap-4 p-5 bg-red-50 border border-red-100 text-red-600 rounded-[1.5rem]">
                    <span className="material-symbols-outlined">error</span>
                    <p className="text-sm font-bold">{error}</p>
                  </div>
                )}

                {success && (
                  <div className="flex items-center gap-4 p-5 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-[1.5rem]">
                    <span className="material-symbols-outlined">
                      check_circle
                    </span>
                    <p className="text-sm font-bold">{success}</p>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
