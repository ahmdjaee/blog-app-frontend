import DebounceSelect from "@/components/DebounceSelect";
import SubmitButton from "@/components/SubmitButton";
import { store } from "@/redux/store";
import { postApi } from "@/service/extended/postApi";
import { useCreateRecommendationMutation } from "@/service/extended/recommendationApi";
import { Button, Drawer, Form, Space, Spin } from "antd";
import { useState } from "react";

async function fetchPostList(id) {
  const promise = store.dispatch(
    postApi.endpoints.getPosts.initiate({
      params: { keyword: id },
    })
  );

  const { data: list } = await promise;

  return list?.data?.map((post) => ({
    label: post.title,
    value: post.id,
  }));
}

function CreateRecommendationForm({ open, onClose }) {
  const [value, setValue] = useState([]);

  const [form] = Form.useForm();

  const [createRecommendation, { isLoading }] = useCreateRecommendationMutation();

  const handleOnClose = () => {
    form.resetFields();
    onClose();
  };

  const onFinish = async ({ post_id: { value } }) => {
    await createRecommendation({ post_id: value });
    handleOnClose();
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
        >
          <Form.Item
            name="post_id"
            label="Post"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DebounceSelect
              showSearch
              value={value}
              name="post_id"
              placeholder="Search posts"
              fetchOptions={fetchPostList}
              style={{ width: "100%" }}
              onChange={(newValue) => {
                if (Array.isArray(newValue)) {
                  setValue(newValue);
                }
              }}
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

export default CreateRecommendationForm;
