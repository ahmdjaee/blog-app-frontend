import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function MustNotAuth() {
  const authenticate = useAuth();
  let location = useLocation();

  if (authenticate) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default MustNotAuth;
