import ListPost from "@/components/ListPost";
import usePostParams from "@/hooks/usePostParams";
import { useGetCategoryQuery } from "@/service/extended/categoryApi";
import styled from "@emotion/styled";
import { Button, Col, Flex, Grid, Radio, Row, Select, Spin, Typography } from "antd";
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
  const { params, setParams } = usePostParams();
  const { lg } = Grid.useBreakpoint();

  const categories = data?.data?.map((category) => ({
    value: category.slug,
    label: category.name,
  }));

  const onChange = (e) => {
    if (lg) {
      setValue(e.target.value);
      window.scrollTo({ top: 0, behavior: "smooth" });
      searchParams.set("category", e.target.value);
    } else {
      setValue(e);
      window.scrollTo({ top: 0, behavior: "smooth" });
      searchParams.set("category", e);
    }
  };

  const onReset = () => {
    setValue(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
    searchParams.delete("category");
  };

  return (
    <Row gutter={[16, 16]}>
      <Col order={lg ? 0 : 2} span={24} lg={16}>
        <ListPost
          params={{
            keyword: searchParams.get("keyword"),
            category: searchParams.get("category") || "",
            ...params,
          }}
          onLoadMore={() => setParams({ ...params, limit: params.limit + 15 })}
          title={
            <>
              <Typography.Text type="secondary" style={{ fontWeight: "600" }}>
                {`Result for : ${searchParams.get("keyword")}`}
              </Typography.Text>
            </>
          }
        />
      </Col>
      <Col
        order={1}
        span={24}
        lg={8}
        style={{ position: "sticky", top: 60, background: "#fffff", zIndex: lg ?0 : 100 }}
      >
        {lg ? (
          <Aside>
            <Flex justify="space-between">
              <p className="cs-banner-title">Filter by Category</p>
              <Button type="default" onClick={onReset}>
                Reset
              </Button>
            </Flex>
            <Spin spinning={isLoading} style={{ height: 200 }}>
              <Radio.Group style={style} onChange={onChange} value={value} options={categories} />
            </Spin>
          </Aside>
        ) : (
          <Flex justify="space-between" gap={10} style={{ marginTop: 10 }}>
            <Select
              value={value}
              style={{ width: "100%" }}
              options={categories}
              onChange={onChange}
              placeholder="Filter with category"
            />
            <Button type="default" onClick={onReset}>
              Reset
            </Button>
          </Flex>
        )}
      </Col>
    </Row>
  );
}

export default PostSearch;
