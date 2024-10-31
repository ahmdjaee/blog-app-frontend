import Editor from "@/components/Editor";
import PreviewPost from "@/components/PreviewPost";
import SubmitButton from "@/components/SubmitButton";
import { useAuth } from "@/hooks/useAuth";
import useSlug from "@/hooks/useSlug";
import { useGetCategoryQuery } from "@/service/extended/categoryApi";
import { useCreatePostMutation } from "@/service/extended/postApi";
import { InfoCircleOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Space,
  Spin,
  Tabs,
  Upload,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function PostCreatePanel() {
  const [preview, setPreview] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [form] = Form.useForm();
  const title = Form.useWatch("title", form);
  const user = useAuth();

  const getThumbnail = (file) => {
    setThumbnail(URL.createObjectURL(file));
    // Prevent upload
    return false;
  };

  const onRemove = () => {
    setThumbnail(null);
  };

  return (
    <Tabs
      defaultActiveKey="1"
      items={[
        {
          label: "Create",
          key: "1",
          children: (
            <CreatePostForm
              getThumbnail={getThumbnail}
              onRemove={onRemove}
              form={form}
              html={(html) => setPreview(html)}
            />
          ),
        },
        {
          label: "Preview",
          key: "2",
          children: (
            <PreviewPost
              title={title}
              thumbnail={thumbnail}
              author={user?.name}
              content={preview}
            />
          ),
        },
      ]}
    />
  );
}

function CreatePostForm({ html, form, getThumbnail, onRemove }) {
  const slug = useSlug({ value: Form.useWatch("title", form) });
  const navigate = useNavigate();
  const { data: list, isLoading } = useGetCategoryQuery();
  const [createPost, { isLoading: isLoadingPost, isSuccess: isSuccessPost }] =
    useCreatePostMutation();

  const quillRef = useRef();
  const user = useAuth();

  useEffect(() => {
    form.setFieldsValue({
      slug: slug,
    });
  }, [slug, form]);

  const onFinish = async (values) => {
    await createPost({
      ...values,
      thumbnail: values?.thumbnail?.file,
      content: quillRef.current.getSemanticHTML(),
    });
  };

  useEffect(() => {
    if (isSuccessPost) {
      if (user?.role === "admin") {
        navigate("/admin/posts");
      } else {
        navigate("/user/posts");
      }
    }
  }, [isSuccessPost, navigate, user?.role]);

  return (
    <Spin spinning={isLoadingPost}>
      <Form
        onFinish={onFinish}
        form={form}
        name="create-category"
        layout="vertical"
        autoComplete="off"
        initialValues={{
          published: true,
        }}
      >
        <Form.Item label="Thumbnail" name="thumbnail" rules={[{ required: true }]}>
          <Upload
            name="thumbnail"
            beforeUpload={getThumbnail}
            onRemove={onRemove}
            listType="picture"
            accept="image/*"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Insert category title" />
        </Form.Item>
        <Form.Item
          name="slug"
          label="Slug"
          tooltip={{
            title:
              "The unique ID will be automatically generated before the slug to ensure the slug remains unique.",
            icon: <InfoCircleOutlined />,
          }}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="slug-example-name" />
        </Form.Item>
        <Form.Item label="Content" required>
          <Editor
            ref={quillRef}
            placeholder="Write something..."
            onTextChange={() => {
              html(quillRef.current.getSemanticHTML());
            }}
          />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category_id"
          hasFeedback
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="I'm Select"
            allowClear
            loading={isLoading}
            options={list?.data?.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
        </Form.Item>
        <Form.Item name="published" valuePropName="checked">
          <Checkbox>Publish</Checkbox>
        </Form.Item>
        <Form.Item>
          <Space>
            <SubmitButton form={form}>Submit</SubmitButton>
            <Button htmlType="reset">Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </Spin>
  );
}

export default PostCreatePanel;
