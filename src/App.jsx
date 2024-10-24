import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes";
import { Suspense } from "react";
import { ConfigProvider, Spin } from "antd";
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
