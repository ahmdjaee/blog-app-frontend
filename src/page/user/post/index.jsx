import PostCardPanel from "@/components/PostCardPanel";
import { useAuth } from "@/hooks/useAuth";
import useDebounced from "@/hooks/useDebounce";
import { SEARCH_TIMEOUT } from "@/lib/settings";
import { useDeletePostMutation, useGetPostQuery } from "@/service/extended/postApi";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import {
  Button,
  Empty,
  Flex,
  Grid,
  Image,
  Input,
  Pagination,
  Popconfirm,
  Space,
  Spin,
  Table,
  Tooltip,
  Typography,
} from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
const { Search } = Input;
const { Text } = Typography;

const UserPostPanel = () => {
  const user = useAuth();
  const { md } = Grid.useBreakpoint();

  const [params, setParams] = useState({
    keyword: "",
    page: 1,
    limit: 10,
    user_id: user.id,
  });

  const {
    data: list,
    isLoading: isListLoading,
    isFetching: isListFetching,
    isError: isListError,
  } = useGetPostQuery(params);

  const [deletePost, { isLoading: isDeleteLoading }] = useDeletePostMutation();

  const setSearchParams = useDebounced((e) => {
    setParams({ ...params, keyword: e.target.value });
  }, SEARCH_TIMEOUT);

  const handleDelete = async (id) => {
    await deletePost(id);
  };

  const columns = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (_, record) => (
        <Image
          width={60}
          height={60}
          style={{
            borderRadius: "10px",
            objectFit: "cover",
            objectPosition: "top",
          }}
          src={record.thumbnail}
          fallback="data:image/png;base64,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"
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title) => (
        <Tooltip className="cs-ellipsis" placement="topLeft" title={title}>
          {title}
        </Tooltip>
      ),
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      render: (slug) => (
        <Tooltip className="cs-ellipsis" placement="topLeft" title={slug}>
          {slug}
        </Tooltip>
      ),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      render: (author) => <>{author?.name}</>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => <Text type="success">{category?.name}</Text>,
    },
    {
      title: "Published",
      dataIndex: "published",
      key: "published",
      render: (published) => (
        <Text type={published ? "success" : "danger"}>
          {published ? "Published" : "Draft"}
        </Text>
      ),
    },
    {
      title: "Published At",
      dataIndex: "published_at",
      key: "published_at",
    },
    {
      title: "Action",
      key: "action",
      align: "right",
      render: (_, record) => (
        <Space size="small">
          <Link to={`/user/posts/${record.slug}`} state={record}>
            <Button color="primary" size="small" variant="text">
              <EyeOutlined />
            </Button>
          </Link>

          <Link to={`/user/posts/edit`} state={record}>
            <Button color="primary" size="small" variant="text">
              <EditOutlined />
            </Button>
          </Link>

          <Popconfirm
            title="Are you sure to delete this post?"
            placement="topLeft"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button size="small" color="danger" variant="text">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const dataSource = list?.data.map((post) => post);

  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        gap={16}
        style={{ marginBottom: 16 }}
      >
        <Link to="/user/posts/create">
          <Button type="primary" onClick={() => {}}>
            Create Post
          </Button>
        </Link>
        <Search
          placeholder="input search text"
          allowClear
          name="search"
          onChange={setSearchParams}
          style={{ width: 500 }}
        />
      </Flex>
      <Spin spinning={isListLoading || isListFetching || isDeleteLoading}>
        {md ? (
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={{
              current: params.page,
              pageSize: params.limit,
              total: list?.meta?.total,
              showTotal: (total) => `Total ${total} items`,
            }}
            onChange={(pagination) => {
              setParams({
                page: pagination.current,
                limit: pagination.pageSize,
              });
            }}
          />
        ) : (
          <>
            { !list?.data ||list?.data?.length === 0 || isListError ? (
              <Empty
                description="No posts found"
                style={{ margin: "60px auto", overflowX: "clip" }}
              />
            ) : (
              <>
                {list?.data?.map((post) => (
                  <PostCardPanel
                    post={post}
                    key={post.id}
                    handleDelete={() => handleDelete(post.id)}
                  />
                ))}
                <Flex style={{ paddingTop: 20 }} justify="end">
                  <Pagination
                    pageSize={params.limit}
                    current={params.page}
                    onChange={(page, pageSize) => {
                      setParams({
                        ...params,
                        page: page,
                        limit: pageSize,
                      });
                    }}
                    total={list?.meta?.total}
                  />
                </Flex>
              </>
            )}
          </>
        )}
      </Spin>
    </>
  );
};

export default UserPostPanel;
