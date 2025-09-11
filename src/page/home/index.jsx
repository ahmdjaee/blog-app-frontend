import ListPost from "@/components/ListPost";
import { selectPost, setPostParams } from "@/redux/postSlice";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  // const { params, setParams } = usePostParams();
  const dispatch = useDispatch();
  // const { data: popular, isLoading, isError } = useGetBaseQuery({ url: "/posts/popular" });
  const params = useSelector(selectPost);

  const onLoadMore = useCallback(() => {
    dispatch(setPostParams({ ...params, limit: params.limit + 20 }));
  }, [dispatch, params]);

  return <ListPost params={params} onLoadMore={onLoadMore} />;
}

export default Home;
