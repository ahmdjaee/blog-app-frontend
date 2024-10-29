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
      <svg
        width="28px"
        height="28px"
        style={{ fill: "#096dd9" }}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3.2 19h1.1c1.6-.2 4-1.2 14.7-12.2v2.6l-4.4 4.3.7.7L20 9.8v-4l.7-.8c.4-.4.4-1 0-1.4l-.1-.1.4-.4-1.6-1.6-.4.4-.1-.1c-.2-.2-.5-.3-.7-.3-.3 0-.5.1-.7.3l-2.8 2.8C10 9.4 4.1 15.3 3.4 17.2c-.1.4-.2.7-.2 1.1v.7zm15-16.5L20 4.3c-3.4 3.5-6 6.1-8 8l-1.7-1.7c1.7-1.8 7.1-7.3 7.9-8.1zM4.3 17.6c.4-1 2.6-3.5 5.3-6.3l1.7 1.7c-4.6 4.3-6.1 4.9-7 5h-.1c0-.2.1-.3.1-.4zm18.3 5.3c-1.9.8-4 1.1-6.1 1-3.4 0-4.8-.9-5.4-1.4-.3-.2-.3-.7 0-.9.1-.1.3-.2.5-.2 3.3 0 4.5-.7 4.5-1.4 0-.5-1.2-1-2.6-1-1.6.1-3.1.7-4.2 1.9C8 22.2 6.3 23 4.5 23c-.7 0-1.4 0-2.1-.2-.8-.2-1.4-1-1.3-1.9 0-.9.8-1.5 1.2-1.7l.7.7-.1.1c-.6.4-.9.7-.9.9 0 .4.2.8.7.9.5.2 1.1.2 1.7.2 1.6-.1 3.1-.7 4.2-1.9 1.3-1.3 3-2.1 4.8-2.1 1.6 0 3.6.5 3.6 2 0 .8-.6 2.1-4.3 2.4 1.2.4 2.5.6 3.8.6 2 .1 3.9-.2 5.8-.9l.3.8z" />
        <path fill="none" d="M0 0h24v24H0z" />
      </svg>
      <p
        style={{
          lineHeight: "26px",
          alignSelf: "end",
          fontStyle: "italic",
          fontWeight: "bold",
        }}
      >
        Diggie Blog
      </p>
    </Flex>
  );
}

export default Logo;
