import FloatCircularIndicator from "@/components/FloatCircularIndicator";
import { validateMessage } from "@/lib/rule";
import { useRegisterMutation } from "@/service/extended/authApi";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";
const Register = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const onFinish = async (values) => register(values);
  return (
    <FloatCircularIndicator isLoading={isLoading}>
      <Form
        name="register"
        style={{
          width: 360,
        }}
        onFinish={onFinish}
        validateMessages={validateMessage}
      >
        <Title level={4} style={{ marginBottom: 20 }}>
          Register
        </Title>

        <Form.Item
          name="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Name" />
        </Form.Item>
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
              min: 8,
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Register
          </Button>
          already have an account? <Link to="/auth/login">Log in</Link>
        </Form.Item>
      </Form>
    </FloatCircularIndicator>
  );
};
export default Register;
