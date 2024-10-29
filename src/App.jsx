import { ConfigProvider, Spin } from "antd";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes";
function App() {
  return (
    <ConfigProvider>
      <Suspense fallback={<Spin fullscreen />}>
        <RouterProvider fallbackElement={<Spin fullscreen />} router={router} />
      </Suspense>
    </ConfigProvider>
  );
}

export default App;
