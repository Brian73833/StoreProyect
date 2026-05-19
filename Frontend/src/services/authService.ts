import type { User } from "../models/responses/User";
import { config } from "../config";

// Función auxiliar para extraer el mensaje de error de una respuesta de la API
async function parseErrorMessage(response: Response): Promise<string> {
  const contentType = response.headers.get("content-type") || "";
  try {
    // Si la respuesta es JSON, intenta extraer el mensaje
    if (contentType.includes("application/json")) {
      const data = await response.json();
      return typeof data === "string"
        ? data
        : data.message || data.title || JSON.stringify(data);
    } else {
      // Si no es JSON, devuelve el texto plano
      return await response.text();
    }
  } catch {
    // Si ocurre un error inesperado al leer la respuesta
    return "Error desconocido del servidor";
  }
}

// Función para iniciar sesión con email y contraseña
export const loginUser = async (loginData: {
  email: string;
  password: string;
}): Promise<User> => {
  // Hace una petición POST al endpoint de login
  const response = await fetch(`${config.api.url}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
    credentials: "include",
  });

  // Si la petición falla, extrae y lanza el error
  if (!response.ok) {
    const message = await parseErrorMessage(response);
    throw new Error(message || "Error al iniciar sesión");
  }

  // Si es exitosa, devuelve los datos del usuario
  return response.json() as Promise<User>;
};

// Función para registrar un nuevo usuario
export const registerUser = async (signUpData: {
  name: string;
  email: string;
  password: string;
}): Promise<User> => {
  // Hace una petición POST al endpoint de registro
  const response = await fetch(`${config.api.url}/api/users/register`, {
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
  // Hace una petición PUT al endpoint de actualización
  const response = await fetch(`${config.api.url}/api/users/${resourceId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData),
    credentials: "include",
  });

  if (!response.ok) {
    const message = await parseErrorMessage(response);
    throw new Error(message || "Error al actualizar la información");
  }

  return response.json() as Promise<User>;
};

// Función para eliminar la cuenta de un usuario
export const deleteUser = async (
  resourceId: string,
  password: string,
): Promise<void> => {
  // Hace una petición DELETE para borrar la cuenta
  const response = await fetch(`${config.api.url}/api/users/${resourceId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
    credentials: "include",
  });

  if (!response.ok) {
    const message = await parseErrorMessage(response);
    throw new Error(message || "Error al eliminar la cuenta");
  }
};

// Función para cerrar sesión
export const logoutUser = async (): Promise<void> => {
  // Hace una petición POST para invalidar la sesión en el servidor
  await fetch(`${config.api.url}/api/users/logout`, {
    method: "POST",
    credentials: "include",
  });
};
