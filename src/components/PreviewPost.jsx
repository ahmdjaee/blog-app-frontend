import { useLikePostMutation } from "@/service/extended/postApi";
import { LikeOutlined, MessageOutlined } from "@ant-design/icons";
import { Avatar, Button, Divider, Flex, Space, Typography } from "antd";
import BookmarkToggle from "./BookmarkToggle";

function PreviewPost({
  id,
  title,
  sub_title,
  thumbnail,
  content,
  author,
  liked = false,
  marked = false,
  likes = 0,
  comments = 0,
  published_at = "2 weeks ago",
}) {
  const [likePost] = useLikePostMutation();

  const handleLikes = async () => {
    await likePost(id);
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <div className="cs-blog-content">
         <img src={thumbnail} alt="" style={{ width: "100%", objectFit: "contain" }} />
      </div>
      <section style={{ marginBlock: 20 }}>
        <Typography.Title level={3} style={{ fontWeight: "700", }}>
          {title}
        </Typography.Title>
        <Typography.Title
          level={4}
          style={{
            marginBottom: 16,
            marginTop: 0,
            fontWeight: "normal",
            color: "rgb(107, 107, 107)",
          }}
          ellipsis={{ rows: 2 }}
        >
          {sub_title}
        </Typography.Title>
        <Space>
          <Avatar src={thumbnail}></Avatar>
          <Typography.Text>
            <a href="">{author}</a> | Published : {published_at}
          </Typography.Text>
        </Space>
        <Divider />
        <Flex align="center" justify="space-between">
          <Space>
            {/* <Button variant="text" onClick={() => {}} color={false ? "primary" : "default"}>
              <EyeOutlined style={{ fontSize: 16 }} />
              {12}
            </Button> */}
            <Button variant="text" onClick={handleLikes} color={liked ? "primary" : "default"}>
              <LikeOutlined style={{ fontSize: 16 }} />
              {likes}
            </Button>
            <Button
              variant="text"
              onClick={() => {
                window.scrollTo({
                  top: document.getElementById("commentSectionForm").offsetTop - 100,
                  behavior: "smooth",
                });
              }}
              color="default"
            >
              <MessageOutlined style={{ fontSize: 16 }} />
              {comments}
            </Button>
          </Space>
          <BookmarkToggle isMark={marked} postId={id} />
        </Flex>
        <Divider />
      </section>
      <article className="cs-blog-content" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export default PreviewPost;
