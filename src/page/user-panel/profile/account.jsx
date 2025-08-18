import SubmitButton from "@/components/SubmitButton";
import { useAuth } from "@/hooks/useAuth";
import { useUpdateProfileMutation } from "@/service/extended/profileApi";
import { Button, Form, Input, Space, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";

function UserAccountPanel() {
  const [form] = Form.useForm();
  const user = useAuth();

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const onFinish = async (values) => {
    await updateProfile(values);
  };

  return (
    <>
      <Spin spinning={isLoading}>
        <Form
          onFinish={onFinish}
          form={form}
          name="create-user"
          layout="vertical"
          autoComplete="off"
          initialValues={user}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Insert user name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item name="short_bio" label="Short Bio">
            <TextArea
              showCount
              maxLength={160}
              placeholder="Insert your bio here"
              style={{ height: 120, resize: "none" }}
            />
          </Form.Item>
          <Form.Item>
            <Space>
              <SubmitButton form={form}>Save</SubmitButton>
              <Button htmlType="reset">Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </Spin>

      <br />
      <br />
      <Title level={5}>Change Password</Title>
      {/* <Spin spinning={isLoading}>
        <Form
          onFinish={onFinish}
          form={form}
          name="create-user"
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                min: 8,
              },
            ]}
          >
            <Input.Password autoComplete="off" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Space>
              <SubmitButton form={form}>Submit</SubmitButton>
              <Button htmlType="reset">Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </Spin> */}
    </>
  );
}

export default UserAccountPanel;
