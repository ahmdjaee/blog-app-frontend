import FloatCircularIndicator from "@/components/FloatCircularIndicator";
import { useRegisterMutation } from "@/service/extended/authApi";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import Title from "antd/es/typography/Title";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await register(values).unwrap();
      navigate("/auth/login");
    } catch (error) {}
  };
  
  return (
    <FloatCircularIndicator isLoading={isLoading}>
      <Form
        name="register"
        style={{
          width: 360,
        }}
        onFinish={onFinish}
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
