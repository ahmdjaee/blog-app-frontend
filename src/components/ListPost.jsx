import PostCard from "@/components/PostCard";
import { useGetPostsQuery } from "@/service/extended/postApi";
import { Button, Empty, Flex, Skeleton, Spin, Typography } from "antd";

function ListPost({ onLoadMore, params = {}, title = "Latest Posts" }) {
  const { data: list, isLoading, isFetching, isError } = useGetPostsQuery({params});

  return (
    <Skeleton loading={isLoading}>
      <Spin spinning={isFetching}>
        {/* {title && <p className="cs-banner-title">{title}</p>} */}
        {list?.data?.length === 0 || isError ? (
          <Empty
            description="No posts yet"
            style={{ margin: "120px auto 0 auto", overflowX: "clip" }}
          />
        ) : (
          list?.data?.map((post, index) => (
            <PostCard key={index} style={{ marginBottom: 16 }} post={post} />
          ))
        )}
        <Flex vertical gap={16} style={{ marginBlock: 16 }}>
          {list?.meta?.total === list?.meta?.to ? (
            <Typography.Text type="secondary" strong style={{ margin: "0 auto" }}>
              No more posts
            </Typography.Text>
          ) : // <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No more posts" />
          !isError && list?.data?.length > 0 ? (
            <Button loading={isFetching} style={{ margin: "0 auto" }} onClick={onLoadMore}>
              Load More
            </Button>
          ) : null}
        </Flex>
      </Spin>
    </Skeleton>
  );
}

export default ListPost;
