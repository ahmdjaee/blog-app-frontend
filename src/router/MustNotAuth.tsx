import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function MustNotAuth() {
  const user = useAuth();
  let location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (user) {
    return <Navigate to={from} state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default MustNotAuth;
