import { Routes, Route } from "react-router-dom";

import { ROUTES } from "@/constants/routes";

import ProtectedRoute from "./ProtectedRoute";

import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

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

import NotFoundPage from "@/features/not-found/pages/NotFoundPage";

export default function AppRouter() {
  return (
    <Routes>

      {/* Public */}

      <Route element={<MainLayout />}>
        <Route
          path={ROUTES.HOME}
          element={<LandingPage />}
        />
      </Route>

      {/* Auth */}

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

      {/* Protected */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >

        <Route
          index
          element={<DashboardPage />}
        />

        {/* Client */}

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

        {/* Freelancer */}

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

      </Route>

      {/* 404 */}

      <Route
        path="*"
        element={<NotFoundPage />}
      />

    </Routes>
  );
}