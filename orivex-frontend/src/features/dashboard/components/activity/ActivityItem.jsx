import {
  Briefcase,
  FileText,
  Gavel,
  Star,
} from "lucide-react";

const icons = {
  PROJECT: Briefcase,
  PROPOSAL: Gavel,
  CONTRACT: FileText,
  REVIEW: Star,
};

const colors = {
  PROJECT: "bg-blue-500/10 text-blue-400",
  PROPOSAL: "bg-violet-500/10 text-violet-400",
  CONTRACT: "bg-emerald-500/10 text-emerald-400",
  REVIEW: "bg-yellow-500/10 text-yellow-400",
};

function formatTime(date) {
  const now = new Date();

  const activityDate = new Date(date);

  const diff = Math.floor(
    (now - activityDate) / 1000
  );

  if (diff < 60) return "Just now";

  if (diff < 3600)
    return `${Math.floor(diff / 60)} min ago`;

  if (diff < 86400)
    return `${Math.floor(diff / 3600)} hr ago`;

  if (diff < 172800)
    return "Yesterday";

  return activityDate.toLocaleDateString();
}

function ActivityItem({ activity }) {
  const Icon =
    icons[activity.type] || Briefcase;

  return (
    <div className="group relative flex gap-5 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 transition-all duration-300 hover:border-blue-500/40 hover:shadow-[0_10px_40px_rgba(37,99,235,0.15)]">

      <div className="absolute left-11 top-16 bottom-0 w-px bg-slate-800 group-last:hidden" />

      <div
        className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
          colors[activity.type] ||
          "bg-slate-800 text-white"
        }`}
      >
        <Icon size={24} />
      </div>

      <div className="flex-1">

        <div className="flex items-start justify-between gap-4">

          <div>

            <h3 className="text-lg font-bold text-white">
              {activity.title}
            </h3>

            <p className="mt-2 leading-7 text-slate-400">
              {activity.description}
            </p>

          </div>

          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-400">

            {formatTime(activity.time)}

          </span>

        </div>

      </div>

    </div>
  );
}

export default ActivityItem;