import { isLogin } from "@/App";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthWrapper = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin) {
      navigate("/home", { replace: true });
      return;
    }
  }, []);
  return <Outlet />;
};

export default AuthWrapper;
