import ContentWrapper from "@/components/ContentWrapper";
import { useAuth } from "@/hooks/useAuth";
import { setAuthStorageAndState } from "@/redux/store";
import { getCurrentUserAndToken } from "@/service/token";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Divider, Flex, message, Tabs, Upload } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";


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
  const user = useAuth();

  const [loading, setLoading] = useState(false);
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setLoading(false);
      setAuthStorageAndState(info.file.response.data);
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
        <div className="">
          <Upload
            accept="image/png, image/jpeg"
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            action={import.meta.env.VITE_BASE_URL + "/api/profile/update-avatar"}
            headers={{
              authorization: `Bearer ${getCurrentUserAndToken()?.token}`,
            }}
          >
            {user?.avatar ? (
              <img
                src={user?.avatar}
                alt="avatar"
                style={{
                  width: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                  height: "inherit",
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
          <Title style={{ textAlign: "center" }} level={5}>
            {user?.name}
          </Title>
        </div>
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
