import Logo from "@/components/Logo";
import ProfileButton from "@/components/ProfileButton";
import { useAuth } from "@/hooks/useAuth";
import {
  AppstoreAddOutlined,
  BarChartOutlined,
  CloudOutlined,
  CommentOutlined,
  MenuFoldOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Grid, Layout, Menu, Modal, theme } from "antd";
import React, { useEffect } from "react";
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

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { lg } = useBreakpoint();
  const [collapsed, setCollapsed] = React.useState(true);
  const [modal, contextHolder] = Modal.useModal();
  
  const onClickMenu = (e) => {
    navigate(e.key);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Layout hasSider>
      <Sider
        style={siderStyle}
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
          items={user.role === "admin" ? itemsAdmin : itemsUser}
        />
      </Sider>
      <Layout
        style={{
          marginInlineStart: collapsed || !lg ? 0 : 200,
          minHeight: "100dvh",
        }}
      >
        <Header
          style={{
            padding: 0,
            paddingInline: 16,
            background: colorBgContainer,
            position: "static",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {collapsed && (
            <Button
              type="text"
              icon={<MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
                // display: !collapsed && "none"
              }}
            />
          )}
          
          <Logo style={{marginRight: "auto"}} />

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
              padding: 24,
              background: colorBgContainer,
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
