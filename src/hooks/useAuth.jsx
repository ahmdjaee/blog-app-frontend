import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCurrentUserAndToken } from "../service/token";

export const useAuth = () => {
  const [auth, setAuth] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = getCurrentUserAndToken();

    if (user) {
      setAuth(user);
    } else {
      setAuth(null);
    }
  }, [navigate, location]);

  return auth;
};
