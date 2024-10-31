import PostCard from "@/components/PostCard";
import { useAuth } from "@/hooks/useAuth";
import { useGetBaseQuery } from "@/service/baseApi";
import { Button, Col, Divider, Row, Statistic, Typography } from "antd";

function UserDashboard() {
  const user = useAuth();
  const { data: list } = useGetBaseQuery({
    url: "/posts/popular",
    params: {
      user_id: user?.id,
    },
  });
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Statistic title="Total Posts" value={112893} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Views" value={112893} precision={2} />
        </Col>
        <Col span={12}>
          <Statistic title="Published Posts" value={112893} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Comments" value={112893} precision={2} />
        </Col>
      </Row>
      <Divider />
      <Typography.Title level={4}>Most viewed posts</Typography.Title>
      {list?.data?.map((post, index) => (
        <PostCard post={post} key={index} style={{ marginBottom: 8 }} />
      ))}
    </div>
  );
}

export default UserDashboard;
