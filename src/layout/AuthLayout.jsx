import { Flex } from "antd";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <Flex
      style={{ width: "100%", height: "100%", padding: 20 }}
      justify={"center"}
      align={"center"}
    >
      <Outlet />
    </Flex>
  );
}

export default AuthLayout;
