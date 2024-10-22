import PostCard from "@/components/PostCard";
import { useGetPostQuery } from "@/service/extended/postApi";
import { Col, Row, Skeleton, Spin } from "antd";

const list = {
  data: [
    {
      title: "Cara Membuat Web",
      content:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias quasi maxime eveniet animi. Eius sit dicta eaque ipsa expedita quas ipsum ratione, praesentium illum, facilis, mollitia laudantium fuga molestias omnis?",
      image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      category: {
        name: "Teknologi",
        slug: "est-tempore-nobis-ad-debitis-quaerat-accusamus-dolorem",
      },
      published_at: "1 jam lalu",
    },
    {
      title: "Cara Membuat Web",
      content:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias quasi maxime eveniet animi. Eius sit dicta eaque ipsa expedita quas ipsum ratione, praesentium illum, facilis, mollitia laudantium fuga molestias omnis?",
      image:
        "https://www.blibli.com/friends-backend/wp-content/uploads/2020/10/sepak-bola_11zon-1.jpg",
      category: {
        name: "Sepak Bola",
        slug: "voluptate-laboriosam-excepturi-sapiente-non-excepturi-aut-tenetur-cumque",
      },
      published_at: "1 jam lalu",
    },
  ],
};
function Home() {
  const { data: list, isLoading } = useGetPostQuery();

  return (
    <Skeleton loading={isLoading}>
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 24 },
          { xs: 8, sm: 16, md: 24, lg: 24 },
        ]}
        justify={"start"}
      >
        {list?.data?.map((post, index) => (
          <Col key={index} xs={24} sm={12} xl={8} span={8}>
            <PostCard post={post} />
          </Col>
        ))}
      </Row>
    </Skeleton>
  );
}

export default Home;
