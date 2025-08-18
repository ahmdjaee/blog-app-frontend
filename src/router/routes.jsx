import AuthLayout from "@/layout/AuthLayout";
import DashboardLayout from "@/layout/DashboardLayout";
import MainLayout from "@/layout/MainLayout";
import TabLayout from "@/layout/TabLayout";
import CategoryPanel from "@/page/admin-panel/category";
import CommentPanel from "@/page/admin-panel/comment";
import Dashboard from "@/page/admin-panel/dashboard";
import PostPanel from "@/page/admin-panel/post";
import PostCreatePanel from "@/page/admin-panel/post/create";
import PostDetailPanel from "@/page/admin-panel/post/detail";
import PostEditPanel from "@/page/admin-panel/post/edit";
import UserPanel from "@/page/admin-panel/user";
import Login from "@/page/auth/login";
import Register from "@/page/auth/register";
import Bookmark from "@/page/bookmark";
import Home from "@/page/home";
import PostByCategory from "@/page/post";
import PostDetail from "@/page/post/detail";
import PostSearch from "@/page/post/search";
import UserDashboard from "@/page/user-panel/dashboard";
import UserCommentPanel from "@/page/user-panel/post/comment";
import UserDraftPanel from "@/page/user-panel/post/draft";
import UserPublishedPanel from "@/page/user-panel/post/published";
import { createRoutesFromElements, Route } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import MustIsAdmin from "./MustIsAdmin";
import MustIsUser from "./MustIsUser";
import MustNotAuth from "./MustNotAuth";
import RequireAuth from "./RequireAuth";
import UserPostLayout from "@/page/user-panel/UserPostLayout";
import UserPostCreatePanel from "@/page/user-panel/post/create";
import UserPostEditPanel from "@/page/user-panel/post/edit";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<RequireAuth />}>
        <Route element={<MustIsAdmin />}>
          <Route path="admin" element={<DashboardLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="categories" element={<CategoryPanel />} />
            <Route path="users" element={<UserPanel />} />
            <Route path="posts" element={<PostPanel />} />
            <Route path="comments" element={<CommentPanel />} />
            <Route path="posts/create" element={<PostCreatePanel />} />
            <Route path="posts/edit" element={<PostEditPanel />} />
            <Route path="posts/:slug" element={<PostDetailPanel />} />
          </Route>
        </Route>
      </Route>

      <Route path="/" element={<MainLayout />}>
        <Route element={<TabLayout />}>
          <Route index element={<Home />} />
          <Route path="posts/category/:category" element={<PostByCategory />} />
        </Route>
        <Route path="posts/search" element={<PostSearch />} />
        <Route path="posts/:slug" element={<PostDetail />} />
        <Route element={<RequireAuth />}>
          <Route path="posts/bookmarks" element={<Bookmark />} />
          <Route path="user" element={<MustIsUser />}>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="posts" element={<UserPostLayout />}>
              <Route path="drafts" element={<UserDraftPanel />} />
              <Route path="published" element={<UserPublishedPanel />} />
              <Route path="comments" element={<UserCommentPanel />} />
            </Route>
            <Route path="posts/create" element={<UserPostCreatePanel />} />
            <Route path="posts/edit" element={<UserPostEditPanel />} />
            <Route path="posts/:slug" element={<PostDetailPanel />} />
          </Route>
        </Route>
      </Route>

      <Route element={<MustNotAuth />}>
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Route>
    </Route>
  )
);
