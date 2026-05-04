// Componente para mostrar mensajes de error en los campos de los formularios
const FieldError = ({ message }: { message?: string }) =>
  message ? (
    <p className="flex items-center gap-1 text-red-500 text-xs font-semibold mt-1 ml-1 animate-pulse">
      <span className="material-symbols-outlined text-sm leading-none">
        error
      </span>
      {message}
    </p>
  ) : null;

export default FieldError;
