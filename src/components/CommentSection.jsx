import {
  useGetCommentByPostQuery,
  useSendCommentMutation,
} from "@/service/extended/commentApi";
import { MessageOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Empty,
  Flex,
  Form,
  Skeleton,
  Space,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { Fragment } from "react";

const CommentSection = ({ postId }) => {
  const { data: comments, isLoading: isListLoading } = useGetCommentByPostQuery(
    postId,
    {
      pollingInterval: 30000,
    }
  );

  const [sendComment, { isLoading }] = useSendCommentMutation();
  const onFinish = async (values) => {
    await sendComment({ post_id: postId, ...values });
  };

  const handleReplies = (replies) => {
    if (replies) {
      return replies?.map((reply) => (
        <Flex gap={16} style={{ marginLeft: 28 }} key={reply?.id}>
          {/* <Divider
            type="vertical"
            style={{
              borderColor: "lightgray",
              borderWidth: 2,
              height: "inherit",
            }}
          /> */}
          <Card
            key={reply?.id}
            styles={{
              actions: {
                border: "none",
              },
              body: {
                paddingTop: 16,
                paddingBottom: 8,
              },
            }}
            actions={[
              <Flex
                align="center"
                justify="end"
                style={{ paddingInline: 24 }}
                key="message"
                gap={8}
              >
                <MessageOutlined />
                <Typography.Text>Reply</Typography.Text>
              </Flex>,
            ]}
            style={{
              flex: 1,
            }}
          >
            <Card.Meta
              avatar={
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
              }
              title={
                <Space>
                  {reply?.user?.name}
                  <Typography.Text
                    type="secondary"
                    style={{ fontSize: 12, fontWeight: 400 }}
                  >
                    {reply?.created_at}
                  </Typography.Text>
                </Space>
              }
              description={<p>{reply?.content}</p>}
            />
          </Card>
        </Flex>
      ));
    }
  };

  return (
    <>
      <Form name="comment-section" onFinish={onFinish}>
        <h3>Leave a comment</h3>
        <Form.Item name="content" style={{ marginTop: 10 }}>
          <TextArea required rows={4} placeholder="Write your comment here" />
        </Form.Item>
        <Button loading={isLoading} htmlType="submit" type="primary">
          Submit
        </Button>
      </Form>
      <h3 style={{ marginBlock: 16 }}>Comments ({comments?.meta?.total})</h3>
      {isListLoading ? (
        <Skeleton />
      ) : comments?.data?.length === 0 ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No comments yet" />
      ) : (
        comments?.data?.map((comment) => (
          <Fragment key={comment?.id}>
            <Card
              styles={{
                actions: { border: "none", backgroundColor: "#F8F8F8" },
                body: {
                  paddingTop: 16,
                  paddingBottom: 8,
                  backgroundColor: "#F8F8F8",
                },
              }}
              actions={[
                <Flex
                  align="center"
                  justify="end"
                  style={{ paddingInline: 24 }}
                  key="message"
                  gap={8}
                >
                  <MessageOutlined />
                  <Typography.Text>Reply</Typography.Text>
                </Flex>,
              ]}
              style={{
                minWidth: 300,
              }}
            >
              <Card.Meta
                avatar={
                  <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                }
                title={
                  <Space>
                    {comment?.user?.name}
                    <Typography.Text
                      type="secondary"
                      style={{ fontSize: 12, fontWeight: 400 }}
                    >
                      {comment?.created_at}
                    </Typography.Text>
                  </Space>
                }
                description={<p>{comment?.content}</p>}
              />
            </Card>
            {handleReplies(comment?.replies)}
          </Fragment>
        ))
      )}
    </>
  );
};

export default CommentSection;
