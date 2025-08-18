import ContentWrapper from "@/components/ContentWrapper";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Divider, Flex, message, Tabs, Upload } from "antd";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const UserProfileLayout = () => {
  const navigate = useNavigate();
  const path = window.location.pathname.split("/").pop();

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <ContentWrapper>
      <Flex align="center" justify="space-between">
        <h1 style={{ paddingBlock: "20px" }}>Profile</h1>
        <Upload
          accept="image/png, image/jpeg"
          name="avatar"
          listType="picture-circle"
          className="avatar-uploader"
          showUploadList={false}
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: "100%" }} /> : uploadButton}
        </Upload>
      </Flex>
      <Divider />
      <Tabs
        onChange={(key) => navigate(key)}
        defaultActiveKey={path}
        items={[
          {
            label: "Account",
            key: "",
          },
          {
            label: "Socials",
            key: "socials",
          },
        ]}
      />
      <Outlet />
    </ContentWrapper>
  );
};

export default UserProfileLayout;
