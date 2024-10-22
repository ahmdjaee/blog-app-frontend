import PreviewPost from "@/components/PreviewPost";
import { useGetBaseQuery } from "@/service/baseApi";
import { Flex, Skeleton } from "antd";
import React from "react";
import { useParams } from "react-router-dom";

function PostDetailPanel() {
  const { slug } = useParams();
  const { data, isLoading, isFetching } = useGetBaseQuery({
    url: `/posts/${slug}`,
  });

  const post = data?.data ?? {};
  if ((isLoading, isFetching)) {
    return (
      <Flex vertical gap={16} style={{ maxWidth: "800px", margin: "0 auto" }}>
        <Skeleton.Image style={{ width: "100%", height: 300 }} />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </Flex>
    );
  }

  return (
    <PreviewPost
      author={post?.author?.name}
      content={post?.content}
      title={post?.title}
      thumbnail={post?.thumbnail}
    />
  );
}

export default PostDetailPanel;
