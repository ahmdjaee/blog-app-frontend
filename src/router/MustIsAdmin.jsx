import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

function MustIsAdmin() {
  const user = useAuth();

  if (user?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default MustIsAdmin;
