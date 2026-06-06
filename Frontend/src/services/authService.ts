import type { User } from "../models/responses/User";
import { config } from "../config";

interface AuthApiResponse {
  bearerToken: string;
  expiresIn: string;
  user: {
    userResourceId: string;
    name: string;
    email: string;
    roles: string[];
  };
}

function mapAuthResponse(data: AuthApiResponse): User {
  return {
    userResourceId: data.user.userResourceId,
    name: data.user.name,
    email: data.user.email,
    roles: data.user.roles,
    token: data.bearerToken,
  };
}

async function parseErrorMessage(response: Response): Promise<string> {
  const contentType = response.headers.get("content-type") || "";
  try {
    if (contentType.includes("application/json")) {
      const data = await response.json();
      return typeof data === "string"
        ? data
        : data.message || data.title || getFallbackMessage(response.status);
    }
    return getFallbackMessage(response.status);
  } catch {
    return "Error desconocido del servidor";
  }
}

function getFallbackMessage(status: number): string {
  if (status === 400) return "Los datos ingresados no son válidos.";
  if (status === 401) return "Credenciales incorrectas.";
  if (status === 403) return "No tienes permiso para realizar esta acción.";
  if (status === 404) return "El recurso solicitado no existe.";
  if (status === 409) return "El correo electrónico ya está registrado.";
  if (status >= 500) return "Error interno del servidor. Intenta más tarde.";
  return "Ocurrió un error inesperado.";
}

export function getAuthHeader(): Record<string, string> {
  const user = localStorage.getItem("user");
  if (!user) return {};
  try {
    const parsed: User = JSON.parse(user);
    return parsed.token ? { Authorization: `Bearer ${parsed.token}` } : {};
  } catch {
    return {};
  }
}

export const loginUser = async (loginData: {
  email: string;
  password: string;
}): Promise<User> => {
  const response = await fetch(`${config.api.url}/api/authorization/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
    credentials: "include",
  });
  if (!response.ok) {
    const message = await parseErrorMessage(response);
    throw new Error(message || "Error al iniciar sesión");
  }

  const data: AuthApiResponse = await response.json();
  return mapAuthResponse(data);
};

export const registerUser = async (signUpData: {
  name: string;
  email: string;
  password: string;
}): Promise<User> => {
  const response = await fetch(`${config.api.url}/api/authorization/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(signUpData),
    credentials: "include",
  });

  if (!response.ok) {
    const message = await parseErrorMessage(response);
    throw new Error(message || "Error al registrarse");
  }

  const data: AuthApiResponse = await response.json();
  return mapAuthResponse(data);
};

export const updateUser = async (
  resourceId: string,
  updateData: {
    name: string;
    email: string;
    currentPassword?: string;
    newPassword?: string;
  },
): Promise<User> => {
  const response = await fetch(`${config.api.url}/api/users/${resourceId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(updateData),
    credentials: "include",
  });

  if (!response.ok) {
    const message = await parseErrorMessage(response);
    throw new Error(message || "Error al actualizar la información");
  }

  const updatedUser = await response.json();
  const currentUser = localStorage.getItem("user");
  const token = currentUser ? JSON.parse(currentUser).token : "";

  return {
    userResourceId: updatedUser.userResourceId,
    name: updatedUser.name,
    email: updatedUser.email,
    roles: updatedUser.roles ?? [],
    token,
  };
};

export const deleteUser = async (
  resourceId: string,
  password: string,
): Promise<void> => {
  const response = await fetch(`${config.api.url}/api/users/${resourceId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify({ password }),
    credentials: "include",
  });

  if (!response.ok) {
    const message = await parseErrorMessage(response);
    throw new Error(message || "Error al eliminar la cuenta");
  }
};
export const logoutUser = (): void => {
  localStorage.removeItem("user");
};
