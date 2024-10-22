import {
  useDeleteCategoryMutation,
  useGetCategoryQuery,
} from "@/service/extended/categoryApi";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Popconfirm, Space, Spin, Table } from "antd";
import { useState } from "react";
import CreateCategoryForm from "./create";
import UpdateCategoryForm from "./edit";
const { Search } = Input;

function CategoryPanel() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [category, setCategory] = useState({});
  const [search, setSearch] = useState("");
  
  const {
    data: list,
    isFetching: isListFetching,
    isLoading: isListLoading,
  } = useGetCategoryQuery();

  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();

  const handleDelete = async (id) => {
    await deleteCategory(id);
  };

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

  const onSearch = (e) => {
    setSearch(e.target.value);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Action",
      key: "action",
      align: "right",
      render: (_, record) => (
        <Space size="small">
          <Button
            size="small" variant="text" color="primary"
            onClick={() => showUpdateDrawer(record)}
          >
            <EditOutlined />
          </Button>

          <Popconfirm
            title="Are you sure to delete this category?"
            placement="topLeft"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button size="small" variant="text" color="danger" >
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const dataSource = list?.data
    ?.filter((category) => {
      const lowerCaseSearch = search.toLowerCase();

      return (
        category?.name.toLowerCase().includes(lowerCaseSearch) ||
        category?.slug.toLowerCase().includes(lowerCaseSearch)
      );
    })
    .map((category) => ({
      key: category.id,
      name: category.name,
      slug: category.slug,
    }));

  return (
    <>
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={showCreateDrawer}>
          Create Category
        </Button>
        <Search
          placeholder="input search text"
          allowClear
          name="search"
          onChange={onSearch}
          style={{ width: 500 }}
        />
      </Flex>
      <Spin spinning={isListLoading || isListFetching || isLoading}>
        <Table columns={columns} dataSource={dataSource} />;
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

export default CategoryPanel;
