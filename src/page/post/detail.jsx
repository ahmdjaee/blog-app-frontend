import PreviewPost from "@/components/PreviewPost";
import SubmitButton from "@/components/SubmitButton";
import { validateMessage } from "@/lib/rule";
import { Button, Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import "quill/dist/quill.snow.css";
import { useLocation } from "react-router-dom";

const PostDetail = () => {
  const {
    state: { post },
  } = useLocation();
  console.log("🚀 ~ PostDetail ~ state:", post);

  return (
    <>
      <PreviewPost
        title={post?.title}
        thumbnail={post?.thumbnail}
        content={post?.content}
        author={post?.author.name}
      />
      <section style={{ marginTop: 24, maxWidth: 800, marginInline: "auto" }}>
        <Form name="comment-section" validateMessages={validateMessage}>
          <h3>Leave a comment</h3>
          <Form.Item
            name="comment"
            style={{ marginTop: 10 }}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea rows={4} placeholder="Write your comment here" />
          </Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form>
      </section>
    </>
  );
};

export default PostDetail;
