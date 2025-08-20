import { Divider, Flex } from "antd";
import MyChart from "./partials/chart";
import ContentWrapper from "@/components/ContentWrapper";
import CustomCard from "@/components/CustomCard";
import Title from "antd/es/typography/Title";

function Stats() {
  return (
    <ContentWrapper style={{ maxWidth: 900 }}>
      <Flex align="center" justify="space-between">
        <h1 style={{ paddingBlock: "20px" }}>Your Statistic Posts</h1>
      </Flex>
      <Divider />
      <CustomCard style={{ paddingBlock: 30, marginBottom: 30 }}>
        <Title level={3}>Total Views 0</Title>
        <MyChart />
      </CustomCard>
      <CustomCard style={{ paddingBlock: 30, marginBottom: 30 }}>
        <Title level={3}>Total Likes 0</Title>
        <MyChart />
      </CustomCard>
      <CustomCard style={{ paddingBlock: 30, marginBottom: 30 }}>
        <Title level={3}>Total Comments 0</Title>
        <MyChart />
      </CustomCard>
    </ContentWrapper>
  );
}

export default Stats;
