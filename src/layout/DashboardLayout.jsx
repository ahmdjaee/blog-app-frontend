import Logo from "@/components/Logo";
import ProfileButton from "@/components/ProfileButton";
import { useAuth } from "@/hooks/useAuth";
import { removeAuth } from "@/redux/authSlice";
import { useLogoutMutation } from "@/service/extended/authApi";
import { removeUserAndToken } from "@/service/token";
import {
  AppstoreAddOutlined,
  BarChartOutlined,
  BarsOutlined,
  CloudOutlined,
  CommentOutlined,
  ExclamationCircleFilled,
  LogoutOutlined,
  MenuFoldOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Grid, Layout, Menu, Modal, theme } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
const { useBreakpoint } = Grid;
const { Header, Content, Footer, Sider } = Layout;

const siderStyle = {
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarColor: "unset",
  zIndex: 10,
};

const itemsAdmin = [
  {
    key: "/admin/dashboard",
    icon: <BarChartOutlined />,
    label: "Dashboard",
  },
  {
    key: "/admin/posts",
    icon: <CloudOutlined />,
    label: "Posts",
  },
  {
    key: "/admin/categories",
    icon: <AppstoreAddOutlined />,
    label: "Categories",
  },
  {
    key: "/admin/comments",
    icon: <CommentOutlined />,
    label: "Comments",
  },
  {
    key: "/admin/users",
    icon: <TeamOutlined />,
    label: "Users",
  },
  {
    key: "logout",
    label: "Logout",
    icon: <LogoutOutlined />,
  },
];

const itemsUser = [
  {
    key: "/user/dashboard",
    icon: <BarChartOutlined />,
    label: "Dashboard",
  },
  {
    key: "/user/posts",
    icon: <CloudOutlined />,
    label: "Posts",
  },
];

const DashboardLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const user = useAuth();

  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { lg, sm } = useBreakpoint();
  const [collapsed, setCollapsed] = React.useState(true);
  const [modal, contextHolder] = Modal.useModal();

  const onClickMenu = ({ key }) => {
    switch (key) {
      case "logout":
        modal.confirm({
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
      default:
        navigate(key);
    }
    if (!lg) {
      setCollapsed(true);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Layout hasSider>
      <Sider
        style={siderStyle}
        width={250}
        breakpoint="lg"
        collapsedWidth="0"
        collapsible
        collapsed={collapsed}
        trigger={null}
        onBreakpoint={(broken) => {
          setCollapsed(broken);
        }}
      >
        <div
          onClick={() => setCollapsed(!collapsed)}
          style={{ height: 32, margin: 16, background: "rgba(255, 255, 255, 0.2)" }}
        >
          <Button
            type="text"
            icon={<MenuFoldOutlined />}
            style={{
              fontSize: "16px",
              height: "inherit",
              color: "#fff",
              // display: !collapsed && "none"
            }}
          />
        </div>
        <Menu
          onClick={onClickMenu}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={user?.role === "admin" ? itemsAdmin : itemsUser}
        />
      </Sider>
      <Layout
        style={{
          marginInlineStart: collapsed || !lg ? 0 : 250,
          minHeight: "100dvh",
        }}
      >
        <Header
          style={{
            padding: 0,
            paddingInline: 16,
            background: colorBgContainer,
            position: "sticky",
            top: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {collapsed && (
            <Button
              icon={<MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ marginRight: "16px" }}
            />
          )}

          <Logo style={{ marginRight: "auto" }} />

          <ProfileButton />

          {contextHolder}
        </Header>

        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div
            style={{
              padding: sm ? 24 : 16,
              background: pathname === "/admin/dashboard" ? "" : colorBgContainer,
              borderRadius: borderRadiusLG,
              overflowX: "auto",
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            marginTop: "auto",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default DashboardLayout;
