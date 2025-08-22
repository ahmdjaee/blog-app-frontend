import { LoadingOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Flex, Spin, Statistic, Typography } from "antd";

const MainCard = styled.div`
  box-shadow: rgba(22, 119, 255, 0.116) 0px 7px 29px 0px;
  padding: 28px 28px;
  background-color: white;
  border-radius: 4px;
  height: 100%;
`;

function StatisticWithState({ title, value = 0, isLoading, isError, children }) {
  return (
    <Spin spinning={isLoading} indicator={<LoadingOutlined />}>
      <MainCard>
        {isError ? (
          <Typography.Text type="danger">Oops something went wrong</Typography.Text>
        ) : (
          <Flex justify="space-between">
            <Statistic title={title} value={value} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div
                style={{
                  padding: 20,
                  borderRadius: "50%",
                  backgroundColor: "rgba(22, 119, 255, 0.193)",
                  color: "rgb(22, 119, 255)",
                }}
              >
                {children}
              </div>
            </div>
          </Flex>
        )}
      </MainCard>
    </Spin>
  );
}

export default StatisticWithState;
