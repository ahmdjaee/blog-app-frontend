import { LikeFilled, MessageFilled } from "@ant-design/icons";
import { Avatar, Col, Grid, Image, Row, theme } from "antd";
import { useNavigate } from "react-router-dom";
import BookmarkToggle from "./BookmarkToggle";
import { styled } from "styled-system/jsx";

const Card = styled.div`
  height: 100%;
  min-height: 150px;
  padding: 16px ;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
`;

function PostCard({ post = {} }) {
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const { md } = Grid.useBreakpoint();

  return (
    <Card >
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
        <Avatar
          size={"small"}
          style={{
            background: post?.author?.avatar === null && token.colorPrimary,
            verticalAlign: "middle",
          }}
          src={post?.author?.avatar}
        >
          {post?.author?.name.charAt(0).toUpperCase()}
        </Avatar>
        <p>{post?.author?.name}</p>|
        <p
          className="cs-ellipsis-1"
          style={{ marginRight: 8, fontWeight: "600", color: token.colorPrimary }}
        >
          {post.category.name}
        </p>
      </div>
      <Row gutter={{ xs: 8, sm: 10, md: 12, lg: 16 }} style={{ width: "100%" }}>
        <Col span={6}>
          <Image
            width={"100%"}
            style={{
              objectFit: "cover",
              objectPosition: "top",
              aspectRatio: "1/1",
            }}
            src={post.thumbnail}
            alt={post.title}
          />
        </Col>
        <Col span={18}>
          <div
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
            onClick={() => navigate(`/posts/${post.slug}`, { state: { post } })}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2
                style={{ marginBottom: md ? 8 : 0, fontWeight: "700", fontSize: md ? 24 : 20,  }}
                className="cs-ellipsis"
              >
                {post.title}
              </h2>
              <BookmarkToggle isMark={post?.marked} postId={post?.id} />
            </div>
            <h3
              style={{ marginBottom: 16, fontWeight: "normal", color: "rgb(107, 107, 107)", lineHeight: 1.5 }}
              className="cs-ellipsis"
            >
              {post?.sub_title}
            </h3>
            <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between" }}>
              <p style={{ textWrap: "nowrap" }}>{post.published_at}</p>

              <div
                style={{
                  marginTop: "6px",
                  display: "flex",
                  justifyContent: "end",
                  gap: 16,
                  marginRight: "8px",
                }}
              >
                {/* <IconText icon={EyeFilled} text={100} /> */}
                <IconText icon={MessageFilled} text={post?.comments} />
                <IconText icon={LikeFilled} text={post?.likes} />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
}

function IconText({ icon: Icon, text }) {
  const { token } = theme.useToken();
  return (
    <div style={{ alignItems: "center", gap: 4, display: "flex" }}>
      <Icon style={{ color: token.colorTextSecondary }} />{" "}
      <p style={{ color: token.colorTextSecondary }}>{text}</p>
    </div>
  );
}

export default PostCard;
