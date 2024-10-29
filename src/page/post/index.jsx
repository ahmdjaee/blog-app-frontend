import ListPost from "@/components/ListPost";
import { useState } from "react";
import { useParams } from "react-router-dom";

const PostByCategory = () => {
  const { category } = useParams();

  const [params, setParams] = useState({
    limit: 10,
    published: 1,
  });

  return (
    <ListPost
      params={{ category: category, ...params }}
      onLoadMore={() => setParams({ ...params, limit: params.limit + 1 })}
      title={null}
    />
  );
};

export default PostByCategory;
