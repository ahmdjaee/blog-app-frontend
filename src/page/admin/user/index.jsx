import { useDeleteCategoryMutation } from "@/service/extended/categoryApi";
import { useDeleteUserMutation, useGetUserQuery } from "@/service/extended/userApi";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Popconfirm, Space, Spin, Table } from "antd";
import { useState } from "react";
import CreateCategoryForm from "./create";
import UpdateCategoryForm from "./edit";
import useDebounced from "@/hooks/useDebounce";
const { Search } = Input;

function UserPanel() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [category, setCategory] = useState({});
  const [params, setParams] = useState({
    search: "",
    page: 1,
    limit: 10,
  });

  const {
    data: list,
    isFetching: isListFetching,
    isLoading: isListLoading,
  } = useGetUserQuery(params);

  const [deleteUser, { isLoading: isDeleteLoading }] = useDeleteUserMutation();

  const handleDelete = async (id) => {
    await deleteUser(id);
  };

  const setSearchParams = useDebounced((e) => {
    setParams({ ...params, search: e.target.value });
  }, 500);

  const showCreateDrawer = () => {
    setOpenCreate(true);
  };

  const showUpdateDrawer = (record) => {
    setCategory(record);
    setOpenUpdate(true);
  };

  const onCloseCreate = () => {
    setOpenCreate(false);
  };

  const onCloseUpdate = () => {
    setCategory({});
    setOpenUpdate(false);
  };

  const onSearch = (e) => console.log(e.target.value);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      align: "right",
      render: (_, record) => (
        <Space size="small">
          <Button
            size="small"
            variant="text"
            color="primary"
            onClick={() => showUpdateDrawer(record)}
          >
            <EditOutlined />
          </Button>

          <Popconfirm
            title="Are you sure to delete this category?"
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

  const dataSource = list?.data?.map((user) => ({
    ...user,
    key: user.id,
  }));

  return (
    <>
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={showCreateDrawer}>
          Create User
        </Button>
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
          onChange={(pagination, filters, sorter) => {
            setParams({
              page: pagination.current,
              limit: pagination.pageSize,
            });
          }}
        />
        ;
      </Spin>
      <CreateCategoryForm open={openCreate} onClose={onCloseCreate} />
      <UpdateCategoryForm
        open={openUpdate}
        onClose={onCloseUpdate}
        data={category}
      />
    </>
  );
}

export default UserPanel;
