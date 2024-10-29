import ListPost from "@/components/ListPost";
import { Typography } from "antd";
import { useSearchParams } from "react-router-dom";

function PostSearch() {
  const [searchParams] = useSearchParams();

  return (
    <ListPost
      params={{
        keyword: searchParams.get("keyword"),
        limit: 15,
        page: 1,
        published: 1,
      }}
      title={
        <>
          <Typography.Text type="secondary" style={{ fontWeight: "600" }}>
            {`Result for : ${searchParams.get("keyword")}`}
          </Typography.Text>
        </>
      }
    />
  );
}

export default PostSearch;
