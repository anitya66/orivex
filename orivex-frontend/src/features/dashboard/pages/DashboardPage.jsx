import {
  Briefcase,
  Gavel,
  FileText,
  Star,
  Users,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";
import StatsCard from "@/components/dashboard/StatsCard";

import { useDashboard } from "../hooks/useDashboard";

function DashboardPage() {
  const { user } = useAuth();

  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
  } = useDashboard();

  if (isLoading) {
    return (
      <div className="p-8 text-white">
        Loading dashboard...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-red-500">
        Failed to load dashboard.
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Welcome */}

      <div>

        <h1 className="text-4xl font-bold text-white">
          Welcome back,
          <span className="text-blue-500">
            {" "}
            {user?.name}
          </span>
        </h1>

        <p className="mt-3 text-slate-400">
          Here's what's happening in your ORIVEX workspace today.
        </p>

      </div>

      {/* CLIENT */}

      {user?.role === "CLIENT" && (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          <StatsCard
            title="Total Projects"
            value={data.totalProjects}
            icon={Briefcase}
            onClick={() => navigate("/dashboard/projects")}
          />

          <StatsCard
            title="Open Projects"
            value={data.openProjects}
            icon={Briefcase}
            color="text-green-500"
            onClick={() => navigate("/dashboard/projects")}
          />

          <StatsCard
            title="Closed Projects"
            value={data.closedProjects}
            icon={Briefcase}
            color="text-red-500"
            onClick={() => navigate("/dashboard/projects")}
          />

          <StatsCard
            title="Active Contracts"
            value={data.activeContracts}
            icon={FileText}
            color="text-yellow-500"
            onClick={() => navigate("/dashboard/contracts")}
          />

          <StatsCard
            title="Completed Contracts"
            value={data.completedContracts}
            icon={FileText}
            color="text-cyan-500"
            onClick={() => navigate("/dashboard/contracts")}
          />

          <StatsCard
            title="Pending Proposals"
            value={data.pendingProposals}
            icon={Gavel}
            color="text-pink-500"
            onClick={() => navigate("/dashboard/projects")}
          />

        </div>

      )}

      {/* FREELANCER */}

      {user?.role === "FREELANCER" && (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          <StatsCard
            title="Applications"
            value={data.totalApplications}
            icon={Gavel}
            onClick={() => navigate("/dashboard/my-proposals")}
          />

          <StatsCard
            title="Accepted"
            value={data.acceptedProposals}
            icon={Briefcase}
            color="text-green-500"
            onClick={() => navigate("/dashboard/my-proposals")}
          />

          <StatsCard
            title="Rejected"
            value={data.rejectedProposals}
            icon={Briefcase}
            color="text-red-500"
            onClick={() => navigate("/dashboard/my-proposals")}
          />

          <StatsCard
            title="Active Contracts"
            value={data.activeContracts}
            icon={FileText}
            color="text-yellow-500"
            onClick={() => navigate("/dashboard/my-contracts")}
          />

          <StatsCard
            title="Completed Contracts"
            value={data.completedContracts}
            icon={Star}
            color="text-cyan-500"
            onClick={() => navigate("/dashboard/my-contracts")}
          />

        </div>

      )}
    
          {/* ================= ADMIN ================= */}

      {user?.role === "ADMIN" && (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <StatsCard
            title="Users"
            value={data.totalUsers}
            icon={Users}
            onClick={() => navigate("/dashboard")}
          />

          <StatsCard
            title="Freelancers"
            value={data.totalFreelancers}
            icon={Users}
            color="text-green-500"
            onClick={() => navigate("/dashboard")}
          />

          <StatsCard
            title="Clients"
            value={data.totalClients}
            icon={Users}
            color="text-cyan-500"
            onClick={() => navigate("/dashboard")}
          />

          <StatsCard
            title="Projects"
            value={data.totalProjects}
            icon={Briefcase}
            onClick={() => navigate("/dashboard/projects")}
          />

          <StatsCard
            title="Open Projects"
            value={data.openProjects}
            icon={Briefcase}
            color="text-yellow-500"
            onClick={() => navigate("/dashboard/projects")}
          />

          <StatsCard
            title="Closed Projects"
            value={data.closedProjects}
            icon={Briefcase}
            color="text-red-500"
            onClick={() => navigate("/dashboard/projects")}
          />

          <StatsCard
            title="Contracts"
            value={data.totalContracts}
            icon={FileText}
            onClick={() => navigate("/dashboard/contracts")}
          />

          <StatsCard
            title="Reviews"
            value={data.totalReviews}
            icon={Star}
            color="text-pink-500"
            onClick={() => navigate("/dashboard")}
          />

        </div>

      )}

      {/* ================= RECENT ACTIVITY ================= */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

        <div className="flex items-center justify-between">

          <h2 className="text-xl font-semibold text-white">
            Recent Activity
          </h2>

          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">
            Coming Soon
          </span>

        </div>

        <div className="mt-6 rounded-xl border border-dashed border-slate-700 p-10 text-center">

          <h3 className="text-lg font-semibold text-white">
            No recent activity
          </h3>

          <p className="mt-2 text-slate-500">
            Once you start creating projects, applying for jobs,
            signing contracts, or receiving messages,
            your latest activity will appear here.
          </p>

        </div>

      </div>

      {/* ================= QUICK ACTIONS ================= */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

        <h2 className="text-xl font-semibold text-white">
          Quick Actions
        </h2>

        <div className="mt-6 flex flex-wrap gap-4">

          {/* CLIENT */}

          {user?.role === "CLIENT" && (
  <>
    <button
      onClick={() => navigate("/dashboard/projects")}
      className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
    >
      ➕ Create Project
    </button>

    <button
      onClick={() => navigate("/dashboard/chat")}
      className="rounded-xl bg-slate-800 px-5 py-3 font-medium text-white transition hover:bg-slate-700"
    >
      💬 Open Chat
    </button>

    <button
      onClick={() => navigate("/dashboard/notifications")}
      className="rounded-xl bg-slate-800 px-5 py-3 font-medium text-white transition hover:bg-slate-700"
    >
      🔔 Notifications
    </button>
  </>
)}

          {/* FREELANCER */}

         {user?.role === "FREELANCER" && (
  <>
    <button
      onClick={() => navigate("/dashboard/browse-projects")}
      className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
    >
      🔍 Browse Projects
    </button>

    <button
      onClick={() => navigate("/dashboard/chat")}
      className="rounded-xl bg-slate-800 px-5 py-3 font-medium text-white transition hover:bg-slate-700"
    >
      💬 Open Chat
    </button>

    <button
      onClick={() => navigate("/dashboard/notifications")}
      className="rounded-xl bg-slate-800 px-5 py-3 font-medium text-white transition hover:bg-slate-700"
    >
      🔔 Notifications
    </button>
  </>
)}
          {/* ADMIN */}

         {user?.role === "ADMIN" && (
  <>
    <button
      onClick={() => navigate("/dashboard")}
      className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
    >
      📊 Analytics
    </button>

    <button
      onClick={() => navigate("/dashboard/projects")}
      className="rounded-xl bg-slate-800 px-5 py-3 font-medium text-white transition hover:bg-slate-700"
    >
      📁 Manage Projects
    </button>

    <button
      onClick={() => navigate("/dashboard/notifications")}
      className="rounded-xl bg-slate-800 px-5 py-3 font-medium text-white transition hover:bg-slate-700"
    >
      🔔 Notifications
    </button>
  </>
)}

        </div>

      </div>

    </div>
  );
}

export default DashboardPage;