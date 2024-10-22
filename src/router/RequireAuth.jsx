import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireAuth() {
  const authenticate = useAuth();
  let location = useLocation();

  if (!authenticate) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default RequireAuth;
