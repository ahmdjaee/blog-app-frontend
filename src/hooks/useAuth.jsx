import { removeAuth, selectAuth, setAuth } from "@/redux/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserAndToken } from "../service/token";

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  useEffect(() => {
    const user = getCurrentUserAndToken();

    if (user) {
      dispatch(setAuth(user));
    } else {
      dispatch(removeAuth());
    }
  }, [dispatch]);

  return auth;
};
