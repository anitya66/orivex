import { Briefcase, Gavel, FileText, Star } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import StatsCard from "@/components/dashboard/StatsCard";

function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <div>
        <h1 className="text-4xl font-bold text-white">
          Welcome back,
          <span className="text-blue-500"> {user?.name}</span>
        </h1>

        <p className="mt-3 text-slate-400">
          Here's what's happening in your ORIVEX workspace today.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Active Projects"
          value="0"
          icon={Briefcase}
        />

        <StatsCard
          title="Active Bids"
          value="0"
          icon={Gavel}
          color="text-green-500"
        />

        <StatsCard
          title="Contracts"
          value="0"
          icon={FileText}
          color="text-yellow-500"
        />

        <StatsCard
          title="Reviews"
          value="0"
          icon={Star}
          color="text-pink-500"
        />
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-xl font-semibold text-white">
          Recent Activity
        </h2>

        <div className="mt-6 flex h-48 items-center justify-center rounded-xl border border-dashed border-slate-700">
          <p className="text-slate-500">
            No recent activity yet.
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-xl font-semibold text-white">
          Quick Actions
        </h2>

        <div className="mt-6 flex flex-wrap gap-4">
          <button className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700">
            Create Project
          </button>

          <button className="rounded-xl bg-slate-800 px-5 py-3 font-medium text-white transition hover:bg-slate-700">
            Browse Projects
          </button>

          <button className="rounded-xl bg-slate-800 px-5 py-3 font-medium text-white transition hover:bg-slate-700">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;