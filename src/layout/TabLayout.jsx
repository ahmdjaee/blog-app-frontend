import { useGetCategoryQuery } from "@/service/extended/categoryApi";
import styled from "@emotion/styled";
import { Avatar, Col, Flex, List, Row, Tabs } from "antd";
import SkeletonButton from "antd/es/skeleton/Button";
import { Outlet, useNavigate } from "react-router-dom";

const Aside = styled.div`
  padding: 16px;
  padding-top: 0;
  border-left: 1px solid #f0f0f0;
`;
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
        <Col span={16}>
          <Outlet />
        </Col>
        <Col span={8}>
          <Aside>
            <p className="cs-banner-title">Recommendation</p>
            <List
              itemLayout="horizontal"
              dataSource={Array.from({ length: 10 }, (_, i) => ({
                id: i,
                title: `Dummy Title ${i}`,
                description: `Dummy Description ${i}`,
              }))}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />
                    }
                    title={<a href="https://ant.design">{item.title}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </List.Item>
              )}
            />
          </Aside>
        </Col>
      </Row>
    </>
  );
}

export default TabLayout;
