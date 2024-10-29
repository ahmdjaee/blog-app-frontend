import AuthLayout from "@/layout/AuthLayout";
import Login from "@/page/auth/login";
import Home from "@/page/home";
import { createRoutesFromElements, Route } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import MustNotAuth from "./MustNotAuth";
import RequireAuth from "./RequireAuth";
import Register from "@/page/auth/register";
import PostByCategory from "@/page/post";
import Dashboard from "@/page/admin/dashboard";
import PostDetail from "@/page/post/detail";
import PostSearch from "@/page/post/search";
import DashboardLayout from "@/layout/DashboardLayout";
import MustIsAdmin from "./MustIsAdmin";
import CategoryPanel from "@/page/admin/category";
import PostPanel from "@/page/admin/post";
import PostCreatePanel from "@/page/admin/post/create";
import PostDetailPanel from "@/page/admin/post/detail";
import PostEditPanel from "@/page/admin/post/edit";
import UserPanel from "@/page/admin/user";
import CommentPanel from "@/page/admin/comment";
import MainLayout from "@/layout/MainLayout";
import UserDashboard from "@/page/user/dashboard";
import UserPostPanel from "@/page/user/post";
import TabLayout from "@/layout/TabLayout";

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

      <Route element={<RequireAuth />}>
        <Route path="user" element={<DashboardLayout />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="posts" element={<UserPostPanel />} />
          <Route path="posts/create" element={<PostCreatePanel />} />
          <Route path="posts/edit" element={<PostEditPanel />} />
          <Route path="posts/:slug" element={<PostDetailPanel />} />
        </Route>
      </Route>

      <Route path="/" element={<MainLayout />}>
        <Route element={<TabLayout />}>
          <Route index element={<Home />} />
          <Route path="posts/category/:category" element={<PostByCategory />} />
        </Route>
        <Route path="posts/search" element={<PostSearch />} />
        <Route path="posts/bookmark" element={<PostSearch />} />
        <Route path="posts/:slug" element={<PostDetail />} />
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
