import ContentWrapper from "@/components/ContentWrapper";
import PostCard from "@/components/PostCard";
import { useGetBookmarksQuery } from "@/service/extended/bookmarkApi";
import styled from "@emotion/styled";
import { Button, Empty, Flex, Skeleton, Spin, Typography } from "antd";
import { useState } from "react";

const CardHeader = styled.div`
  background-color: rgb(22, 119, 255);
  color: white;
  padding: 36px;
  position: relative;

  svg {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
`;

function Bookmark() {
  const [params, setParams] = useState({
    limit: 10,
    page: 1,
  });

  const { data: list, isLoading, isFetching, isError } = useGetBookmarksQuery({ params });

  return (
    <ContentWrapper>
      <CardHeader>
        <h1 style={{ paddingBlock: "20px" }}>Your Bookmarks List</h1>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={283}
          height={174}
          fill="none"
          viewBox="0 0 283 174"
        >
          <circle cx={141.5} cy={87.5} r={141.5} fill="#E8F3E8" opacity={0.15} />
          <circle cx={141.5} cy={87.5} r={29.5} fill="#fff" />
          <path
            fill="#0F730C"
            fillRule="evenodd"
            d="M148.714 74.322a.656.656 0 011.308.067v3.278h3.278a.656.656 0 110 1.31h-3.278v3.278a.655.655 0 11-1.311 0v-3.277h-3.278a.655.655 0 010-1.311h3.278v-3.278zm-13.77 4c-.724 0-1.311.587-1.311 1.311v17.68l7.467-5.744a.66.66 0 01.8 0l7.467 5.744V87.5a.655.655 0 111.311 0v11.144a.656.656 0 01-1.055.52l-8.123-6.248-8.123 6.248a.655.655 0 01-1.055-.52v-19.01a2.62 2.62 0 012.622-2.623h5.245a.655.655 0 010 1.311z"
            clipRule="evenodd"
          />
        </svg>
      </CardHeader>
      <Skeleton loading={isLoading}>
        <Spin spinning={isFetching}>
          {list?.data?.length === 0 || isError ? (
            <Empty
              description="No posts yet"
              style={{ margin: "120px auto 0 auto", overflowX: "clip" }}
            />
          ) : (
            list?.data?.map((post, index) => (
              <PostCard key={index} style={{ marginBottom: 16 }} post={post} />
            ))
          )}
          <Flex vertical gap={16} style={{ marginBlock: 16 }}>
            {list?.meta?.total === list?.meta?.to ? (
              <Typography.Text type="secondary" strong style={{ margin: "0 auto" }}>
                No more posts
              </Typography.Text>
            ) : // <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No more posts" />
            !isError && list?.data?.length > 0 ? (
              <Button
                loading={isFetching}
                style={{ margin: "0 auto" }}
                onClick={() => setParams({ ...params, limit: params.limit + 10 })}
              >
                Load More
              </Button>
            ) : null}
          </Flex>
        </Spin>
      </Skeleton>
    </ContentWrapper>
  );
}

export default Bookmark;
