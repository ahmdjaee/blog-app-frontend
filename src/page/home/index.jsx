import ListPost from "@/components/ListPost";
import PostCard from "@/components/PostCard";
import { useGetPostQuery } from "@/service/extended/postApi";
import { Skeleton } from "antd";
import { useState } from "react";

function Home() {
  const [params, setParams] = useState({
    limit: 10,
    page: 1,
    published: 1,
  });

  const {
    data: popular,
    isLoading: isPopularLoading,
    isError: isPopularError,
  } = useGetPostQuery({ popular: true });

  return (
    <>
      <Skeleton loading={isPopularLoading} style={{ marginBottom: 24 }}>
        <div className="cs-banner-wrapper">
          <div className="cs-banner" style={{ marginBottom: "24px" }}>
            <img
              src="https://asset-a.grid.id/crop/0x0:0x0/x/photo/2022/12/05/gunung-tertinggi-di-indonesiajp-20221205124551.jpg"
              alt="Background"
              className="cs-banner-image"
            />
            <div className="cs-banner-overlay">
              <h2 className="cs-banner-title">
                Massa tortor nibh nulla condimentum imperdiet scelerisque...
              </h2>
              <p className="cs-banner-info">
                2 Hours Ago &nbsp;|&nbsp; Ahmad Jaelani
              </p>
            </div>
          </div>
          <div className="cs-banner-content">
            <div className="cs-banner-title" style={{marginBottom: 4}}>Popular Posts</div>
            <PostCard post={popular?.data[0]} />
            <PostCard post={popular?.data[0]} />
            <PostCard post={popular?.data[0]} />
            {/* {popular?.data?.map((post, index) => (
            <PostCard key={index} post={post} />
          ))} */}
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
