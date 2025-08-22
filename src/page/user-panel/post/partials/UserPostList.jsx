import { useDeletePostMutation } from "@/service/extended/postApi";
import { DeleteOutlined, DownOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, List, Popconfirm, Skeleton, Space } from "antd";
import { Link, useOutletContext } from "react-router-dom";

function UserPostList({ path = "" }) {

  const [list, isListError, isListLoading, isListFetching] = useOutletContext();

  const [deletePost, { isLoading: isDeleteLoading }] = useDeletePostMutation();
  const handleDelete = async (id) => {
    await deletePost(id);
  };

  return (
    <List
      loading={isListLoading || isListFetching || isDeleteLoading}
      
      itemLayout="horizontal"
      // loadMore={loadMore}
      dataSource={list?.data}
      renderItem={(item) => (
        <Link to={`/posts/${item.slug}`} state={item}>
          <List.Item
            actions={[
              <Dropdown
                key="list-loadmore-edit"
                menu={{
                  items: [
                    {
                      label: (
                        <Link to={`/user/posts/edit`} state={item}>
                          <Space>
                            <EditOutlined />
                            edit
                          </Space>
                        </Link>
                      ),
                      key: "0",
                    },
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
                avatar={<Avatar src={item.thumbnail} />}
                title={<a href="https://ant.design">{item.title}</a>}
                description={<div className="cs-ellipsis">
                  {item.sub_title}
                </div>}
              />
              {/* <div>content</div> */}
            </Skeleton>
          </List.Item>
        </Link>
      )}
    />
  );
}

export default UserPostList;
