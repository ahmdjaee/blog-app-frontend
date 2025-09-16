import CustomCard from "@/components/CustomCard";
import StatisticWithState from "@/components/StatisticWithState";
import { useGetBaseQuery } from "@/service/baseApi";
import { AppstoreAddOutlined, FileTextOutlined, TeamOutlined } from "@ant-design/icons";
import { Button, Col, Row, Table, Tooltip, Typography } from "antd";

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
          <StatisticWithState
            title={"Total Users"}
            value={summary?.total_users}
            isLoading={isLoading}
            isError={isError}
          >
            <TeamOutlined style={{ fontSize: 30 }} />
          </StatisticWithState>
        </Col>
        <Col span={24} md={8}>
          <StatisticWithState
            title={"Total Posts (Published)"}
            value={summary?.total_posts}
            isLoading={isLoading}
            isError={isError}
          >
            <FileTextOutlined style={{ fontSize: 30 }} />
          </StatisticWithState>
        </Col>
        <Col span={24} md={8}>
          <StatisticWithState
            title={"Total Categories"}
            value={summary?.total_categories}
            isLoading={isLoading}
            isError={isError}
          >
            <AppstoreAddOutlined style={{ fontSize: 30 }} />
          </StatisticWithState>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24} lg={12}>
          <CustomCard style={{ height: "100%" }}>
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
          </CustomCard>
        </Col>
        <Col span={24} lg={12}>
          <CustomCard style={{ height: "100%" }}>
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
          </CustomCard>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
