import {
  Activity,
  DollarSign,
  Users,
  Briefcase,
  Star,
} from "lucide-react";

const stats = [
  {
    title: "Projects",
    value: "524",
    icon: Briefcase,
    color: "text-blue-400",
    badge: "LIVE",
    badgeColor: "bg-blue-500/10 text-blue-400",
  },
  {
    title: "Contracts",
    value: "128",
    icon: Activity,
    color: "text-cyan-400",
    badge: "OPEN",
    badgeColor: "bg-cyan-500/10 text-cyan-400",
  },
  {
    title: "Freelancers",
    value: "1,240",
    icon: Users,
    color: "text-violet-400",
    badge: "ONLINE",
    badgeColor: "bg-violet-500/10 text-violet-400",
  },
  {
    title: "Revenue",
    value: "₹2.4L",
    icon: DollarSign,
    color: "text-emerald-400",
    badge: "GROWING",
    badgeColor: "bg-emerald-500/10 text-emerald-400",
    valueColor: "text-emerald-400",
  },
];

const chart = [45, 60, 72, 55, 90, 76, 98];
const labels = ["M", "T", "W", "T", "F", "S", "S"];

function DashboardPreview() {
  return (
    <div className="relative flex justify-center lg:justify-end">

      {/* Dashboard */}

      <div className="relative w-full max-w-[560px] overflow-hidden rounded-[34px] border border-slate-800/70 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 shadow-[0_30px_90px_rgba(37,99,235,0.18)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_110px_rgba(37,99,235,0.28)]">

        {/* Glow */}

        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-[120px]" />

        {/* Header */}

        <div className="relative mb-8 flex items-center justify-between">

          <div className="flex gap-2">

            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-yellow-500" />
            <span className="h-3 w-3 rounded-full bg-green-500" />

          </div>

          <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400">

            ● Live Dashboard

          </div>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-2 gap-5">

          {stats.map((item) => {

            const Icon = item.icon;

            return (

              <div
                key={item.title}
                className="group rounded-3xl border border-slate-800 bg-slate-900/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-slate-900"
              >

                <div className="flex items-center justify-between">

                  <Icon
                    size={22}
                    className={`${item.color} transition-transform duration-300 group-hover:scale-110`}
                  />

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>

                </div>

                <p className="mt-5 text-sm text-slate-400">

                  {item.title}

                </p>

                <h2
                  className={`mt-2 text-4xl font-black ${
                    item.valueColor ?? "text-white"
                  }`}
                >
                  {item.value}
                </h2>

              </div>

            );

          })}

        </div>

        {/* Weekly Performance */}

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/80 p-6">

          <div className="mb-6 flex items-center justify-between">

            <div>

              <h3 className="text-xl font-bold text-white">

                Weekly Performance

              </h3>

              <p className="mt-1 text-sm text-slate-500">

                Project activity this week

              </p>

            </div>

            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-400">

              ▲ +18%

            </span>

          </div>

          <div className="flex h-28 items-end justify-between gap-3">

            {chart.map((value, index) => (

              <div
                key={index}
                className="flex flex-1 flex-col items-center"
              >

                <div
                  className="w-full rounded-t-2xl bg-gradient-to-t from-blue-600 via-blue-500 to-cyan-300 transition-all duration-300 hover:brightness-110"
                  style={{
                    height: `${value}%`,
                  }}
                />

                <span className="mt-2 text-xs text-slate-500">

                  {labels[index]}

                </span>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* Floating Card */}

      <div className="absolute -bottom-8 -right-8 hidden rounded-3xl border border-slate-800 bg-slate-900/95 p-5 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 lg:block">

        <p className="text-sm text-slate-400">

          Client Rating

        </p>

        <div className="mt-3 flex items-center gap-3">

          <Star
            size={22}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="text-4xl font-black text-white">

            4.9

          </span>

        </div>

        <p className="mt-2 text-sm text-slate-500">

          12,000+ Reviews

        </p>

      </div>

    </div>
  );
}

export default DashboardPreview;