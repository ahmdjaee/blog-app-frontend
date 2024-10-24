import { router } from "@/router/routes";
import { Button } from "antd";

const LinkToLogin = (
  <Button type="primary" onClick={() => router.navigate("/auth/login")}>
    Login
  </Button>
);

export { LinkToLogin };
