import { Navigate, Outlet } from "react-router";
import type { User } from "../types/LoginResponse";
//import { isAuthenticated } from "../service/authService";

const ProtectedRoute = ({ user }: { user: User | null }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
