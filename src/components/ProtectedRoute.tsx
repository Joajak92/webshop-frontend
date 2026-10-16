import { Navigate, Outlet } from "react-router";
import type { User } from "../types/LoginResponse";
//import { isAuthenticated } from "../service/authService";

type ProtectedRouteProps = {
  user: User | null;
};

const ProtectedRoute = ({ user }: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
