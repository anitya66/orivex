import DashboardSkeleton from "../components/skeletons/DashboardSkeleton";

import EmptyState from "@/components/ui/EmptyState";
import { useRecentActivity } from "../hooks/useRecentActivity";
import ActivityTimeline from "../components/activity/ActivityTimeline";

import {
  Activity,
  Briefcase,
  Gavel,
  FileText,
  Star,
  Users,
} from "lucide-react";

import CompleteProfileCard from "@/components/dashboard/CompleteProfileCard";

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

  const {
  data: activities = [],
  isLoading: activityLoading,
} = useRecentActivity();

  if (isLoading) {
  return <DashboardSkeleton />;
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

     {/* Welcome Banner */}

     {data?.profileCompleted === false && (
    <CompleteProfileCard role={user?.role} />
      )}
      

<div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-blue-600/20 via-slate-900 to-slate-900 p-8">

  <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-600/10 blur-3xl"></div>

  <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

    <div>

      <span className="rounded-full bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400">
        👋 Welcome Back
      </span>

      <h1 className="mt-5 text-4xl font-bold text-white lg:text-5xl">
        {user?.name}
      </h1>

      <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
        Manage projects, contracts, proposals and
        collaboration from one beautiful workspace.
      </p>

    </div>

    <button
      onClick={() =>
        navigate(
          user?.role === "CLIENT"
            ? "/dashboard/my-projects"
            : user?.role === "FREELANCER"
            ? "/dashboard/browse-projects"
            : "/dashboard/admin/analytics"
        )
      }
      className="rounded-2xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
    >
      {user?.role === "CLIENT"
        ? "Create Project"
        : user?.role === "FREELANCER"
        ? "Browse Projects"
        : "View Analytics"}
    </button>

  </div>

</div>

      {/* CLIENT */}

      {user?.role === "CLIENT" && (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          <StatsCard
            title="Total Projects"
            value={data.totalProjects}
            icon={Briefcase}
            onClick={() => navigate("/dashboard/my-projects")}
          />

          <StatsCard
            title="Open Projects"
            value={data.openProjects}
            icon={Briefcase}
            color="text-green-500"
            onClick={() => navigate("/dashboard/my-projects")}
          />

          <StatsCard
            title="Closed Projects"
            value={data.closedProjects}
            icon={Briefcase}
            color="text-red-500"
            onClick={() => navigate("/dashboard/my-projects")}
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
            onClick={() => navigate("/dashboard/my-projects")}
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

<div className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950">

  <div className="flex items-center justify-between border-b border-slate-800 px-8 py-6">

    <div>

      <h2 className="text-2xl font-bold text-white">
        Recent Activity
      </h2>

      <p className="mt-1 text-sm text-slate-400">
        Your latest actions across ORIVEX.
      </p>

    </div>

    <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
      Live Feed
    </span>

  </div>

  <div className="p-8">

    {activityLoading ? (

      <p className="text-slate-400">
        Loading activities...
      </p>

    ) : (

      <ActivityTimeline
        activities={activities}
        actionText={
          user?.role === "CLIENT"
            ? "Create Project"
            : user?.role === "FREELANCER"
            ? "Browse Projects"
            : "Manage Projects"
        }
        onAction={() =>
          navigate(
            user?.role === "CLIENT"
              ? "/dashboard/my-projects"
              : user?.role === "FREELANCER"
              ? "/dashboard/browse-projects"
              : "/dashboard/admin/projects"
          )
        }
      />

    )}

  </div>

</div>

     {/* ================= QUICK ACTIONS ================= */}

<div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

  <div className="mb-8">

    <h2 className="text-2xl font-bold text-white">
      Quick Actions
    </h2>

    <p className="mt-2 text-slate-400">
      Jump directly to the features you use most.
    </p>

  </div>

  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

    {/* CLIENT */}

    {user?.role === "CLIENT" && (
      <>
        <ActionCard
          emoji="📁"
          title="Create Project"
          description="Post a new project and hire talented freelancers."
          onClick={() => navigate("/dashboard/projects")}
        />

        <ActionCard
          emoji="💬"
          title="Open Chat"
          description="Continue conversations with freelancers."
          onClick={() => navigate("/dashboard/chat")}
        />

        <ActionCard
          emoji="🔔"
          title="Notifications"
          description="Review your latest updates and alerts."
          onClick={() => navigate("/dashboard/notifications")}
        />
      </>
    )}

    {/* FREELANCER */}

    {user?.role === "FREELANCER" && (
      <>
        <ActionCard
          emoji="🔍"
          title="Browse Projects"
          description="Find your next freelance opportunity."
          onClick={() => navigate("/dashboard/browse-projects")}
        />

        <ActionCard
          emoji="💬"
          title="Open Chat"
          description="Stay connected with your clients."
          onClick={() => navigate("/dashboard/chat")}
        />

        <ActionCard
          emoji="🔔"
          title="Notifications"
          description="Keep up with proposals and contracts."
          onClick={() => navigate("/dashboard/notifications")}
        />
      </>
    )}

    {/* ADMIN */}

    {user?.role === "ADMIN" && (
      <>
        <ActionCard
          emoji="📊"
          title="Analytics"
          description="View platform analytics and reports."
          onClick={() => navigate("/dashboard/admin/analytics")}
        />

        <ActionCard
          emoji="📁"
          title="Projects"
          description="Manage all platform projects."
          onClick={() => navigate("/dashboard/admin/projects")}
        />

        <ActionCard
          emoji="🔔"
          title="Notifications"
          description="Review platform notifications."
          onClick={() => navigate("/dashboard/notifications")}
        />
      </>
    )}

  </div>

</div>

    </div>
  );
}
function ActionCard({
  emoji,
  title,
  description,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="group rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 text-left transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10"
    >
      <div className="mb-5 text-4xl">
        {emoji}
      </div>

      <h3 className="text-xl font-bold text-white">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-400">
        {description}
      </p>

      <span className="mt-6 inline-block font-semibold text-blue-400 transition group-hover:translate-x-1">
        Open →
      </span>
    </button>
  );
}

export default DashboardPage;