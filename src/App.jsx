import { ConfigProvider, Spin } from "antd";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes";
import { validateMessage } from "./lib/rule";

function App() {
  return (
    <ConfigProvider form={{ validateMessages: validateMessage }}>
      <Suspense fallback={<Spin fullscreen />}>
        <RouterProvider fallbackElement={<Spin fullscreen />} router={router} />
      </Suspense>
    </ConfigProvider>
  );
}

export default App;
