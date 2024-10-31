import ListPost from "@/components/ListPost";
import PostCard from "@/components/PostCard";
import { useGetBaseQuery } from "@/service/baseApi";
import { Empty, Skeleton } from "antd";
import { useState } from "react";

function Home() {
  const [params, setParams] = useState({
    limit: 10,
    page: 1,
    published: 1,
  });

  const {
    data: popular,
    isLoading,
    isError,
  } = useGetBaseQuery({ url: "/posts/popular" });

  return (
    <>
      <Skeleton loading={isLoading} style={{ marginBottom: 24 }}>
        <div className="cs-banner-wrapper">
          <div className="cs-banner" style={{ marginBottom: "24px" }}>
            <img
              src={popular?.data?.[0]?.thumbnail}
              alt="Background"
              className="cs-banner-image"
            />
            <div className="cs-banner-overlay">
              <h2 className="cs-banner-title">{popular?.data?.[0]?.title}</h2>
              <p className="cs-banner-info">
                {popular?.data?.[0].published_at +
                  " | " +
                  popular?.data?.[0].author.name}
              </p>
            </div>
          </div>
          <div className="cs-banner-content">
            <div className="cs-banner-title" style={{ marginBottom: 4 }}>
              Popular Posts
            </div>
            {popular?.data?.length === 0 || isError ? (
              <Empty
                description="No posts yet"
                style={{ margin: "120px auto 0 auto", overflowX: "clip" }}
              />
            ) : (
              popular?.data?.map((post, index) => (
                <PostCard key={index} post={post} />
              ))
            )}
          </div>
        </div>
      </Skeleton>

      <ListPost
        params={params}
        onLoadMore={() => setParams({ ...params, limit: params.limit + 10 })}
      />
    </>
  );
}

export default Home;
