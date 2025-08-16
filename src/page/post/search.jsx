import ListPost from "@/components/ListPost";
import { useGetCategoryQuery } from "@/service/extended/categoryApi";
import styled from "@emotion/styled";
import { Button, Col, Flex, Radio, Row, Typography } from "antd";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
const style = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const Aside = styled.div`
  padding: 24px;
  padding-top: 0;
  border-left: 1px solid #f0f0f0;
  margin-top: 24px;
  min-height: 100vh;
`;

function PostSearch() {
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState(null);
  const { data, isLoading } = useGetCategoryQuery();

  const categories = data?.data?.map((category) => ({
    value: category.slug,
    label: category.name,
  }));
  
  const onChange = (e) => {
    setValue(e.target.value);
    window.scrollTo({ top: 0, behavior: "smooth" });
    searchParams.set("category", e.target.value);
  };

  const onReset = () => {
    setValue(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
    searchParams.delete("category");
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={16}>
        <ListPost
          params={{
            keyword: searchParams.get("keyword"),
            category: searchParams.get("category") || "",
            limit: 15,
            page: 1,
            published: 1,
          }}
          onLoadMore={() => {}}
          title={
            <>
              <Typography.Text type="secondary" style={{ fontWeight: "600" }}>
                {`Result for : ${searchParams.get("keyword")}`}
              </Typography.Text>
            </>
          }
        />
      </Col>
      <Col span={8}>
        <Aside>
          <Flex justify="space-between">
            <p className="cs-banner-title">Filter by Category</p>
            <Button type="default" onClick={onReset}>
              Reset
            </Button>
          </Flex>
          <Radio.Group style={style} onChange={onChange} value={value} options={categories} />
        </Aside>
      </Col>
    </Row>
  );
}

export default PostSearch;
