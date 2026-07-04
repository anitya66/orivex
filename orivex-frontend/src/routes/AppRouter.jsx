import { Routes, Route } from "react-router-dom";

import { ROUTES } from "@/constants/routes";

import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

import HomePage from "@/features/home/pages/HomePage";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import NotFoundPage from "@/features/not-found/pages/NotFoundPage";

function AppRouter() {
  return (
    <Routes>

      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  );
}

export default AppRouter;