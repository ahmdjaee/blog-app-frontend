import { useAuth } from "@/hooks/useAuth";
import { useGetCategoryQuery } from "@/service/extended/categoryApi";
import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  ArrowLeftOutlined,
  BarsOutlined,
  BookOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Drawer, Flex, Input, Layout, Menu } from "antd";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
const { Search } = Input;
const { Content } = Layout;

const MainLayout = () => {
  const [open, setOpen] = useState(false);
  const [back, setBack] = useState(true);
  const user = useAuth();
  const { data } = useGetCategoryQuery();
  const navigate = useNavigate();

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
      key: "/posts",
      label: "Markah",
      icon: <BookOutlined />,
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
      key: "/",
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
    navigate(e.key);
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
