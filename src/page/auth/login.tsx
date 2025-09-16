import FloatCircularIndicator from "@/components/FloatCircularIndicator";
import { useLoginMutation } from "@/service/extended/authApi";
import { setUserAndToken } from "@/service/token";
import { HomeFilled, LockOutlined, MailOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, Checkbox, Flex, Form, Input, Space } from "antd";
import Title from "antd/es/typography/Title";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { token } from "@/theme";
import CustomCard from "@/components/CustomCard";

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
      <div className="">
        <Link to={"/"}>
          <Flex style={{ marginBottom: 24}} justify="center" gap={12}>
            <HomeFilled />
            Home
          </Flex>
        </Link>
        <CustomCard style={{padding: "32px 30px"}}>
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

            <Form.Item style={{ textAlign: "center" }}>
              <Button style={{ marginBottom: "16px" }} block type="primary" htmlType="submit">
                Log in
              </Button>
              or <Link to="/auth/register">Register now!</Link>
            </Form.Item>
          </Form>
        </CustomCard>
      </div>
    </FloatCircularIndicator>
  );
};
export default Login;
