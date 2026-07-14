import {
  ResponsiveContainer,
  BarChart,
  Bar,
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

      <p className="mt-2 text-2xl font-bold text-blue-400">
        {payload[0].value}
      </p>

      <p className="text-sm text-slate-500">
        Projects Created
      </p>

    </div>
  );
}

function ProjectGrowthChart({
  data,
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 transition-all duration-300 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10">

      {/* Glow */}

      <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl transition-all duration-500 group-hover:bg-blue-500/20" />

      <div className="relative">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-bold text-white">
              Project Growth
            </h2>

            <p className="mt-2 text-slate-400">
              Monthly project creation across the platform
            </p>

          </div>

          <div className="rounded-2xl bg-blue-500/10 px-5 py-3">

            <span className="text-sm font-semibold text-blue-400">
              Monthly Analytics
            </span>

          </div>

        </div>

        <div className="h-96">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart
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
                  fill: "rgba(37,99,235,0.08)",
                }}
                content={<CustomTooltip />}
              />

              <Bar
                dataKey="value"
                radius={[12, 12, 0, 0]}
                fill="#3B82F6"
                animationDuration={900}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}

export default ProjectGrowthChart;