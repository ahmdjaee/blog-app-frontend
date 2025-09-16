import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function MustIsAdmin() {
  const user = useAuth();
  let location = useLocation();

  if (user?.role !== "admin") {
    return <Navigate to="/user/posts/drafts" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
// function MustIsAdmin() {
//   const user = useAuth();
//   let location = useLocation();

//   if (user?.role !== "admin") {
//     return <Navigate to="/auth/login" state={{ from: location }} replace />;
//   }

//   return <Outlet />;
// }

export default MustIsAdmin;
