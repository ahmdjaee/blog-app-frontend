import FloatCircularIndicator from "@/components/FloatCircularIndicator";
import { useLoginMutation } from "@/service/extended/authApi";
import { setUserAndToken } from "@/service/token";
import { HomeFilled, LockOutlined, MailOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, Checkbox, Flex, Form, Input, Space } from "antd";
import Title from "antd/es/typography/Title";
import { Link, useLocation, useNavigate } from "react-router-dom";

const MainCard = styled.div`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 32px 30px;
`;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [login, { isLoading }] = useLoginMutation();
  let from = location.state?.from?.pathname || window.history.state?.prevUrl || "/";

  const onFinish = async (formData) => {
    try {
      const { data } = await login(formData).unwrap();
      setUserAndToken(data);
      navigate(from, { replace: true });
    } catch {}
  };

  return (
    <FloatCircularIndicator isLoading={isLoading}>
      <MainCard>
        <Link to={"/"}>
          <Flex style={{ marginBottom: 12 }} justify="center" gap={12}>
            <HomeFilled />
            Home
          </Flex>
        </Link>
        <Form
          name="login"
          style={{
            maxWidth: 600,
            width: 360,
          }}
          size="large"
          onFinish={onFinish}
        >
          <Title level={3} style={{ marginBottom: 20 }}>
            Login
          </Title>

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link to="">Forgot password</Link>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Log in
            </Button>
            or <Link to="/auth/register">Register now!</Link>
          </Form.Item>
        </Form>
      </MainCard>
    </FloatCircularIndicator>
  );
};
export default Login;
