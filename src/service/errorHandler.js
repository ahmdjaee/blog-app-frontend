import { showLoginModal } from "@/components/LoginModal";
import { notification } from "antd";

export function errorHandler(response) {
  if (response?.status === 500) {
    notification.error({
      message: "Internal Server Error",
      description: "Something went wrong. Please try again later.",
    });
    return response?.data;
  } else if (response?.status === 401) {
    showLoginModal();
    return response?.data;
  } else if (response?.status === 422) {
    if (response?.data?.message) {
      notification.error({
        message: "Validation Error",
        description: response?.data?.message,
      });
    }
    return response?.data;
  } else if (response?.status === 403) {
    notification.error({
      message: "Forbidden",
      description: response?.data?.message,
    });
    return response?.data;
  } else {
    notification.error({
      message: "Error",
      description: "Something went wrong. Please try again later.",
    });
    return response?.data;
  }
}
