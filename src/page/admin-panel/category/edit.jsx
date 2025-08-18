import SubmitButton from "@/components/SubmitButton";
import { useUpdateCategoryMutation } from "@/service/extended/categoryApi";
import { Button, Drawer, Form, Input, Space, Spin } from "antd";
import { useEffect } from "react";

function UpdateCategoryForm({ open, onClose, data }) {
  const [form] = Form.useForm();

  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  const handleOnClose = () => {
    form.resetFields();
    onClose();
  };

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);

  const onFinish = async (values) => {
    await updateCategory({ id: data.key, ...values });
  };

  return (
    <Drawer forceRender title="Create Category" onClose={handleOnClose} open={open}>
      <Spin spinning={isLoading}>
        <Form
          onFinish={onFinish}
          form={form}
          name="create-category"
          layout="vertical"
          autoComplete="off"
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
            <Input placeholder="Insert category name" />
          </Form.Item>
          <Form.Item
            name="slug"
            label="Slug"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="slug-example-name" />
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

export default UpdateCategoryForm;
