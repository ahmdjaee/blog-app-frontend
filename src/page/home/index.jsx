import ListPost from "@/components/ListPost";
import { selectPost, setPostParams } from "@/redux/postSlice";
import { useGetBaseQuery } from "@/service/baseApi";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  // const { params, setParams } = usePostParams();
  const dispatch = useDispatch()
  const params = useSelector(selectPost)
  // const { data: popular, isLoading, isError } = useGetBaseQuery({ url: "/posts/popular" });

  return (
    <ListPost
      params={params}
      onLoadMore={() => dispatch(setPostParams({ ...params, limit: params.limit + 15 }))}
    />
  );
}

export default Home;
