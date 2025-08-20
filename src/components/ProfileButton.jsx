import { useAuth } from "@/hooks/useAuth";
import { removeAuth } from "@/redux/authSlice";
import { useLogoutMutation } from "@/service/extended/authApi";
import { removeUserAndToken } from "@/service/token";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Avatar, Dropdown, Flex, Grid, Modal } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const { confirm } = Modal;

function ProfileButton({ style }) {
  const user = useAuth();
  const { md } = Grid.useBreakpoint();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

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
      case "/user/profile":
        navigate(key);
        break;
      default:
      // navigate(e.key);
    }
  };
  return (
    <Dropdown
      trigger={["click"]}
      placement="bottomRight"
      overlayStyle={{ width: 250, color: "black" }}
      menu={{
        items: [
          {
            key: "/user/profile",
            label: (
              <Flex gap={12} align="center">
                <Avatar size={50} src={user?.avatar}>
                  {user?.name.charAt(0).toUpperCase()}
                </Avatar>
                <div className="">
                  <p style={{ marginBottom: 0 }}>{user?.name}</p>
                  <small>View Profile</small>
                </div>
              </Flex>
            ),
          },
          {
            type: "divider",
          },
          {
            key: "banner",
            label: (
              <div
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.030)",
                  borderRadius: 10,
                  marginBlock: 10,
                }}
              >
                <img
                  src={"/assets/image/banner.jpg"}
                  width={"100%"}
                  height={200}
                  style={{
                    objectFit: "cover",
                    objectPosition: "left",
                    margin: 0,
                    borderTopLeftRadius: "inherit",
                    borderTopRightRadius: "inherit",
                  }}
                  alt=""
                />
                <div style={{ padding: 16 }}>
                  <small>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam culpa totam qui?
                    <br />
                    <br />
                    <a href="" style={{ color: "black" }}>
                      Okay, got it
                    </a>
                  </small>
                </div>
              </div>
            ),
          },
          {
            type: "divider",
          },
          {
            key: "logout",
            label: (
              <>
                <p>Logout</p>
                <small>{user?.email}</small>
              </>
            ),
            // icon: <LogoutOutlined />,
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
          cursor: "pointer",
        }}
        src={user?.avatar}
      >
        {user?.name.charAt(0).toUpperCase()}
      </Avatar>
    </Dropdown>
  );
}

export default ProfileButton;
