export interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}
export function getPasswordStrength(password: string): PasswordStrength {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[\W_]/.test(password)) score++;

  const labels = ["Muy débil", "Muy débil", "Débil", "Regular", "Buena", "Fuerte"];
  const colors = ["#ef4444", "#ef4444", "#f97316", "#eab308", "#22c55e", "#16a34a"];

  return { score, label: labels[score], color: colors[score] };
}
export const ICON_STYLE: React.CSSProperties = {
  fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48",
};
