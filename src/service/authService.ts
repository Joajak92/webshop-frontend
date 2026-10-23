import type { LoginRequest } from "../types/LoginRequest";
import type { User } from "../types/LoginResponse";

const GATEWAY_API_BASE = import.meta.env.VITE_GATEWAY_API_URL;

export async function login(credentials: LoginRequest): Promise<User> {
  const response = await fetch(`${GATEWAY_API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Fel användarnamn eller lösenord");
  }

  const user: User = await response.json();
  return user;
}

export async function logout(): Promise<void> {
  const response = await fetch(`${GATEWAY_API_BASE}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Utloggningen misslyckades");
  }
}

export async function getSession(): Promise<User | null> {
  const response = await fetch(`${GATEWAY_API_BASE}/auth/me`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Not authenticated");
  }
  return await response.json();
}

export function getPermissions() {
  const role = sessionStorage.getItem("roles");
  return role ? Promise.resolve(role) : Promise.reject();
}
