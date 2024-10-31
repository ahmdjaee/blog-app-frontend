import useDebounced from "@/hooks/useDebounce";
import { SEARCH_TIMEOUT } from "@/lib/settings";
import {
  useDeleteCommentMutation,
  useGetCommentsQuery,
} from "@/service/extended/commentApi";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Popconfirm, Space, Spin, Table } from "antd";
import { useState } from "react";
const { Search } = Input;

function CommentPanel() {
  const [params, setParams] = useState({
    keyword: "",
    page: 1,
    limit: 10,
  });

  const {
    data: list,
    isFetching: isListFetching,
    isLoading: isListLoading,
  } = useGetCommentsQuery(params);

  const [deleteComment, { isLoading: isDeleteLoading }] = useDeleteCommentMutation();

  const handleDelete = async (id) => {
    await deleteComment(id);
  };

  const setSearchParams = useDebounced((e) => {
    setParams({ ...params, keyword: e.target.value });
  }, SEARCH_TIMEOUT);

  const columns = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Comment",
      dataIndex: "content",
      key: "comment",
    },
    {
      title: "Action",
      key: "action",
      align: "right",
      render: (_, record) => (
        <Space size="small">
          <Popconfirm
            title="Are you sure to delete this comment?"
            placement="topLeft"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button size="small" variant="text" color="danger">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const dataSource = list?.data?.map((comment) => ({
    ...comment,
    user: comment?.user?.name,
    key: comment.id,
  }));

  return (
    <>
      <Flex justify="end" align="center" style={{ marginBottom: 16 }}>
        <Search
          placeholder="input search text"
          allowClear
          name="search"
          onChange={setSearchParams}
          style={{ width: 500 }}
        />
      </Flex>
      <Spin spinning={isListLoading || isListFetching || isDeleteLoading}>
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
      </Spin>
    </>
  );
}

export default CommentPanel;
