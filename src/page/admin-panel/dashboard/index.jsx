import { useGetBaseQuery } from "@/service/baseApi";
import {
  AppstoreAddOutlined,
  FileTextOutlined,
  LoadingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, Col, Flex, Row, Spin, Statistic, Table, Tooltip, Typography } from "antd";

const { Title } = Typography;

const postColumns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (title) => (
      <Tooltip placement="topLeft" title={title}>
        <div className="cs-ellipsis" style={{ maxWidth: 200 }}>
          {title}
        </div>
      </Tooltip>
    ),
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (category) => (
      <Button color="primary" variant="filled">
        {category?.name}
      </Button>
    ),
  },
  {
    title: "Published At",
    dataIndex: "published_at",
    key: "published_at",
  },
];

const userColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Date",
    dataIndex: "created_at",
    key: "created_at",
  },
];

const MainCard = styled.div`
  box-shadow: rgba(22, 119, 255, 0.116) 0px 7px 29px 0px;
  padding: 28px 28px;
  background-color: white;
  border-radius: 4px;
  height: 100%;
`;

const Dashboard = () => {
  const { isError, data, isLoading } = useGetBaseQuery(
    { url: "admin/dashboard/summary" },
    { refetchOnMountOrArgChange: true }
  );

  const { data: posts, isLoading: isLoadingPosts } = useGetBaseQuery(
    { url: "admin/dashboard/latest-posts" },
    { refetchOnMountOrArgChange: true }
  );

  const { data: users, isLoading: isLoadingUsers } = useGetBaseQuery(
    { url: "admin/dashboard/latest-users" },
    { refetchOnMountOrArgChange: true }
  );

  const summary = data?.data;

  const postsSource = posts?.data.map((post) => post);
  const usersSource = users?.data.map((user) => user);

  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col span={24} md={8}>
          <MainCard>
            <StatisticWithState
              title={"Total Users"}
              value={summary?.total_users}
              isLoading={isLoading}
              isError={isError}
            >
              <TeamOutlined style={{ fontSize: 30 }} />
            </StatisticWithState>
          </MainCard>
        </Col>
        <Col span={24} md={8}>
          <MainCard>
            <StatisticWithState
              title={"Total Posts (Published)"}
              value={summary?.total_posts}
              isLoading={isLoading}
              isError={isError}
            >
              <FileTextOutlined style={{ fontSize: 30 }} />
            </StatisticWithState>
          </MainCard>
        </Col>
        <Col span={24} md={8}>
          <MainCard>
            <StatisticWithState
              title={"Total Categories"}
              value={summary?.total_categories}
              isLoading={isLoading}
              isError={isError}
            >
              <AppstoreAddOutlined style={{ fontSize: 30 }} />
            </StatisticWithState>
          </MainCard>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24} lg={12}>
          <MainCard>
            <Title level={4} style={{ marginBottom: 12 }}>
              Latest Posts (Published)
            </Title>
            <Table
              loading={isLoadingPosts}
              style={{ minHeight: 400 }}
              columns={postColumns}
              dataSource={postsSource}
              pagination={false}
            />
          </MainCard>
        </Col>
        <Col span={24} lg={12}>
          <MainCard>
            <Title level={4} style={{ marginBottom: 12 }}>
              Latest Users
            </Title>
            <Table
              loading={isLoadingUsers}
              style={{ minHeight: 400 }}
              columns={userColumns}
              dataSource={usersSource}
              pagination={false}
            />
          </MainCard>
        </Col>
      </Row>
    </div>
  );
};

function StatisticWithState({ title, value = 0, isLoading, isError, children }) {
  return (
    <Spin spinning={isLoading} indicator={<LoadingOutlined />}>
      {isError ? (
        <Typography.Text type="danger">Oops something went wrong</Typography.Text>
      ) : (
        <Flex justify="space-between">
          <Statistic title={title} value={value} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div
              style={{
                padding: 20,
                borderRadius: "50%",
                backgroundColor: "rgba(22, 119, 255, 0.193)",
                color: "rgb(22, 119, 255)",
              }}
            >
              {children}
            </div>
          </div>
        </Flex>
      )}
    </Spin>
  );
}

export default Dashboard;
