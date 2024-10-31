import { useAuth } from "@/hooks/useAuth";
import { removeAuth } from "@/redux/authSlice";
import { useLogoutMutation } from "@/service/extended/authApi";
import { useUpdateUserMutation } from "@/service/extended/userApi";
import { removeUserAndToken } from "@/service/token";
import {
  ExclamationCircleFilled,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Form, Grid, Input, Modal, Spin } from "antd";
import { useDispatch } from "react-redux";

const { confirm } = Modal;

function ProfileButton({ style }) {
  const user = useAuth();
  const { md } = Grid.useBreakpoint();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const onFinish = (values) => {
    // const { name, email } = values;
    // updateUser({ name, email });
  };

  const onClick = ({ key }) => {
    switch (key) {
      case "logout":
        confirm({
          title: "Are you sure want to logout?",
          icon: <ExclamationCircleFilled />,
          content: "Press Ok to proceed",
          onOk() {
            return logout()
              .unwrap()
              .then(() => {
                removeUserAndToken();
                dispatch(removeAuth());
              })
              .catch(() => {});
          },
        });
        break;
      case "profile":
        confirm({
          title: "Profile",
          icon: null,
          content: (
            <Spin spinning={isLoading}>
              <Form
                onFinish={onFinish}
                // form={form}
                name="edit-user"
                layout="vertical"
                autoComplete="off"
                initialValues={user}
              >
                <Form.Item
                  name="name"
                  label="Name"
                  // rules={[
                  //   {
                  //     required: true,
                  //   },
                  // ]}
                >
                  <Input required readOnly placeholder="Insert user name" />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  // rules={[
                  //   {
                  //     required: true,
                  //   },
                  // ]}
                >
                  <Input required readOnly type="email" placeholder="Email" />
                </Form.Item>
                {/* <Form.Item
                  name="old_password"
                  label="Old Password"
                  rules={[
                    {
                      min: 8,
                    },
                  ]}
                >
                  <Input.Password autoComplete="off" placeholder="Password" />
                </Form.Item>
                <Form.Item
                  name="new_password"
                  label="New Password"
                  rules={[
                    {
                      // required: oldPasssword ? true : false,
                      min: 8,
                    },
                  ]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item> */}
                {/* <Form.Item
                  label="Role"
                  name="role"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    placeholder="Select role"
                    allowClear
                    readOnly
                    options={[
                      { label: "Admin", value: "admin" },
                      { label: "User", value: "user" },
                    ]}
                  />
                </Form.Item> */}
                {/* <Form.Item>
                  <Space>
                    <SubmitButton form={form}>Submit</SubmitButton>
                    <Button htmlType="reset">Reset</Button>
                  </Space>
                </Form.Item> */}
              </Form>
            </Spin>
          ),
          cancelText: "Close",
          okText: "Save",
        });
        break;
      default:
      // navigate(e.key);
    }
  };
  return (
    <Dropdown
      menu={{
        items: [
          {
            key: "profile",
            label: "Profile",
            icon: <UserOutlined />,
          },
          {
            key: "logout",
            label: "Logout",
            icon: <LogoutOutlined />,
          },
        ],
        onClick: onClick,
      }}
    >
      <Avatar
        style={{
          backgroundColor: "#096dd9",
          verticalAlign: "middle",
          display: !user && "none",
          order: md && 1,
          ...style,
        }}
      >
        {user?.name.charAt(0).toUpperCase()}
      </Avatar>
    </Dropdown>
  );
}

export default ProfileButton;
