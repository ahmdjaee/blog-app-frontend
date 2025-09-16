import { LikeFilled, MessageFilled } from "@ant-design/icons";
import { Avatar, Grid, Image, theme } from "antd";
import { useNavigate } from "react-router-dom";
import BookmarkToggle from "./BookmarkToggle";

function PostCard({ post = {} }) {
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const { md } = Grid.useBreakpoint();

  return (
    <div className="h-full min-h-[150px] p-[16px] cursor-pointer [border-bottom:1px_solid_#f0f0f0]">
      <div className="flex gap-2 items-center mb-[10px]">
        <Avatar
          size={"small"}
          style={{
            background: post?.author?.avatar === null && token.colorPrimary,
            verticalAlign: "middle",
          }}
          src={post?.author?.avatar}
        >
          {post?.author?.name.charAt(0).toUpperCase()}
        </Avatar>
        <p>{post?.author?.name}</p>|
        <p className="cs-ellipsis-1 font-semibold mr-2" style={{ color: token.colorPrimary }}>
          {post.category.name}
        </p>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <Image
            width={"100%"}
            style={{
              objectFit: "cover",
              objectPosition: "top",
              aspectRatio: "1/1",
            }}
            loading="lazy"
            src={post.thumbnail}
            alt={post.title}
          />
        </div>
        <div className="col-span-9">
          <div
            className="h-full flex flex-col"
            onClick={() => navigate(`/posts/${post.slug}`, { state: { post } })}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2
                style={{ marginBottom: md ? 8 : 0, fontWeight: "700", fontSize: md ? 24 : 20 }}
                className="cs-ellipsis"
              >
                {post.title}
              </h2>
              <BookmarkToggle isMark={post?.marked} postId={post?.id} />
            </div>
            <h3
              className="mb-4 font-normal leading-relaxed cs-ellipsis"
              style={{ color: "rgb(107, 107, 107)" }}
            >
              {post?.sub_title}
            </h3>
            <div className="mt-auto flex justify-between">
              <p className="truncate">{post.published_at}</p>
              <div className="mt-1.5 flex justify-end gap-4 mr-2">
                {/* <IconText icon={EyeFilled} text={100} /> */}
                <IconText icon={MessageFilled} text={post?.comments} />
                <IconText icon={LikeFilled} text={post?.likes} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconText({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  const { token } = theme.useToken();
  return (
    <div className="flex items-center gap-1">
      <Icon style={{ color: token.colorTextSecondary }} />{" "}
      <p style={{ color: token.colorTextSecondary }}>{text}</p>
    </div>
  );
}

export default PostCard;
