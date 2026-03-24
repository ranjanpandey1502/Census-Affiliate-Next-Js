import { lazy } from "react";
//
import type { RouteConfig } from "@/types/types";
import { APP_PATHS } from "./paths";
import PublicLayout from "@/components/layouts/PublicLayout";
import UsersPage from "@/app-pages/adminPages/usersPage/UsersPage";
import WordPressUsers from "@/app-pages/adminPages/wpUsersPage";
import MessagesPage from "@/app-pages/adminPages/messagesPage";
import CommissionPage from "@/app-pages/affiliatePages/commissionPage";

const DashboardPage = lazy(() => import("@/app-pages/dashboardPage"));
const SignInPage = lazy(() => import("@/app-pages/signInPage"));
const SignUpPage = lazy(() => import("@/app-pages/signUpPage"));
const NotFoundPage = lazy(() => import("@/app-pages/notFoundPage"));
const UserProfilePage = lazy(() => import("@/app-pages/userProfilePage"));
const AffiliateLinksPage = lazy(
  () => import("@/app-pages/affiliatePages/affLinksPage"),
);
const ForgotPasswordPage = lazy(() => import("@/app-pages/forgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("@/app-pages/resetPasswordPage"));
const ManageUserPage = lazy(() => import("@/app-pages/adminPages/manageUserPage"));

// Landing Page
const LandingPage = lazy(() => import("@/app-pages/landingPages/LandingPage"));
const CookiePolicy = lazy(() => import("@/app-pages/landingPages/CookiePolicy"));
const PrivacyPolicy = lazy(() => import("@/app-pages/landingPages/PrivacyPolicy"));

export const publicRoutes: RouteConfig[] = [
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/",
    // element: <Navigate to="dashboard" replace />,
    element: <LandingPage />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/cookie-policy",
    element: <CookiePolicy />,
  },
];
// Admin and affiliate pages
export const adminRoutes: RouteConfig[] = [
  {
    path: APP_PATHS.dashboard,
    element: <DashboardPage />,
  },
  {
    path: APP_PATHS.profile,
    element: <UserProfilePage />,
  },
  {
    path: APP_PATHS.users,
    element: <UsersPage />,
  },
  {
    path: APP_PATHS.affiliateLinks,
    element: <AffiliateLinksPage />,
  },
  {
    path: APP_PATHS.wordPressUsers,
    element: <WordPressUsers />,
  },
  {
    path: APP_PATHS.contactLeads,
    element: <MessagesPage />,
  },
  {
    path: APP_PATHS.manageUser(":id"),
    element: <ManageUserPage />,
  },
  {
    path: APP_PATHS.commissionPage,
    element: <CommissionPage />,
  },
];

export const authRoutes: RouteConfig[] = [
  {
    path: APP_PATHS.signInPage,
    element: (
      <PublicLayout>
        <SignInPage />
      </PublicLayout>
    ),
  },
  {
    path: APP_PATHS.singUpPage,
    element: (
      <PublicLayout>
        <SignUpPage />
      </PublicLayout>
    ),
  },
  {
    path: APP_PATHS.forgotPassword,
    element: (
      <PublicLayout>
        <ForgotPasswordPage />
      </PublicLayout>
    ),
  },
  {
    path: APP_PATHS.resetPassword(":token"),
    element: (
      <PublicLayout>
        <ResetPasswordPage />
      </PublicLayout>
    ),
  },
];
