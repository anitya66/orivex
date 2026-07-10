import { Routes, Route } from "react-router-dom";

import { ROUTES } from "@/constants/routes";

import ProtectedRoute from "./ProtectedRoute";

import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import SettingsPage from "@/features/settings/pages/SettingsPage";
import LandingPage from "@/features/landing/pages/LandingPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";

import DashboardPage from "@/features/dashboard/pages/DashboardPage";

import ProjectsPage from "@/features/projects/pages/ProjectsPage";
import MyProjectsPage from "@/features/projects/pages/MyProjectsPage";
import ProjectDetailsPage from "@/features/projects/pages/ProjectDetailsPage";

import BrowseProjectsPage from "@/features/freelancer/pages/BrowseProjectsPage";
import FreelancerProjectDetailsPage from "@/features/freelancer/pages/FreelancerProjectDetailsPage";

import MyProposalsPage from "@/features/proposals/pages/MyProposalsPage";

import ClientContractsPage from "@/features/contracts/pages/ClientContractsPage";
import MyContractsPage from "@/features/contracts/pages/MyContractsPage";
import ContractDetailsPage from "@/features/contracts/pages/ContractDetailsPage";

import NotificationsPage from "@/features/notifications/pages/NotificationsPage";

import ChatPage from "@/features/chat/pages/ChatPage";

import ProfilePage from "@/features/profile/pages/ProfilePage";

import AdminUsersPage from "@/features/admin/pages/AdminUsersPage";
import AdminProjectsPage from "@/features/admin/pages/AdminProjectsPage";
import AdminContractsPage from "@/features/admin/pages/AdminContractsPage";
import AdminAnalyticsPage from "@/features/admin/pages/AdminAnalyticsPage";

import NotFoundPage from "@/features/not-found/pages/NotFoundPage";

export default function AppRouter() {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}

      <Route element={<MainLayout />}>
        <Route
          path={ROUTES.HOME}
          element={<LandingPage />}
        />
      </Route>

      {/* ================= AUTH ================= */}

      <Route element={<AuthLayout />}>
        <Route
          path={ROUTES.LOGIN}
          element={<LoginPage />}
        />

        <Route
          path={ROUTES.REGISTER}
          element={<RegisterPage />}
        />
      </Route>

      {/* ================= DASHBOARD ================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard Home */}

        <Route
          index
          element={<DashboardPage />}
        />

        {/* ================= CLIENT ================= */}

        <Route
          path="projects"
          element={<ProjectsPage />}
        />

        <Route
          path="projects/:id"
          element={<ProjectDetailsPage />}
        />

        <Route
          path="my-projects"
          element={<MyProjectsPage />}
        />

        <Route
          path="my-projects/:id"
          element={<ProjectDetailsPage />}
        />

        {/* ================= FREELANCER ================= */}

        <Route
          path="browse-projects"
          element={<BrowseProjectsPage />}
        />

        <Route
          path="browse-projects/:id"
          element={<FreelancerProjectDetailsPage />}
        />

        <Route
          path="my-proposals"
          element={<MyProposalsPage />}
        />

        {/* ================= CONTRACTS ================= */}

        <Route
          path="contracts"
          element={<ClientContractsPage />}
        />

        <Route
          path="contracts/:id"
          element={<ContractDetailsPage />}
        />

        <Route
          path="my-contracts"
          element={<MyContractsPage />}
        />

        {/* ================= CHAT ================= */}

        <Route
          path="chat"
          element={<ChatPage />}
        />

        {/* ================= NOTIFICATIONS ================= */}

        <Route
          path="notifications"
          element={<NotificationsPage />}
        />

        <Route
    path="profile"
    element={<ProfilePage />}
/>

<Route
    path="settings"
    element={<SettingsPage />}
/>

        {/* ================= PROFILE ================= */}

        <Route
          path="profile"
          element={<ProfilePage />}
        />

        {/* ================= ADMIN ================= */}

        <Route path="admin">
          <Route
            path="users"
            element={<AdminUsersPage />}
          />

          <Route
            path="projects"
            element={<AdminProjectsPage />}
          />

          <Route
            path="contracts"
            element={<AdminContractsPage />}
          />

          <Route
            path="analytics"
            element={<AdminAnalyticsPage />}
          />

          <Route
    path="settings"
    element={<SettingsPage />}
/>
        </Route>
      </Route>

      {/* ================= 404 ================= */}

      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}