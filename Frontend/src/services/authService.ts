import type { User } from "../lib/types";
import { BASE_URL } from "../lib/config";

// ─── Helper: extrae el mensaje de error correctamente ───────────────────────
// El backend retorna BadRequest con un string plano o un objeto JSON.
// Esta función maneja ambos casos.
async function parseErrorMessage(response: Response): Promise<string> {
  const contentType = response.headers.get("content-type") || "";
  try {
    if (contentType.includes("application/json")) {
      const data = await response.json();
      return typeof data === "string"
        ? data
        : data.message || data.title || JSON.stringify(data);
    } else {
      return await response.text();
    }
  } catch {
    return "Error desconocido del servidor";
  }
}

// ─── Helper: headers con Authorization JWT ───────────────────────────────────
function authHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
  };
}

// ─── Login ────────────────────────────────────────────────────────────────────
export const loginUser = async (loginData: {
  email: string;
  password: string;
}): Promise<User> => {
  const response = await fetch(`${BASE_URL}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
    credentials: "include",
  });

  if (!response.ok) {
    const message = await parseErrorMessage(response);
    throw new Error(message || "Error al iniciar sesión");
  }

  return response.json() as Promise<User>;
};

// ─── Register ─────────────────────────────────────────────────────────────────
export const registerUser = async (signUpData: {
  name: string;
  email: string;
  password: string;
}): Promise<User> => {
  const response = await fetch(`${BASE_URL}/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(signUpData),
    credentials: "include",
  });

  if (!response.ok) {
    const message = await parseErrorMessage(response);
    throw new Error(message || "Error al registrarse");
  }

  return response.json() as Promise<User>;
};

// ─── Update User ──────────────────────────────────────────────────────────────
export const updateUser = async (
  resourceId: string,
  updateData: {
    name: string;
    email: string;
    currentPassword?: string;
    newPassword?: string;
  },
): Promise<User> => {
  const response = await fetch(`${BASE_URL}/api/users/${resourceId}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(updateData),
    credentials: "include",
  });

  if (!response.ok) {
    const message = await parseErrorMessage(response);
    throw new Error(message || "Error al actualizar la información");
  }

  return response.json() as Promise<User>;
};

// ─── Delete User ──────────────────────────────────────────────────────────────
export const deleteUser = async (
  resourceId: string,
  password: string,
): Promise<void> => {
  const response = await fetch(`${BASE_URL}/api/users/${resourceId}`, {
    method: "DELETE",
    headers: authHeaders(),
    body: JSON.stringify({ password }),
    credentials: "include",
  });

  if (!response.ok) {
    const message = await parseErrorMessage(response);
    throw new Error(message || "Error al eliminar la cuenta");
  }
};

// ─── Logout ───────────────────────────────────────────────────────────────────
export const logoutUser = async (): Promise<void> => {
  await fetch(`${BASE_URL}/api/users/logout`, {
    method: "POST",
    credentials: "include",
  });
};
