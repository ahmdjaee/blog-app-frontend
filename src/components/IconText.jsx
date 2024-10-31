import { Button, Space } from "antd";
import React from "react";

const IconText = ({ icon, text, color = "primary" }) => (
  <Button variant="text" color={color}>
    {React.createElement(icon)}
    {text}
  </Button>
);

export default IconText;
