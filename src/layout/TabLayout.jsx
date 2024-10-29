import { useGetCategoryQuery } from "@/service/extended/categoryApi";
import { Flex, Tabs } from "antd";
import SkeletonButton from "antd/es/skeleton/Button";
import { Outlet, useNavigate } from "react-router-dom";

function TabLayout() {
  const navigate = useNavigate();

  const { data, isLoading } = useGetCategoryQuery();

  const categories = data?.data?.map((category) => ({
    key: `/posts/category/${category.slug}`,
    label: category.name,
  }));

  return (
    <>
      {/* ANCHOR Tabs */}
      {isLoading ? (
        <Flex style={{ marginBottom: 16, marginTop: 8, width: "100%" }}>
          <SkeletonButton block size="large" />
        </Flex>
      ) : (
        <Tabs
          defaultActiveKey={location.pathname}
          tabPosition={"top"}
          onChange={(key) => navigate(key)}
          style={{
            maxWidth: "1200px",
            width: "100%",
            marginInline: "auto",
          }}
          renderTabBar={(props, TabNavList) => (
            <TabNavList {...props} mobile={false} />
          )}
          items={[
            {
              key: "/",
              label: "Home",
            },
            ...categories,
          ]}
        />
      )}
      <Outlet />
    </>
  );
}

export default TabLayout;
