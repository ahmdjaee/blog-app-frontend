import { Flex, theme } from "antd";
import { useNavigate } from "react-router-dom";
import React from "react";

function Logo({ style: style }: { style?: React.CSSProperties }) {
  const navigate = useNavigate();
  const {token} = theme.useToken()

  return (
    <Flex
      align="center"
      gap={8}
      style={{ cursor: "pointer", ...style }}
      onClick={() => navigate("/")}
    >
      
      <p
        style={{
          lineHeight: "32px",
          alignSelf: "end",
          fontWeight: "bold",
          fontSize: "26px",
          color: token.colorText
        }}
      >
        𝒟𝒾𝑔𝑔𝒾𝑒𝓈
      </p>
    </Flex>
  );
}

export default Logo;
