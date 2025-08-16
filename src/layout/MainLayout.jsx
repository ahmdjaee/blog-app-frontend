import Logo from "@/components/Logo";
import ProfileButton from "@/components/ProfileButton";
import { useAuth } from "@/hooks/useAuth";
import { removeAuth } from "@/redux/authSlice";
import { useLogoutMutation } from "@/service/extended/authApi";
import { removeUserAndToken } from "@/service/token";
import {
  ArrowLeftOutlined,
  BarsOutlined,
  BookOutlined,
  ContainerOutlined,
  ExclamationCircleFilled,
  HomeOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Drawer, Flex, Grid, Input, Layout, Menu, Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
const { Search } = Input;
const { Content } = Layout;
const { confirm } = Modal;

const MainLayout = () => {
  const [open, setOpen] = useState(false);
  const user = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { lg, md } = Grid.useBreakpoint();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [logout] = useLogoutMutation();

  const items = [
    {
      key: "/",
      label: "Home",
      icon: <HomeOutlined />,
    },
    {
      key: "/posts/bookmarks",
      label: "Bookmark",
      icon: <BookOutlined />,
    },
    {
      key: "/profile",
      label: "Profile",
      icon: <UserOutlined />,
    },
    {
      key: "/admin/dashboard",
      label: "Manage Posts",
      icon: <ContainerOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
    },
    {
      type: "divider",
    },
  ];
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const onClick = (e) => {
    switch (e.key) {
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
      default:
        navigate(e.key);
    }
    setOpen(false);
  };

  const onSearch = (value) => {
    if (value) {
      navigate(`/posts/search?keyword=${value}`);
    }
  };

  return (
    <div className="cs-layout">
      {/* ANCHOR Navbar */}
      <nav className="cs-navbar">
        <Flex
          justify="end"
          gap={"16px"}
          style={{ maxWidth: 1250, marginInline: "auto" }}
          align="center"
        >
          {location.pathname !== "/" && !lg && <ArrowLeftOutlined onClick={() => navigate(-1)} />}
          {md && <Logo style={{ fontSize: 20, marginRight: "auto" }} />}

          <ProfileButton
            style={{
              marginRight: !md && "auto",
            }}
          />
          <Button
            // size={md ? "middle" : "small"}
            color="primary"
            variant="filled"
            style={{ display: user && "none", order: md && 1 }}
            onClick={() => navigate("/auth/login")}
          >
            Log in
          </Button>

          <Search
            placeholder="input search text"
            allowClear
            name="search"
            onSearch={onSearch}
            style={{ minWidth: 150, flex: 1, maxWidth: 500 }}
          />
          {user && <Button icon={<BarsOutlined />} onClick={showDrawer} />}
        </Flex>
      </nav>

      {/* ANCHOR Menu */}
      <Drawer
        title="Menu"
        styles={{ body: { paddingBlock: "16px" } }}
        onClose={onClose}
        open={open}
      >
        <Menu
          onClick={onClick}
          style={{
            width: "100%",
          }}
          mode="inline"
          inlineCollapsed={false}
          defaultSelectedKeys={["1"]}
          // defaultOpenKeys={["category"]}
          items={items}
        />
        <Card style={{ marginTop: 20 }}>
          This website is only for showcasing projects. If you are interested, please contact me on
          Instagram <a href="https://www.instagram.com/jaee.eee_">@jaee.eee_</a>_ for further
          information. Thanks!
        </Card>
      </Drawer>
      <Content
        style={{
          padding: "0 16px 16px 16px",
          backgroundColor: "#fff",
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <Outlet />
      </Content>
    </div>
  );
};
export default MainLayout;
