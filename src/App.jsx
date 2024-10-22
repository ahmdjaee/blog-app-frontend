import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes";
import { Suspense } from "react";
import { Spin } from "antd";
function App() {
  return (
    <Suspense fallback={<Spin fullscreen />}>
      <RouterProvider fallbackElement={<Spin fullscreen />} router={router} />;
    </Suspense>
  );
}

export default App;
