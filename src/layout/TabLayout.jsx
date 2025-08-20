import { useGetCategoryQuery } from "@/service/extended/categoryApi";
import styled from "@emotion/styled";
import { Avatar, Col, Flex, List, Row, Tabs } from "antd";
import SkeletonButton from "antd/es/skeleton/Button";
import { Outlet, useNavigate } from "react-router-dom";
import RecommendationAside from "./partials/RecommendationAside";

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
          renderTabBar={(props, TabNavList) => <TabNavList {...props} mobile={false} />}
          items={[
            {
              key: "/",
              label: "Home",
            },
            ...(categories || []),
          ]}
        />
      )}
      <Row gutter={[16, 16]}>
        <Col span={24} lg={16}>
          <Outlet />
        </Col>
        <Col span={0} lg={8}>
          <RecommendationAside />
        </Col>
      </Row>
    </>
  );
}

export default TabLayout;
