import { useToggleBookmarkMutation } from "@/service/extended/bookmarkApi";
import { Button, Tooltip } from "antd";
import React from "react";

const BookmarkToggle = ({ isMark = false, postId = "" }) => {
  const [toggleBookmark, { isLoading }] = useToggleBookmarkMutation();
  const handleBookmark = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await toggleBookmark({ post_id: postId }).unwrap();
    } catch (error) {
      console.log("🚀 ~ handleBookmark ~ error:", error);
    }
  };

  return (
    <Tooltip title={"Bookmark"}>
      <Button
        style={{ paddingInline: 6 }}
        variant="text"
        loading={isLoading}
        onClick={handleBookmark}
        color="default"
      >
        {isMark ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
            style={{ color: "GrayText" }}
          >
            <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
            style={{ color: "GrayText" }}
          >
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
          </svg>
        )}
      </Button>
    </Tooltip>
  );
};

export default BookmarkToggle;
