import CommentSection from "@/components/CommentSection";
import PreviewPost from "@/components/PreviewPost";
import { useGetBaseQuery } from "@/service/baseApi";
import { Flex, Skeleton } from "antd";
import { useLocation } from "react-router-dom";

function PostDetailPanel() {
  const { state } = useLocation();

  const { data, isLoading, isFetching } = useGetBaseQuery({
    url: `/posts/${state?.slug}`,
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
    <>
      <PreviewPost
        author={post?.author?.name}
        content={post?.content}
        title={post?.title}
        thumbnail={post?.thumbnail}
      />
      <section style={{ marginTop: 24, maxWidth: 800, marginInline: "auto" }}>
        <CommentSection postId={state?.id} />
      </section>
    </>
  );
}

export default PostDetailPanel;
