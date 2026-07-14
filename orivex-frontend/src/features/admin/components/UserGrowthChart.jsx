import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function CustomTooltip({
  active,
  payload,
  label,
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4 shadow-2xl">

      <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-emerald-400">
        {payload[0].value}
      </p>

      <p className="text-sm text-slate-500">
        New Users
      </p>

    </div>
  );
}

function UserGrowthChart({
  data,
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 transition-all duration-300 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10">

      {/* Glow */}

      <div className="absolute -left-20 -top-20 h-52 w-52 rounded-full bg-emerald-500/10 blur-3xl transition-all duration-500 group-hover:bg-emerald-500/20" />

      <div className="relative">

        {/* Header */}

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-bold text-white">
              User Growth
            </h2>

            <p className="mt-2 text-slate-400">
              Monthly user registrations on ORIVEX
            </p>

          </div>

          <div className="rounded-2xl bg-emerald-500/10 px-5 py-3">

            <span className="text-sm font-semibold text-emerald-400">
              Live Analytics
            </span>

          </div>

        </div>

        {/* Chart */}

        <div className="h-96">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 20,
                left: 0,
                bottom: 0,
              }}
            >

              <CartesianGrid
                stroke="#334155"
                strokeDasharray="4 4"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                tick={{
                  fill: "#94A3B8",
                  fontSize: 13,
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fill: "#94A3B8",
                  fontSize: 13,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                cursor={{
                  stroke: "#10B981",
                  strokeWidth: 1,
                }}
                content={<CustomTooltip />}
              />

              <Line
                type="monotone"
                dataKey="value"
                stroke="#10B981"
                strokeWidth={4}
                dot={{
                  r: 5,
                  fill: "#10B981",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 8,
                  fill: "#10B981",
                  stroke: "#ffffff",
                  strokeWidth: 3,
                }}
                animationDuration={900}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}

export default UserGrowthChart;