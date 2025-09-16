import CustomCard from "@/components/CustomCard";
import FloatCircularIndicator from "@/components/FloatCircularIndicator";
import { useLoginMutation, useRegisterMutation } from "@/service/extended/authApi";
import { setUserAndToken } from "@/service/token";
import { HomeFilled, LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input } from "antd";
import Title from "antd/es/typography/Title";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Register = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const location = useLocation();
  const [login, { isLoading: isLoadingLogin }] = useLoginMutation();
  const navigate = useNavigate();

  let from = location.state?.from?.pathname || window.history.state?.prevUrl || "/";

  const onFinish = async (values) => {
    try {
      await register(values).unwrap();
      // navigate("/auth/login");
      const { data } = await login({
        email: values.email,
        password: values.password,
      }).unwrap();

      setUserAndToken(data);
      navigate(from, { replace: true });
    } catch (error) {}
  };

  return (
    <FloatCircularIndicator isLoading={isLoading || isLoadingLogin}>
      <div className="">
        <Link to={"/"}>
          <Flex style={{ marginBottom: 24 }} justify="center" gap={12}>
            <HomeFilled />
            Home
          </Flex>
        </Link>
        <CustomCard style={{ padding: "32px 30px" }}>
          <Form
            name="register"
            style={{
              width: 360,
            }}
            size="large"
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
            <Form.Item style={{ textAlign: "center" }}>
              <Button style={{ marginBottom: "16px" }} block type="primary" htmlType="submit">
                Register
              </Button>
              already have an account? <Link to="/auth/login">Log in</Link>
            </Form.Item>
          </Form>
        </CustomCard>
      </div>
    </FloatCircularIndicator>
  );
};
export default Register;
