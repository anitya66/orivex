import {
  Users,
  Briefcase,
  FolderOpen,
  FileText,
  TrendingUp,
  UserCheck,
  Clock3,
  CheckCircle2,
} from "lucide-react";

function DashboardCard({
  title,
  value,
}) {
  const config = getConfig(title);

  const Icon = config.icon;

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-800
        bg-gradient-to-br
        from-slate-900
        via-slate-900
        to-slate-950
        p-7
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-500/40
        hover:shadow-2xl
        hover:shadow-blue-500/10
      "
    >
      {/* Glow */}

      <div
        className={`absolute -right-14 -top-14 h-40 w-40 rounded-full blur-3xl ${config.glow}`}
      />

      {/* Top */}

      <div className="relative flex items-center justify-between">

        <div>

          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            {title}
          </p>

          <h2 className="mt-4 text-5xl font-black tracking-tight text-white">
            {value}
          </h2>

        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl ${config.iconBg}`}
        >
          <Icon
            size={30}
            className={config.iconColor}
          />
        </div>

      </div>

      {/* Bottom */}

      <div className="relative mt-8">

        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">

          <div
            className={`h-full rounded-full ${config.progress}`}
            style={{ width: "100%" }}
          />

        </div>

        <div className="mt-4 flex items-center justify-between">

          <span className="text-xs font-medium tracking-wide text-slate-500">
            Live Platform Data
          </span>

          <span className="text-xs font-semibold text-slate-400">
            Updated now
          </span>

        </div>

      </div>
    </div>
  );
}

function getConfig(title) {
  switch (title) {
    case "Users":
    case "Total Users":
      return {
        icon: Users,
        iconBg: "bg-blue-500/10",
        iconColor: "text-blue-400",
        glow: "bg-blue-500/15",
        progress: "bg-blue-500",
      };

    case "Freelancers":
      return {
        icon: UserCheck,
        iconBg: "bg-violet-500/10",
        iconColor: "text-violet-400",
        glow: "bg-violet-500/15",
        progress: "bg-violet-500",
      };

    case "Clients":
      return {
        icon: Users,
        iconBg: "bg-cyan-500/10",
        iconColor: "text-cyan-400",
        glow: "bg-cyan-500/15",
        progress: "bg-cyan-500",
      };

    case "Projects":
    case "Total Projects":
      return {
        icon: FolderOpen,
        iconBg: "bg-amber-500/10",
        iconColor: "text-amber-400",
        glow: "bg-amber-500/15",
        progress: "bg-amber-500",
      };

    case "Open Projects":
      return {
        icon: Clock3,
        iconBg: "bg-sky-500/10",
        iconColor: "text-sky-400",
        glow: "bg-sky-500/15",
        progress: "bg-sky-500",
      };

    case "In Progress":
      return {
        icon: TrendingUp,
        iconBg: "bg-orange-500/10",
        iconColor: "text-orange-400",
        glow: "bg-orange-500/15",
        progress: "bg-orange-500",
      };

    case "Completed":
      return {
        icon: CheckCircle2,
        iconBg: "bg-emerald-500/10",
        iconColor: "text-emerald-400",
        glow: "bg-emerald-500/15",
        progress: "bg-emerald-500",
      };

    case "Contracts":
      return {
        icon: FileText,
        iconBg: "bg-pink-500/10",
        iconColor: "text-pink-400",
        glow: "bg-pink-500/15",
        progress: "bg-pink-500",
      };

    default:
      return {
        icon: Briefcase,
        iconBg: "bg-slate-700",
        iconColor: "text-white",
        glow: "bg-slate-500/10",
        progress: "bg-slate-500",
      };
  }
}

export default DashboardCard;