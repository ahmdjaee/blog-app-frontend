import { LikeFilled, MessageFilled } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Avatar, Col, Flex, Grid, Image, Row, Space, theme, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import BookmarkToggle from "./BookmarkToggle";
const { Text, Title } = Typography;

const Card = styled.div`
  height: 100%;
  min-height: 150px;
  padding: 16px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
`;

function PostCard({ post = {} }) {
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const { md } = Grid.useBreakpoint();

  return (
    <Card>
      <Flex justify="space-between">
        <Space style={{ marginBottom: 10 }}>
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
          <Text>{post?.author?.name}</Text>|
          <Text
            className="cs-ellipsis-1"
            style={{ marginRight: 8, fontWeight: "600", color: token.colorPrimary }}
          >
            {post.category.name}
          </Text>
        </Space>
      </Flex>
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
          <Flex
            vertical
            style={{ height: "100%" }}
            onClick={() => navigate(`/posts/${post.slug}`, { state: { post } })}
          >
            <Flex justify="space-between">
              <Title
                level={md ? 3 : 4}
                style={{ marginBottom: md ? 8 : 0, fontWeight: "700" }}
                ellipsis={{ rows: 2 }}
              >
                {post.title}
              </Title>
              <BookmarkToggle isMark={post?.marked} postId={post?.id} />
            </Flex>
            <Title
              level={5}
              style={{ marginBottom: 16, fontWeight: "normal", color: "rgb(107, 107, 107)" }}
              ellipsis={{ rows: 2 }}
            >
              {post?.sub_title}
            </Title>
            <Flex justify="space-between" style={{ marginTop: "auto" }}>
              <Text style={{ textWrap: "nowrap" }}>{post.published_at}</Text>

              <Flex gap={16} justify="end" style={{ marginTop: "6px", marginRight: "8px" }}>
                {/* <IconText icon={EyeFilled} text={100} /> */}
                <IconText icon={MessageFilled} text={post?.comments} />
                <IconText icon={LikeFilled} text={post?.likes} />
              </Flex>
            </Flex>
          </Flex>
        </Col>
      </Row>
    </Card>
  );
}

function IconText({ icon: Icon, text }) {
  const { token } = theme.useToken();
  return (
    <Flex align="center" gap={4}>
      <Icon style={{ color: token.colorTextSecondary }} />{" "}
      <Text style={{ color: token.colorTextSecondary }}>{text}</Text>
    </Flex>
  );
}

export default PostCard;
