export type LoginResponse = {
  accessToken: string;
  expiresIn: number;
  subject: string;
  roles: string[];
};

export type User = {
  exiresIn: number;
  subject: string;
  roles: string[];
};