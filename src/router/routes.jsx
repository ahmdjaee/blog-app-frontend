// router.tsx
import { lazy, Suspense } from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

// Guards (kalau ringan bisa tetap eager; kalau berat juga bisa dilazy)
import TopBarProgress from "react-topbar-progress-indicator";
import MustIsAdmin from "./MustIsAdmin";
import MustIsUser from "./MustIsUser";
import MustNotAuth from "./MustNotAuth";
import RequireAuth from "./RequireAuth";

// Helper kecil biar rapi
const lazyEl = (factory, Fallback = <TopBarProgress />) => {
  const C = lazy(factory);
  return (
    <Suspense fallback={Fallback}>
      <C />
    </Suspense>
  );
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="*" element={lazyEl(() => import("@/page/NotFound"))} />

      <Route element={<RequireAuth />}>
        <Route element={<MustIsAdmin />}>
          <Route path="admin" element={lazyEl(() => import("@/layout/DashboardLayout"))}>
            <Route
              path="dashboard"
              element={lazyEl(() => import("@/page/admin-panel/dashboard"))}
            />
            <Route
              path="categories"
              element={lazyEl(() => import("@/page/admin-panel/category"))}
            />
            <Route path="users" element={lazyEl(() => import("@/page/admin-panel/user"))} />
            <Route path="posts" element={lazyEl(() => import("@/page/admin-panel/post"))} />
            <Route path="comments" element={lazyEl(() => import("@/page/admin-panel/comment"))} />
            <Route
              path="recommendations"
              element={lazyEl(() => import("@/page/admin-panel/recommendation"))}
            />
            <Route
              path="posts/create"
              element={lazyEl(() => import("@/page/admin-panel/post/create"))}
            />
            <Route
              path="posts/edit"
              element={lazyEl(() => import("@/page/admin-panel/post/edit"))}
            />
            <Route
              path="posts/:slug"
              element={lazyEl(() => import("@/page/admin-panel/post/detail"))}
            />
          </Route>
        </Route>
      </Route>

      <Route path="/" element={lazyEl(() => import("@/layout/MainLayout"))}>
        <Route element={lazyEl(() => import("@/layout/TabLayout"))}>
          <Route index element={lazyEl(() => import("@/page/home"))} />
          <Route path="posts/category/:category" element={lazyEl(() => import("@/page/post"))} />
        </Route>

        <Route path="posts/search" element={lazyEl(() => import("@/page/post/search"))} />
        <Route path="posts/:slug" element={lazyEl(() => import("@/page/post/detail"))} />

        <Route element={<RequireAuth />}>
          <Route path="posts/bookmarks" element={lazyEl(() => import("@/page/bookmark"))} />
          <Route path="user" element={<MustIsUser />}>
            <Route path="dashboard" element={lazyEl(() => import("@/page/user-panel/dashboard"))} />
            <Route path="posts" element={lazyEl(() => import("@/page/user-panel/UserPostLayout"))}>
              <Route path="drafts" element={lazyEl(() => import("@/page/user-panel/post/draft"))} />
              <Route
                path="published"
                element={lazyEl(() => import("@/page/user-panel/post/published"))}
              />
              <Route
                path="comments"
                element={lazyEl(() => import("@/page/user-panel/post/comment"))}
              />
            </Route>
            <Route path="stats" element={lazyEl(() => import("@/page/user-panel/stats"))} />
            <Route
              path="posts/create"
              element={lazyEl(() => import("@/page/user-panel/post/create"))}
            />
            <Route
              path="posts/edit"
              element={lazyEl(() => import("@/page/user-panel/post/edit"))}
            />
            <Route
              path="posts/:slug"
              element={lazyEl(() => import("@/page/admin-panel/post/detail"))}
            />
          </Route>

          <Route
            path="user/profile"
            element={lazyEl(() => import("@/page/user-panel/UserProfileLayout"))}
          >
            <Route index element={lazyEl(() => import("@/page/user-panel/profile/account"))} />
            <Route
              path="socials"
              element={lazyEl(() => import("@/page/user-panel/profile/social"))}
            />
          </Route>
        </Route>
      </Route>

      <Route element={<MustNotAuth />}>
        <Route path="auth" element={lazyEl(() => import("@/layout/AuthLayout"))}>
          <Route path="login" element={lazyEl(() => import("@/page/auth/login"))} />
          <Route path="register" element={lazyEl(() => import("@/page/auth/register"))} />
        </Route>
      </Route>
    </Route>
  )
);
