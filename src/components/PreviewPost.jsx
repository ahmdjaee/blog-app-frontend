function PreviewPost({ title, thumbnail, content, author }) {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        borderInline: "1px solid #f0f1f2",
        paddingInline: 16,
        boxSizing: "content-box",
      }}
    >
      <img
        src={thumbnail}
        alt=""
        style={{ width: "100%", maxHeight: 500, objectFit: "contain" }}
      />
      <section style={{ marginBlock: 20 }}>
        <h3>{title}</h3>
        <p>Oleh: {author} | Dipublikasikan: 16 Oktober 2024</p>
      </section>
      <article
        className="cs-blog-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}

export default PreviewPost;
