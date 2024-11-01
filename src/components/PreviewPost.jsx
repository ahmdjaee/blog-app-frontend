import { Typography } from "antd";

function PreviewPost({ title, thumbnail, content, author, published_at = "2 weeks ago" }) {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        // borderInline: "1px solid #f0f1f2",
        // paddingInline: 16,
        // boxSizing: "content-box",
      }}
    >
      <img
        src={thumbnail}
        alt=""
        style={{ width: "100%", maxHeight: 500, objectFit: "contain" }}
      />
      <section style={{ marginBlock: 20 }}>
        <Typography.Title level={5} style={{fontWeight: "700"}}>{title}</Typography.Title>
        <Typography.Text>By : <a href="">{author}</a> | Published : {published_at}</Typography.Text>
      </section>
      <article
        className="cs-blog-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}

export default PreviewPost;
