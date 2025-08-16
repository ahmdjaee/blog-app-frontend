import { LoadingOutlined } from "@ant-design/icons";
import { Col, Divider, Row, Space, Spin, Statistic, Table, Tag, Typography } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const Dashboard = () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <StatisticWithState
            title={"Total Users"}
            value={0}
            isLoading={false}
            isError={false}
            isFetching={false}
          />
        </Col>
        <Col span={12}>
          <StatisticWithState
            title={"Total Posts"}
            value={0}
            isLoading={false}
            isError={false}
            isFetching={false}
          />
        </Col>
        <Col span={12}>
          <StatisticWithState
            title={"Total Category"}
            value={0}
            isLoading={false}
            isError={false}
            isFetching={false}
          />
        </Col>
        <Col span={12}>
          <StatisticWithState
            title={"Total Views"}
            value={0}
            isLoading={false}
            isError={false}
            isFetching={false}
          />
        </Col>
      </Row>
      <Divider />
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

function StatisticWithState({ title, value = 0, isLoading, isError, isFetching }) {
  return (
    <Spin spinning={isLoading || isFetching} indicator={<LoadingOutlined />}>
      {isError ? (
        <Typography.Text type="danger">Oops something went wrong</Typography.Text>
      ) : (
        <Statistic title={title} value={value} />
      )}
    </Spin>
  );
}

export default Dashboard;
