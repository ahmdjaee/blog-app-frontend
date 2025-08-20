import { useGetRecommendationsQuery } from "@/service/extended/recommendationApi";
import styled from "@emotion/styled";
import { Avatar, List } from "antd";
import { Link } from "react-router-dom";

const Aside = styled.div`
  padding: 16px;
  padding-top: 0;
  border-left: 1px solid #f0f0f0;
`;

function RecommendationAside() {
  const { data: list, isLoading } = useGetRecommendationsQuery();

  return (
    <Aside>
      <p className="cs-banner-title">Recommendations</p>
      <List
        loading={isLoading}
        itemLayout="horizontal"
        dataSource={list?.data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item?.post?.thumbnail} />}
              title={<Link to={"/posts/"+ item?.post?.slug}>{item.post?.title}</Link>}
              description={item?.post?.sub_title}
            />
          </List.Item>
        )}
      />
    </Aside>
  );
}

export default RecommendationAside;
