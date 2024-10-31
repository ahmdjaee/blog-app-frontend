import { useAuth } from "@/hooks/useAuth";
import {
  useDeleteCommentMutation,
  useGetCommentByPostQuery,
  useLikeCommentMutation,
  useSendCommentMutation,
} from "@/service/extended/commentApi";
import {
  DeleteOutlined,
  EditOutlined,
  LikeOutlined,
  MessageOutlined,
  MoreOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Dropdown,
  Empty,
  Flex,
  Form,
  Grid,
  message,
  Popconfirm,
  Skeleton,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { Fragment, useEffect, useState } from "react";

// ANCHOR CommentSection
const CommentSection = ({ post = {} }) => {
  const {
    data: comments,
    isLoading: isListLoading,
    isFetching: isListFetching,
    refetch,
  } = useGetCommentByPostQuery(post?.id, {
    pollingInterval: 30000,
  });

  const [sendComment, { isLoading }] = useSendCommentMutation();

  const onFinish = async (values) => {
    await sendComment({ post_id: post?.id, ...values });
  };

  const handleRefetch = () => {
    refetch()
      .unwrap()
      .then(() => {
        message.success("Comment is up to date");
      });
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
      <Flex align="center" justify="space-between">
        <h3 style={{ marginBlock: 16 }}>Comments ({comments?.meta?.total})</h3>
        <Button
          loading={isListFetching}
          icon={<RedoOutlined />}
          onClick={handleRefetch}
        >
          Refresh
        </Button>
      </Flex>
      {isListLoading ? (
        <Skeleton />
      ) : comments?.data?.length === 0 ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No comments yet" />
      ) : (
        comments?.data?.map((comment) => (
          <Fragment key={comment?.id}>
            <CommentCard comment={comment} post={post} />
            {comment?.replies?.map((reply) => (
              <div key={reply?.id} style={{ paddingLeft: 28 }}>
                <CommentCard
                  comment={reply}
                  parentId={comment?.id}
                  post={post}
                  backgroundColor="white"
                />
              </div>
            ))}
          </Fragment>
        ))
      )}
    </>
  );
};

// ANCHOR CommentCard
function CommentCard({
  comment = {},
  post = {},
  actionStyle = {},
  bodyStyle = {},
  parentId,
  backgroundColor = "#F8F8F8",
}) {
  const authUser = useAuth();

  return (
    <Card
      className="border-none"
      styles={{
        actions: {
          border: "none",
          backgroundColor: backgroundColor,
          position: "relative",
          ...actionStyle,
        },
        body: {
          paddingTop: 16,
          paddingBottom: 8,
          backgroundColor: backgroundColor,
          ...bodyStyle,
        },
      }}
      actions={[
        <CommentActions
          key={comment?.id}
          commentId={comment?.id}
          parentId={parentId}
          totalReply={comment?.replies?.length}
          user={comment?.user}
          post={post}
          totalLikes={comment?.likes}
          liked={comment?.liked}
        />,
      ]}
      style={{
        minWidth: 300,
      }}
    >
      <Card.Meta
        avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
        title={
          <Flex align="end" gap={8}>
            {comment?.user?.name}
            <Typography.Text
              type="secondary"
              style={{ fontSize: 12, fontWeight: 400 }}
            >
              {comment?.created_at}
            </Typography.Text>
            {authUser?.id === comment?.user?.id && (
              <Dropdown
                placement="bottomRight"
                menu={{
                  items: [
                    {
                      key: "edit",
                      label: "Edit",
                      icon: <EditOutlined />,
                    },
                  ],
                }}
                trigger={["click"]}
              >
                <MoreOutlined style={{ marginLeft: "auto" }} />
              </Dropdown>
            )}
          </Flex>
        }
        description={<p>{comment?.content}</p>}
      />
    </Card>
  );
}

// ANCHOR CommentActions
function CommentActions({
  commentId,
  parentId,
  totalReply,
  user = {},
  post = {},
  totalLikes = 0,
  liked = false,
}) {
  const [show, setShow] = useState(false);
  // const [isLiked, setIsLiked] = useState(liked);
  const authUser = useAuth();
  const { md } = Grid.useBreakpoint();

  const [deleteComment] = useDeleteCommentMutation();
  const [likeComment] = useLikeCommentMutation();
  const [sendComment, { isLoading: isReplyLoading, isSuccess: isReplySuccess }] =
    useSendCommentMutation();

  const handleReply = async (value) => {
    await sendComment({
      post_id: post?.id,
      ...value,
      parent_id: parentId || commentId,
    });
  };

  const handleDelete = async () => {
    await deleteComment(commentId);
  };

  const handleLikes = async () => {
    // setIsLiked(!isLiked);
    await likeComment(commentId);
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

        <Button
          variant="text"
          onClick={handleLikes}
          color={liked ? "primary" : "default"}
        >
          <LikeOutlined />
          {totalLikes}
        </Button>
        <Button type="text" onClick={() => setShow(true)}>
          <MessageOutlined />
          {md && "Reply"}
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
              {md && "Delete"}
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
