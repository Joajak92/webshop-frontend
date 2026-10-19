import type { LoginRequest } from "../types/LoginRequest";
import type { User } from "../types/LoginResponse";

// const loginUrl =
//   import.meta.env.VITE_AUTH_API_URL ??
//   "http://localhost:9003/gateway/auth/login";

const GATEWAY_API_BASE = import.meta.env.VITE_GATEWAY_API_URL;

// const TOKEN_KEY = "access_token";
// const SUBJECT_KEY = "subject";
// const ROLES_KEY = "roles";

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
  //const responseText = await response.text();

  //const result = JSON.parse(responseText) as LoginResponse;

  //sessionStorage.setItem(TOKEN_KEY, result.accessToken);
  //sessionStorage.setItem(SUBJECT_KEY, result.subject);
  //sessionStorage.setItem(ROLES_KEY, JSON.stringify(result.roles));
  //return result;
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

export async function getMe(): Promise<User> {
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
