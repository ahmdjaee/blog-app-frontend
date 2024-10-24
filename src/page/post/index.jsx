import PostCard from "@/components/PostCard";
import { useGetPostQuery } from "@/service/extended/postApi";
import { Col, Row, Skeleton } from "antd";
import { useParams } from "react-router-dom";

const PostByCategory = () => {
  const { category } = useParams();
  const { data: list, isLoading } = useGetPostQuery({ params: { category } });

  return (
    <Skeleton loading={isLoading}>
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 24 },
          { xs: 8, sm: 16, md: 24, lg: 24 },
        ]}
        justify={"start"}
      >
        {list?.data?.map((post, index) => (
          <Col key={index} xs={24} sm={12} xl={8} span={8}>
            <PostCard post={post} />
          </Col>
        ))}
      </Row>
    </Skeleton>
  );
};

export default PostByCategory;
