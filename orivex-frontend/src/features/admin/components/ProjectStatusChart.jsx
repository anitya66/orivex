import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#8B5CF6",
  "#F59E0B",
  "#EF4444",
];

function CustomTooltip({
  active,
  payload,
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4 shadow-2xl">

      <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
        {payload[0].name}
      </p>

      <p className="mt-2 text-2xl font-bold text-blue-400">
        {payload[0].value}
      </p>

      <p className="text-sm text-slate-500">
        Projects
      </p>

    </div>
  );
}

function renderLegend(props) {
  const { payload } = props;

  return (
    <div className="mt-8 flex flex-wrap justify-center gap-5">

      {payload.map((entry) => (

        <div
          key={entry.value}
          className="flex items-center gap-2"
        >

          <span
            className="h-3 w-3 rounded-full"
            style={{
              backgroundColor: entry.color,
            }}
          />

          <span className="text-sm font-medium text-slate-300">
            {entry.value}
          </span>

        </div>

      ))}

    </div>
  );
}

function ProjectStatusChart({
  data,
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 transition-all duration-300 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10">

      {/* Background Glow */}

      <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl transition-all duration-500 group-hover:bg-blue-500/20" />

      <div className="relative">

        {/* Header */}

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-bold text-white">
              Project Status
            </h2>

            <p className="mt-2 text-slate-400">
              Overall distribution of projects across the platform
            </p>

          </div>

          <div className="rounded-2xl bg-blue-500/10 px-5 py-3">

            <span className="text-sm font-semibold text-blue-400">
              Live Statistics
            </span>

          </div>

        </div>

        {/* Chart */}

        <div className="h-[420px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="45%"
                innerRadius={70}
                outerRadius={120}
                paddingAngle={3}
                animationDuration={900}
                animationBegin={200}
              >

                {data.map((entry, index) => (

                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                  />

                ))}

              </Pie>

              <Tooltip
                content={<CustomTooltip />}
              />

              <Legend
                verticalAlign="bottom"
                content={renderLegend}
              />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}

export default ProjectStatusChart;