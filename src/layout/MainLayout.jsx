import { useAuth } from "@/hooks/useAuth";
import { removeAuth } from "@/redux/authSlice";
import { useLogoutMutation } from "@/service/extended/authApi";
import { useGetCategoryQuery } from "@/service/extended/categoryApi";
import { removeUserAndToken } from "@/service/token";
import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  ArrowLeftOutlined,
  BarsOutlined,
  BookOutlined,
  ContainerOutlined,
  ExclamationCircleFilled,
  LogoutOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Drawer, Flex, Input, Layout, Menu, Modal } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
const { Search } = Input;
const { Content } = Layout;
const { confirm } = Modal;

const MainLayout = () => {
  const [open, setOpen] = useState(false);
  const [back, setBack] = useState(true);
  const user = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useGetCategoryQuery();
  const [logout] = useLogoutMutation();

  const categories = data?.data.map((category) => ({
    key: `/posts/category/${category.slug}`,
    label: category.name,
  }));

  const items = [
    {
      key: "/",
      label: "Beranda",
      icon: <AppstoreOutlined />,
    },
    {
      key: "/2",
      label: "Markah",
      icon: <BookOutlined />,
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
      key: "category",
      label: "Kategori",
      icon: <AppstoreAddOutlined />,
      children: categories,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
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
          onOk()  {
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
    console.log("search:", value);
  };

  return (
    <Layout>
      <nav className="cs-navbar">
        <Flex justify="end" gap={"16px"} align="center">
          {back && <ArrowLeftOutlined onClick={() => navigate(-1)} />}
          <Avatar
            style={{
              backgroundColor: "orange",
              verticalAlign: "middle",
              marginRight: "auto",
              display: !user && "none",
            }}
          >
            J
          </Avatar>
          <Button
            size="small"
            color="primary"
            variant="filled"
            style={{ display: user && "none", marginRight: "auto" }}
            onClick={() => navigate("/auth/login")}
          >
            Log in
          </Button>
          <Search
            placeholder="input search text"
            allowClear
            name="search"
            onSearch={onSearch}
            style={{ width: 200 }}
          />
          <Button icon={<BarsOutlined />} onClick={showDrawer} />
        </Flex>
      </nav>
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
          defaultOpenKeys={["category"]}
          items={items}
        />
      </Drawer>
      <Content style={{ padding: "16px", backgroundColor: "#fff" }}>
        <Outlet />
      </Content>
    </Layout>
  );
};
export default MainLayout;
