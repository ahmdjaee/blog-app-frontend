import CommentSection from "@/components/CommentSection";
import PreviewPost from "@/components/PreviewPost";
import { useGetBaseQuery } from "@/service/baseApi";
import { Flex, Skeleton } from "antd";
import { useParams } from "react-router-dom";

function PostDetailPanel() {
  const { slug } = useParams();
  const { data, isLoading, isFetching } = useGetBaseQuery({
    url: `/posts/${slug}`,
  });

  const post = data?.data;

  return (
    <>
      {(isLoading, isFetching) ? (
        <Flex vertical gap={24} style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Skeleton.Image style={{ width: "100%", height: "50vh" }} />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Flex>
      ) : (
        <PreviewPost {...post} author={post?.author.name} />
      )}

      <section style={{ marginBlock: 64, maxWidth: 800, marginInline: "auto" }}>
        {post?.id && <CommentSection post={post} />}
      </section>
    </>
  );
}

export default PostDetailPanel;
