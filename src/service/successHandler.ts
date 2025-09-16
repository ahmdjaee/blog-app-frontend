import { notification } from "antd";

export function successHandler(payload = { message: "" }) {
  notification.success({
    message: "Success",
    description: payload.message,
  });
}
