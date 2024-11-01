import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function MustIsUser() {
  const user = useAuth();
  let location = useLocation();

  if (user?.role === "admin") {
    return <Navigate to="/admin/dashboard" state={{ from: location }} replace />;
  }
  return <Outlet />;
}

export default MustIsUser;
