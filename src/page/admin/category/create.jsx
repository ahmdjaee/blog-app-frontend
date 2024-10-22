import SubmitButton from "@/components/SubmitButton";
import useSlug from "@/hooks/useSlug";
import { validateMessage } from "@/lib/rule";
import { useCreateCategoryMutation } from "@/service/extended/categoryApi";
import { Button, Drawer, Form, Input, Space, Spin } from "antd";
import { useEffect } from "react";

function CreateCategoryForm({ open, onClose }) {
  const [form] = Form.useForm();
  const slug = useSlug({ value: Form.useWatch("name", form) });

  const [createCategory, { isLoading }] = useCreateCategoryMutation();

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
    await createCategory(values);
  };

  return (
    <Drawer title="Create Category" onClose={handleOnClose} open={open}>
      <Spin spinning={isLoading}>
        <Form
          onFinish={onFinish}
          form={form}
          name="create-category"
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

export default CreateCategoryForm;
