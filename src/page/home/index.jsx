import ListPost from "@/components/ListPost";
import usePostParams from "@/hooks/usePostParams";

function Home() {
  const { params, setParams } = usePostParams();

  // const { data: popular, isLoading, isError } = useGetBaseQuery({ url: "/posts/popular" });

  return (
    <ListPost
      params={params}
      onLoadMore={() => setParams({ ...params, limit: params.limit + 15 })}
    />
  );
}

export default Home;
