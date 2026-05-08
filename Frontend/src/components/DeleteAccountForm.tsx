import React from "react";

interface DeleteAccountFormProps {
  showDeleteForm: boolean;
  setShowDeleteForm: (show: boolean) => void;
  deletePassword: string;
  setDeletePassword: (password: string) => void;
  handleDeleteAccount: (e: React.FormEvent) => void;
  deleteLoading: boolean;
  deleteError: string | null;
  setDeleteError: (error: string | null) => void;
}

const DeleteAccountForm: React.FC<DeleteAccountFormProps> = ({
  showDeleteForm,
  setShowDeleteForm,
  deletePassword,
  setDeletePassword,
  handleDeleteAccount,
  deleteLoading,
  deleteError,
  setDeleteError,
}) => {
  if (!showDeleteForm) {
    return (
      <button
        type="button"
        onClick={() => setShowDeleteForm(true)}
        className="w-full flex justify-center items-center gap-2 px-6 py-4 bg-red-50 text-red-600 hover:bg-red-100 font-bold rounded-2xl transition-all duration-300 active:scale-[0.98] group"
      >
        <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform">
          delete_forever
        </span>
        Eliminar cuenta
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-top-4 duration-300 bg-red-50 p-5 rounded-2xl border border-red-100">
      <p className="text-xs font-bold text-red-600 uppercase tracking-widest text-center mb-1">
        Confirmar eliminación
      </p>
      <input
        type="password"
        value={deletePassword}
        onChange={(e) => setDeletePassword(e.target.value)}
        className="px-4 py-3 bg-white border border-red-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 text-center"
        placeholder="Contraseña"
      />
      <div className="flex gap-2 mt-1">
        <button
          type="button"
          onClick={handleDeleteAccount}
          disabled={deleteLoading || !deletePassword}
          className="flex-[2] px-4 py-3 bg-red-600 text-white text-sm font-bold rounded-xl hover:bg-red-700 disabled:opacity-50 transition-all"
        >
          {deleteLoading ? "..." : "Confirmar"}
        </button>
        <button
          type="button"
          onClick={() => {
            setShowDeleteForm(false);
            setDeletePassword("");
            setDeleteError(null);
          }}
          className="flex-1 flex justify-center items-center px-4 py-3 bg-red-100 text-red-700 text-sm font-bold rounded-xl hover:bg-red-200 transition-colors"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>
      {deleteError && (
        <p className="text-[10px] text-red-500 font-bold mt-1 text-center">
          {deleteError}
        </p>
      )}
    </div>
  );
};

export default DeleteAccountForm;
