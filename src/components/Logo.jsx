import { Flex } from "antd";
import { useNavigate } from "react-router-dom";

function Logo({ style }) {
  const navigate = useNavigate();

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
          fontStyle: "italic",
          fontWeight: "bold",
          fontSize: "26px",
        }}
      >
        Diggies
      </p>
    </Flex>
  );
}

export default Logo;
