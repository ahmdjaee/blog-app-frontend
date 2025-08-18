import { useDeleteCommentMutation, useGetCommentsQuery } from "@/service/extended/commentApi";
import { postApi } from "@/service/extended/postApi";
import { DeleteOutlined, DownOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, List, Popconfirm, Skeleton, Space } from "antd";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function UserCommentList({ path = "" }) {
  const dispatch = useDispatch();
  const { data, isError, isFetching, isLoading } = useGetCommentsQuery({
    url: "/user/posts/comments",
  });

  const [deleteComment, { isLoading: isDeleteLoading }] = useDeleteCommentMutation();
  const handleDelete = async (id) => {
    await deleteComment(id);
    dispatch(postApi.util.invalidateTags(["Posts"]));
  };

  return (
    <List
      loading={isLoading || isFetching || isDeleteLoading}
      itemLayout="horizontal"
      // loadMore={loadMore}
      dataSource={data?.data}
      renderItem={(item) => (
        <Link to={`/posts/${item.post.slug}`}>
          <List.Item
            actions={[
              <Dropdown
                key="list-loadmore-edit"
                menu={{
                  items: [
                    // {
                    //   label: (
                    //     <Link to={`/user/posts/edit`} state={item}>
                    //       <Space>
                    //         <EditOutlined />
                    //         edit
                    //       </Space>
                    //     </Link>
                    //   ),
                    //   key: "0",
                    // },
                    {
                      label: (
                        <Popconfirm
                          title="Are you sure to delete this post?"
                          placement="topLeft"
                          onConfirm={(e) => {
                            e.preventDefault();
                            handleDelete(item.id);
                          }}
                        >
                          <Link>
                            <Space>
                              <DeleteOutlined />
                              delete
                            </Space>
                          </Link>
                        </Popconfirm>
                      ),
                      danger: true,
                      key: "1",
                    },
                  ],
                }}
                trigger={["click"]}
              >
                <Button color="default" variant="link" onClick={(e) => e.preventDefault()}>
                  <Space>
                    More
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>,
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                // avatar={<Avatar src={item.user?.avatar} />}
                title={<a>{item.content}</a>}
                description={<div className="cs-ellipsis">{item.created_at}</div>}
              />
              {/* <div>content</div> */}
            </Skeleton>
          </List.Item>
        </Link>
      )}
    />
  );
}

export default UserCommentList;
