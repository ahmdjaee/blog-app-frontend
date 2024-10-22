import FloatCircularIndicator from "@/components/FloatCircularIndicator";
import { validateMessage } from "@/lib/rule";
import { useLoginMutation } from "@/service/extended/authApi";
import { setUserAndToken } from "@/service/token";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input } from "antd";
import Title from "antd/es/typography/Title";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  
  const onFinish = async (formData) => {
    try {
      const { data } = await login(formData).unwrap();
      setUserAndToken(data);
      navigate("/");
    } catch (error) {}
  };

  return (
    <FloatCircularIndicator isLoading={isLoading}>
      <Form
        name="login"
        style={{
          maxWidth: 600,
          width: 360,
        }}
        onFinish={onFinish}
        validateMessages={validateMessage}
      >
        <Title level={3} style={{ marginBottom: 20 }}>
          Login
        </Title>

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
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
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
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
    </FloatCircularIndicator>
  );
};
export default Login;
