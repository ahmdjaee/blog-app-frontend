import { Spin } from "antd";

function FloatCircularIndicator({ isLoading, children }) {
  return (
    <>
      <Spin spinning={isLoading} fullscreen />
      {children}
    </>
  );
}

export default FloatCircularIndicator;
