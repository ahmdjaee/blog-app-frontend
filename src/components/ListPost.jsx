import PostCard from "@/components/PostCard";
import { useGetPostQuery } from "@/service/extended/postApi";
import { Button, Col, Empty, Flex, Row, Skeleton, Spin, Typography } from "antd";

function ListPost({ onLoadMore, params = {}, title = "Latest Posts" }) {
  const { data: list, isLoading, isFetching, isError } = useGetPostQuery(params);

  return (
    <Skeleton loading={isLoading}>
      <Spin spinning={isFetching}>
        {title && <p className="cs-banner-title">{title}</p>}
        <Row
          gutter={[
            { xs: 8, sm: 16, md: 16, lg: 20 },
            { xs: 8, sm: 16, md: 16, lg: 20 },
          ]}
          justify={"start"}
        >
          {list?.data?.length === 0 || isError ? (
            <Empty
              description="No posts yet"
              style={{ margin: "120px auto 0 auto", overflowX: "clip" }}
            />
          ) : (
            list?.data?.map((post, index) => (
              <Col key={index} xs={24} sm={12} span={12}>
                <PostCard post={post} />
              </Col>
            ))
          )}
        </Row>
        <Flex vertical gap={16} style={{ marginBlock: 16 }}>
          {list?.meta?.total === list?.meta?.to ? (
            <Typography.Text type="secondary" strong style={{ margin: "0 auto" }}>
              No more posts
            </Typography.Text>
          ) : // <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No more posts" />
          !isError && list?.data?.length > 0 ? (
            <Button
              loading={isFetching}
              style={{ margin: "0 auto" }}
              onClick={onLoadMore}
            >
              Load More
            </Button>
          ) : null}
        </Flex>
      </Spin>
    </Skeleton>
  );
}

export default ListPost;
