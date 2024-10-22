import React, { useEffect } from "react";
import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  MenuFoldOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Grid } from "antd";
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

const items = [
  {
    key: "/admin/users",
    icon: <TeamOutlined />,
    label: "Users",
  },
  {
    key: "2",
    icon: <VideoCameraOutlined />,
    label: "Comments",
  },
  {
    key: "3",
    icon: <UploadOutlined />,
    label: "",
  },
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
    key: "7",
    icon: <TeamOutlined />,
    label: "nav 7",
  },
  {
    key: "8",
    icon: <ShopOutlined />,
    label: "nav 8",
  },
];

const DashboardLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { lg } = useBreakpoint();
  const [collapsed, setCollapsed] = React.useState(true);
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
          style={{ height: 32, margin: 16, background: "rgba(255, 255, 255, 0.2)" }}
        />
        <Menu
          onClick={onClickMenu}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
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
            background: colorBgContainer,
            position: "static",
          }}
        >
          {(collapsed || !lg) && (
            <Button
              type="text"
              icon={<MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
                zIndex: 11,
                color: !collapsed && "#fff",
              }}
            />
          )}
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
