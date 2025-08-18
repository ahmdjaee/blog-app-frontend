import SubmitButton from "@/components/SubmitButton";
import { useAuth } from "@/hooks/useAuth";
import useSlug from "@/hooks/useSlug";
import { useUpdateSocialMutation } from "@/service/extended/profileApi";
import { Button, Form, Input, Space, Spin } from "antd";
import { useEffect } from "react";

function UserSocialPanel() {
  const user = useAuth();
  const [form] = Form.useForm();

  const [updateSocial, { isLoading }] = useUpdateSocialMutation();

  const onFinish = async (values) => {
    await updateSocial(values);
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
            rules={[
              {
                type: "url",
              },
            ]}
            name="instagram"
            label="Instagram"
          >
            <Input type="url" placeholder="https://example.com" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                type: "url",
              },
            ]}
            name="facebook"
            label="Facebook"
          >
            <Input type="url" placeholder="https://example.com" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                type: "url",
              },
            ]}
            name="linkedin"
            label="Linkedin"
          >
            <Input type="url" placeholder="https://example.com" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                type: "url",
              },
            ]}
            name="x"
            label="X"
          >
            <Input type="url" placeholder="https://example.com" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                type: "url",
              },
            ]}
            name="github"
            label="Github"
          >
            <Input type="url" placeholder="https://example.com" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                type: "url",
              },
            ]}
          >
            <Space>
              <SubmitButton form={form}>Save</SubmitButton>
              <Button htmlType="reset">Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
}

export default UserSocialPanel;
