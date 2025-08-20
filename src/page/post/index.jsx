import ListPost from "@/components/ListPost";
import usePostParams from "@/hooks/usePostParams";
import { useParams } from "react-router-dom";

const PostByCategory = () => {
  const { category } = useParams();
  const { params, setParams } = usePostParams();

  return (
    <ListPost
      params={{ category: category, ...params }}
      onLoadMore={() => setParams({ ...params, limit: params.limit + 15 })}
      title={null}
    />
  );
};

export default PostByCategory;
