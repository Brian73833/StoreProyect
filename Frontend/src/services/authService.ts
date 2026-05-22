import type { User } from "../models/responses/User";
import { config } from "../config";

// Tipo que representa la respuesta cruda del backend al hacer login o registro
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

// Convierte la respuesta del backend al tipo User del frontend
function mapAuthResponse(data: AuthApiResponse): User {
  return {
    userResourceId: data.user.userResourceId,
    name: data.user.name,
    email: data.user.email,
    roles: data.user.roles,
    token: data.bearerToken,
  };
}

// Función auxiliar para extraer el mensaje de error de una respuesta de la API
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

// Devuelve la cabecera de autorización con el token JWT almacenado
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

// Función para iniciar sesión con email y contraseña
export const loginUser = async (loginData: {
  email: string;
  password: string;
}): Promise<User> => {
  const response = await fetch(`${config.api.url}/api/authorization/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    const message = await parseErrorMessage(response);
    throw new Error(message || "Error al iniciar sesión");
  }

  const data: AuthApiResponse = await response.json();
  return mapAuthResponse(data);
};

// Función para registrar un nuevo usuario
export const registerUser = async (signUpData: {
  name: string;
  email: string;
  password: string;
}): Promise<User> => {
  const response = await fetch(`${config.api.url}/api/authorization/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(signUpData),
  });

  if (!response.ok) {
    const message = await parseErrorMessage(response);
    throw new Error(message || "Error al registrarse");
  }

  const data: AuthApiResponse = await response.json();
  return mapAuthResponse(data);
};

// Función para actualizar los datos de un usuario
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
  });

  if (!response.ok) {
    const message = await parseErrorMessage(response);
    throw new Error(message || "Error al actualizar la información");
  }

  const updatedUser = await response.json();

  // Conserva el token actual del usuario en el resultado actualizado
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

// Función para eliminar la cuenta de un usuario
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
  });

  if (!response.ok) {
    const message = await parseErrorMessage(response);
    throw new Error(message || "Error al eliminar la cuenta");
  }
};

// Cierra sesión localmente (el token JWT es stateless; no hay endpoint de logout en el backend)
export const logoutUser = (): void => {
  localStorage.removeItem("user");
};
