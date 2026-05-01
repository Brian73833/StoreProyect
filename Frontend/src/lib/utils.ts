// ─── Password Strength ────────────────────────────────────────────────────────

export interface PasswordStrength {
  score: number; // 0-4
  label: string;
  color: string;
}

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return { score: 0, label: "", color: "" };

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[\W_]/.test(password)) score++;

  // Map 5-point scale → 4 levels
  const level = Math.min(Math.floor((score / 5) * 4), 4);

  const map: PasswordStrength[] = [
    { score: 0, label: "Muy débil", color: "#ef4444" },
    { score: 1, label: "Débil",     color: "#f97316" },
    { score: 2, label: "Regular",   color: "#eab308" },
    { score: 3, label: "Buena",     color: "#22c55e" },
    { score: 4, label: "Fuerte",    color: "#16a34a" },
  ];

  return map[level];
}

export const ICON_STYLE: React.CSSProperties = {
  fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48",
};

