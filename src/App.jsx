import { ConfigProvider, theme } from "antd";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";
import { validateMessage } from "./lib/rule";
import { router } from "./router/routes";

function App() {
  return (
    <ConfigProvider
      form={{ validateMessages: validateMessage }}
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <Suspense fallback={<TopBarProgress />}>
        <RouterProvider router={router} />
      </Suspense>
    </ConfigProvider>
  );
}

export default App;
