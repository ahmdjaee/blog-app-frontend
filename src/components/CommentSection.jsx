import { useAuth } from "@/hooks/useAuth";
import {
  useDeleteCommentMutation,
  useGetCommentByPostQuery,
  useSendCommentMutation,
} from "@/service/extended/commentApi";
import { DeleteOutlined, MessageOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Empty,
  Flex,
  Form,
  Popconfirm,
  Skeleton,
  Space,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { Fragment, useEffect, useState } from "react";

const CommentSection = ({ post = {} }) => {
  const { data: comments, isLoading: isListLoading } = useGetCommentByPostQuery(
    post?.id,
    {
      pollingInterval: 30000,
    }
  );

  const [sendComment, { isLoading }] = useSendCommentMutation();
  const onFinish = async (values) => {
    await sendComment({ post_id: post?.id, ...values });
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
                actions: {
                  border: "none",
                  backgroundColor: "#F8F8F8",
                  position: "relative",
                },
                body: {
                  paddingTop: 16,
                  paddingBottom: 8,
                  backgroundColor: "#F8F8F8",
                },
              }}
              actions={[
                <CommentActions
                  key={comment?.id}
                  commentId={comment?.id}
                  totalReply={comment?.replies?.length}
                  user={comment?.user}
                  post={post}
                />,
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
            <NestedReply
              replies={comment?.replies}
              commentId={comment?.id}
              post={post}
            />
          </Fragment>
        ))
      )}
    </>
  );
};

function NestedReply({ replies, commentId, post }) {
  if (replies) {
    return replies?.map((reply) => (
      <Flex gap={16} style={{ marginLeft: 28 }} key={reply?.id}>
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
            <CommentActions
              key={reply?.id}
              commentId={commentId}
              user={reply?.user}
              post={post}
            />,
          ]}
          style={{
            flex: 1,
          }}
        >
          <Card.Meta
            avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
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
}

function CommentActions({ commentId, totalReply, user = {}, post = {} }) {
  const [show, setShow] = useState(false);
  const authUser = useAuth();

  const [deleteComment] = useDeleteCommentMutation();
  const [sendComment, { isLoading: isReplyLoading, isSuccess: isReplySuccess }] =
    useSendCommentMutation();

  const handleReply = async (value) => {
    await sendComment({ post_id: post?.id, ...value, parent_id: commentId });
  };

  const handleDelete = async () => {
    await deleteComment(commentId);
  };

  useEffect(() => {
    if (isReplySuccess) {
      setShow(false);
    }
  }, [isReplySuccess]);

  return (
    <Flex key="action-buttons" vertical style={{ paddingInline: 24 }}>
      <Flex justify="end">
        {totalReply > 0 && (
          <p
            style={{
              color: "#1890ff",
              lineHeight: "28px",
              fontWeight: 500,
              marginRight: "auto",
            }}
          >
            {totalReply} replies
          </p>
        )}
        <Button type="text" onClick={() => setShow(true)}>
          <MessageOutlined />
          Reply
        </Button>
        {(authUser?.role === "admin" ||
          authUser?.id === user?.id ||
          authUser?.id === post?.author?.id) && (
          <Popconfirm
            title="Are you sure to delete this comment?"
            placement="topRight"
            onConfirm={handleDelete}
          >
            <Button variant="text" color="danger">
              <DeleteOutlined />
              Delete
            </Button>
          </Popconfirm>
        )}
      </Flex>
      {show && (
        <Form
          name="comment-section"
          onFinish={handleReply}
          key="comment"
          style={{ width: "100%", marginRight: 8 }}
          initialValues={{
            content: `@${user?.name} `,
          }}
          onFocus={(e) => {
            const length = e.target.value.length;
            e.target.setSelectionRange(length, length);
          }}
        >
          <Form.Item name="content" style={{ margin: 0, marginBottom: 8 }}>
            <TextArea
              disabled={isReplyLoading}
              required
              autoFocus
              placeholder="Write your comment here"
            />
          </Form.Item>

          <Flex align="center" gap={8} justify="end">
            <Button type="text" size="small" onClick={() => setShow(false)}>
              Cancel
            </Button>
            <Button
              size="small"
              loading={isReplyLoading}
              htmlType="submit"
              variant="text"
              ghost
              color="primary"
            >
              Reply
            </Button>
          </Flex>
        </Form>
      )}
    </Flex>
  );
}
export default CommentSection;
