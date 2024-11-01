import { notification } from "antd";

export function successHandler(payload) {
  notification.success({
    message: "Success",
    description: payload?.message,
  });
}
