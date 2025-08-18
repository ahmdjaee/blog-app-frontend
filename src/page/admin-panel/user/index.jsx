import useDebounced from "@/hooks/useDebounce";
import { SEARCH_TIMEOUT } from "@/lib/settings";
import { useDeleteUserMutation, useGetUserQuery } from "@/service/extended/userApi";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Popconfirm, Space, Spin, Table } from "antd";
import { useState } from "react";
import CreateUserForm from "./create";
import UpdateUserForm from "./edit";
const { Search } = Input;

function UserPanel() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [user, setUser] = useState({});

  const [params, setParams] = useState({
    keyword: "",
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
    setParams({ ...params, keyword: e.target.value });
  }, SEARCH_TIMEOUT);

  const showCreateDrawer = () => {
    setOpenCreate(true);
  };

  const showUpdateDrawer = (record) => {
    setUser(record);
    setOpenUpdate(true);
  };

  const onCloseCreate = () => {
    setOpenCreate(false);
  };

  const onCloseUpdate = () => {
    setUser({});
    setOpenUpdate(false);
  };

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
            title="Are you sure to delete this user?"
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
          onChange={(pagination) => {
            setParams({
              page: pagination.current,
              limit: pagination.pageSize,
            });
          }}
        />
        ;
      </Spin>
      <CreateUserForm open={openCreate} onClose={onCloseCreate} />
      <UpdateUserForm open={openUpdate} onClose={onCloseUpdate} data={user} />
    </>
  );
}

export default UserPanel;
