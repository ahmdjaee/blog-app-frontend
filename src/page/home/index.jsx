import ListPost from "@/components/ListPost";
import { useState } from "react";

function Home() {
  const [params, setParams] = useState({
    limit: 10,
    page: 1,
    published: 1,
  });

  // const { data: popular, isLoading, isError } = useGetBaseQuery({ url: "/posts/popular" });

  return (
    <ListPost
      params={params}
      onLoadMore={() => setParams({ ...params, limit: params.limit + 10 })}
    />
  );
}

export default Home;
