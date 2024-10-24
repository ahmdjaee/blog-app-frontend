import SubmitButton from "@/components/SubmitButton";
import { validateMessage } from "@/lib/rule";
import { useUpdateCommentMutation } from "@/service/extended/commentApi";
import { Button, Drawer, Form, Input, Select, Space, Spin } from "antd";
import { useEffect } from "react";

function UpdateCommentForm({ open, onClose, data }) {
  const [form] = Form.useForm();
  const oldPasssword = Form.useWatch("old_password", form);

  const [updateComment, { isLoading }] = useUpdateCommentMutation();

  const handleOnClose = () => {
    form.resetFields();
    onClose();
  };

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);

  const onFinish = async (values) => {
    await updateComment({ id: data.key, ...values });
  };

  return (
    <Drawer forceRender title="Edit Comment" onClose={handleOnClose} open={open}>
      <Spin spinning={isLoading}>
        <Form
          onFinish={onFinish}
          form={form}
          name="edit-comment"
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
            name="old_password"
            label="Old Password"
            rules={[
              {
                min: 8,
              },
            ]}
          >
            <Input.Password autoComplete="off" placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="new_password"
            label="New Password"
            rules={[
              {
                required: oldPasssword ? true : false,
                min: 8,
              },
            ]}
          >
            <Input.Password placeholder="Password" />
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

export default UpdateCommentForm;
