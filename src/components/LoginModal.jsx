import { Modal, Result } from "antd";

export function loginModal() {

  const onOk = () => {
    window.history.pushState(
      { prevUrl: window.location.pathname },
      null,
      "/auth/login"
    );
    window.location.href = "/auth/login";
  };

  return Modal.confirm({
    title: "Oops, You are not logged in",
    icon: null,
    okButtonProps: {
      htmlType: "submit",
    },
    onOk: onOk,
    okText: "Go to Login",
    className: "login-modal",
    
    content: (
      <Result
        status="403"
        // title="403"
        style={{ width: "inherit", paddingBlock: 20 }}
        subTitle="Please login to do this action"
      />
    ),
  });
}
