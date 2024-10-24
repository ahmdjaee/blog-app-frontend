import SubmitButton from "@/components/SubmitButton";
import useSlug from "@/hooks/useSlug";
import { validateMessage } from "@/lib/rule";
import { useCreateCommentMutation } from "@/service/extended/commentApi";
import { Button, Drawer, Form, Input, Select, Space, Spin } from "antd";
import { useEffect } from "react";

function CreateCommentForm({ open, onClose }) {
  const [form] = Form.useForm();
  const slug = useSlug({ value: Form.useWatch("name", form) });

  const [createComment, { isLoading }] = useCreateCommentMutation();

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
    await createComment(values);
  };

  return (
    <Drawer title="Create Comment" onClose={handleOnClose} open={open}>
      <Spin spinning={isLoading}>
        <Form
          onFinish={onFinish}
          form={form}
          name="create-comment"
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
            <Input placeholder="Insert comment name" />
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
            <Input.Password autoComplete="off"  placeholder="Password" />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            hasFeedback
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select role"
              allowClear
              options={[
                { label: "Admin", value: "admin" },
                { label: "Comment", value: "comment" },
              ]}
            />
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

export default CreateCommentForm;
