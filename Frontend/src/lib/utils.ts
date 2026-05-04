// Define la estructura de la fortaleza de una contraseña
export interface PasswordStrength {
  score: number; // Nivel del 0 al 4
  label: string; // Texto descriptivo (ej: "Fuerte")
  color: string; // Color para la interfaz
}

// Función que calcula qué tan segura es una contraseña
export function getPasswordStrength(password: string): PasswordStrength {
  // Si no hay contraseña, devuelve fuerza 0
  if (!password) return { score: 0, label: "", color: "" };

  let score = 0;
  // Aumenta el puntaje si cumple ciertas reglas
  if (password.length >= 8) score++; // Al menos 8 caracteres
  if (/[A-Z]/.test(password)) score++; // Contiene mayúsculas
  if (/[a-z]/.test(password)) score++; // Contiene minúsculas
  if (/\d/.test(password)) score++; // Contiene números
  if (/[\W_]/.test(password)) score++; // Contiene símbolos

  // Convierte el puntaje a un nivel de 0 a 4
  const level = Math.min(Math.floor((score / 5) * 4), 4);

  // Mapea cada nivel con su texto y color correspondiente
  const map: PasswordStrength[] = [
    { score: 0, label: "Muy débil", color: "#ef4444" },
    { score: 1, label: "Débil",     color: "#f97316" },
    { score: 2, label: "Regular",   color: "#eab308" },
    { score: 3, label: "Buena",     color: "#22c55e" },
    { score: 4, label: "Fuerte",    color: "#16a34a" },
  ];

  return map[level];
}

// Estilo por defecto para los íconos de Google (Material Symbols)
export const ICON_STYLE: React.CSSProperties = {
  fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48",
};
