export type LoginResponse = {
  accessToken: string;
  expiresIn: number;
  subject: string;
  roles: string[];
};
