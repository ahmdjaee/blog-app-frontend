import PostCard from "@/components/PostCard";
import { useGetPostsQuery } from "@/service/extended/postApi";
import { Button, Empty, Skeleton, Spin } from "antd";
import { memo } from "react";

const LoadMoreButton = memo(function SomeComponent({ onLoadMore, isFetching, isEnd }) {
  if (isEnd) {
    return (
      <p  style={{ margin: "0 auto", fontWeight: "bold", color: "#888" }}>
        No more posts
      </p>
    );
  }
  return (
    <Button loading={isFetching} style={{ margin: "0 auto" }} onClick={onLoadMore}>
      Load More
    </Button>
  );
}); 

function ListPost({ onLoadMore, params = {}, title = "Latest Posts" }) {
  const { data: list, isLoading, isFetching, isError } = useGetPostsQuery({ params });

  return (
    <Skeleton loading={isLoading}>
      <Spin spinning={isFetching}>
        {list?.data?.length === 0 || isError ? (
          <Empty
            description="No posts yet"
            style={{ margin: "120px auto 0 auto", overflowX: "clip" }}
          />
        ) : (
          list?.data?.map((post) => (
            <PostCard key={post.id} style={{ marginBottom: 16 }} post={post} />
          ))
        )}
        <div style={{ marginBlock: 16, display: "flex", flexDirection: "column", gap: 16 }}>
          {!isError && list?.data?.length > 0 && (
            <LoadMoreButton
              onLoadMore={onLoadMore}
              isFetching={isFetching}
              isEnd={list?.meta?.total === list?.meta?.to}
            />
          )}
        </div>
      </Spin>
    </Skeleton>
  );
}

export default memo(ListPost);
