import ContentWrapper from "@/components/ContentWrapper";
import CustomCard from "@/components/CustomCard";
import StatisticWithState from "@/components/StatisticWithState";
import { useGetBaseQuery } from "@/service/baseApi";
import { LikeOutlined, MessageOutlined } from "@ant-design/icons";
import { Col, Divider, Flex, Row, Spin } from "antd";
import Title from "antd/es/typography/Title";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

function Stats() {
  const {
    data: views,
    isLoading: isLoadingViews,
    // isError: isErrorViews,
  } = useGetBaseQuery({ url: "/user/stats/views" }, { refetchOnMountOrArgChange: true });

  const {
    data: summary,
    isLoading: isLoadingSummary,
    isError: isErrorSummary,
  } = useGetBaseQuery({ url: "/user/stats/summary" }, { refetchOnMountOrArgChange: true });

  return (
    <ContentWrapper style={{ maxWidth: 900 }}>
      <Flex align="center" justify="space-between">
        <h1 style={{ paddingBlock: "20px" }}>Your Statistic Posts</h1>
      </Flex>
      <Divider />
      <Row gutter={[16, 16]}>
        <Col span={24} md={12}>
          <StatisticWithState
            isLoading={isLoadingSummary}
            isError={isErrorSummary}
            title={"Total Likes"}
            value={summary?.data?.total_likes}
          >
            <LikeOutlined style={{ fontSize: 30 }} />
          </StatisticWithState>
        </Col>
        <Col span={24} md={12}>
          <StatisticWithState
            isLoading={isLoadingSummary}
            isError={isErrorSummary}
            title={"Total Comments"}
            value={summary?.data?.total_comments}
          >
            <MessageOutlined style={{ fontSize: 30 }} />
          </StatisticWithState>
        </Col>
      </Row>
      <CustomCard style={{ paddingBlock: 30, marginBottom: 30 }}>
        <Spin spinning={isLoadingViews} style={{ height: 300 }}>
          <Title level={3}>Total Views {views?.total_views}</Title>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={views?.data} margin={{ top: 5, right: 4, bottom: 5, left: 4 }}>
              <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
              <Line
                type="monotone"
                dataKey="total"
                stroke="rgb(22, 119, 255)"
                strokeWidth={2}
                name="Views last 30 days"
              />
              <XAxis dataKey="day"  />
              {/* <YAxis width="auto" label={{ value: "TOTAL", position: "insideLeft", angle: -90 }} /> */}
              <Legend align="right" />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </Spin>
      </CustomCard>
    </ContentWrapper>
  );
}

export default Stats;
