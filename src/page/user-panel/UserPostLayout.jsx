import ContentWrapper from "@/components/ContentWrapper";
import { useGetPostsQuery } from "@/service/extended/postApi";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Tabs } from "antd";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
const UserPostLayout = () => {
  const navigate = useNavigate();
  const path = window.location.pathname.split("/").pop();

  const [params, setParams] = useState({
    keyword: "",
    page: 1,
    limit: 10,
  });

  const {
    data: list,
    isLoading: isListLoading,
    isFetching: isListFetching,
    isError: isListError,
  } = useGetPostsQuery({
    url: "user/posts/" + path,
    params: params,
  });

  return (
    <ContentWrapper>
      <Flex align="center" justify="space-between">
        <h1 style={{ paddingBlock: "20px" }}>Your Posts List</h1>
        <Link to="/user/posts/create">
          <Button type="primary">
            <PlusOutlined />
            Create Post
          </Button>
        </Link>
      </Flex>
      <Divider />
      <Tabs
        onChange={(key) => navigate(key)}
        defaultActiveKey={path}
        items={[
          {
            label: "Draft " + (list?.meta?.total_drafts ?? 0),
            key: "drafts",
          },
          {
            label: "Published " + (list?.meta?.total_published ?? 0),
            key: "published",
          },
          {
            label: "Comments " + (list?.meta?.total_comments ?? 0),
            key: "comments",
          },
        ]}
      />
      {path == "comments" ? (
        <Outlet />
      ) : (
        <Outlet context={[list, isListError, isListLoading, isListFetching]} />
      )}
    </ContentWrapper>
  );
};

export default UserPostLayout;
