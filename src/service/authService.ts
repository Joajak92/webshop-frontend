import type { LoginRequest } from "../types/LoginRequest";
import type { LoginResponse } from "../types/LoginResponse";

const loginUrl =
  import.meta.env.VITE_AUTH_API_URL ?? "http://localhost:9000/auth/login";

const TOKEN_KEY = "access_token";
const SUBJECT_KEY = "subject";
const ROLES_KEY = "roles";

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const responseText = await response.text();
  if (!response.ok) {
    throw new Error("Fel användarnamn eller lösenord");
  }

  const result = JSON.parse(responseText) as LoginResponse;

  sessionStorage.setItem(TOKEN_KEY, result.accessToken);
  sessionStorage.setItem(SUBJECT_KEY, result.subject);
  sessionStorage.setItem(ROLES_KEY, JSON.stringify(result.roles));
  // console.log(response);
  // console.log(responseText);

  return result;
}

export function logout(): void {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(SUBJECT_KEY);
  sessionStorage.removeItem(ROLES_KEY);
}

export function getToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return getToken() !== null;
}
