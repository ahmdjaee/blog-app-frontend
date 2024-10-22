import SubmitButton from "@/components/SubmitButton";
import useSlug from "@/hooks/useSlug";
import { validateMessage } from "@/lib/rule";
import { useCreateUserMutation } from "@/service/extended/userApi";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Drawer, Form, Input, Space, Spin } from "antd";
import { useEffect } from "react";

function CreateUserForm({ open, onClose }) {
  const [form] = Form.useForm();
  const slug = useSlug({ value: Form.useWatch("name", form) });

  const [createUser, { isLoading }] = useCreateUserMutation();

  const handleOnClose = () => {
    form.resetFields();
    onClose();
  };

  useEffect(() => {
    form.setFieldsValue({
      slug: slug,
    });
  }, [slug, form]);

  const onFinish = async (values) => {
    await createUser(values);
  };

  return (
    <Drawer title="Create User" onClose={handleOnClose} open={open}>
      <Spin spinning={isLoading}>
        <Form
          onFinish={onFinish}
          form={form}
          name="create-user"
          layout="vertical"
          autoComplete="off"
          validateMessages={validateMessage}
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
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Space>
              <SubmitButton form={form}>Submit</SubmitButton>
              <Button htmlType="reset">Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </Spin>
    </Drawer>
  );
}

export default CreateUserForm;
