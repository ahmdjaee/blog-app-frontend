import { Button } from "antd";

const LinkToLogin = (
  <Button
    type="primary"
    onClick={() => {
      window.history.pushState(
        { prevUrl: window.location.pathname },
        null,
        "/auth/login"
      );
      window.location.href = "/auth/login";
    }}
  >
    Login
  </Button>
);

export { LinkToLogin };

