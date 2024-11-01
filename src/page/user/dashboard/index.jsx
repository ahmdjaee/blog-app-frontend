import PostCardPanel from "@/components/PostCardPanel";
import { useAuth } from "@/hooks/useAuth";
import { useGetBaseQuery } from "@/service/baseApi";
import { LoadingOutlined } from "@ant-design/icons";
import {
  Col,
  Divider,
  Empty,
  Row,
  Skeleton,
  Spin,
  Statistic,
  Typography,
} from "antd";

function useGetSummary({ path }) {
  return useGetBaseQuery(
    { url: `/summary/${path}` },
    { refetchOnMountOrArgChange: true }
  );
}

function UserDashboard() {
  const user = useAuth();
  const {
    data: list,
    isLoading,
    isFetching,
    isError,
  } = useGetBaseQuery(
    {
      url: "/posts/popular",
      params: {
        user_id: user.id,
      },
    },
    { refetchOnMountOrArgChange: true }
  );

  const {
    data: totalViews,
    isLoading: totalViewsLoading,
    isError: totalViewsError,
    isFetching: totalViewsFetching,
  } = useGetSummary({
    path: "total-views",
  });

  const {
    data: totalPost,
    isLoading: totalPostLoading,
    isError: totalPostError,
    isFetching: totalPostFetching,
  } = useGetSummary({
    path: "total-posts",
  });

  const {
    data: totalComments,
    isLoading: totalCommentsLoading,
    isError: totalCommentsError,
    isFetching: totalCommentsFetching,
  } = useGetSummary({
    path: "total-comments",
  });

  const {
    data: publishedPosts,
    isLoading: publishedPostsLoading,
    isError: publishedPostsError,
    isFetching: publishedPostsFetching,
  } = useGetSummary({
    path: "published-posts",
  });

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <StatisticWithState
            title="Total Posts"
            value={totalPost?.data}
            isLoading={totalPostLoading}
            isError={totalPostError}
            isFetching={totalPostFetching}
          />
        </Col>
        <Col span={12}>
          <StatisticWithState
            title="Total Views"
            value={totalViews?.data}
            isLoading={totalViewsLoading}
            isError={totalViewsError}
            isFetching={totalViewsFetching}
          />
        </Col>
        <Col span={12}>
          <StatisticWithState
            title="Published Posts"
            value={publishedPosts?.data}
            isLoading={publishedPostsLoading}
            isError={publishedPostsError}
            isFetching={publishedPostsFetching}
          />
        </Col>
        <Col span={12}>
          <StatisticWithState
            title="Total Comments"
            value={totalComments?.data}
            isLoading={totalCommentsLoading}
            isError={totalCommentsError}
            isFetching={totalCommentsFetching}
          />
        </Col>
      </Row>
      <Divider />
      <Typography.Title level={4}>Your most popular posts</Typography.Title>
      {isLoading ? (
        <Skeleton />
      ) : !list?.data || list?.data?.length === 0 || isError ? (
        <Empty
          description="You have no posts yet"
          style={{ margin: "60px auto", overflowX: "clip" }}
        />
      ) : (
        <Spin spinning={isFetching} indicator={<LoadingOutlined />}>
          {list?.data?.map((post, index) => (
            <PostCardPanel key={index} post={post} style={{ marginBottom: 8 }} />
          ))}
        </Spin>
      )}
    </div>
  );
}

function StatisticWithState({ title, value = 0, isLoading, isError, isFetching }) {
  return (
    <Spin spinning={isLoading || isFetching} indicator={<LoadingOutlined />}>
      {isError ? (
        <Typography.Text type="danger">Oops something went wrong</Typography.Text>
      ) : (
        <Statistic title={title} value={value} />
      )}
    </Spin>
  );
}
export default UserDashboard;
