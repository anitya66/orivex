import {
  User,
  FolderOpen,
  FileText,
  Activity,
} from "lucide-react";

import { formatDistanceToNow } from "date-fns";

function getIcon(type) {
  switch (type) {
    case "USER":
      return (
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10">
          <User
            size={22}
            className="text-emerald-400"
          />
        </div>
      );

    case "PROJECT":
      return (
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10">
          <FolderOpen
            size={22}
            className="text-blue-400"
          />
        </div>
      );

    case "CONTRACT":
      return (
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10">
          <FileText
            size={22}
            className="text-amber-400"
          />
        </div>
      );

    default:
      return (
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-700">
          <Activity
            size={22}
            className="text-slate-300"
          />
        </div>
      );
  }
}

function RecentActivities({
  activities,
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 transition-all duration-300 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10">

      {/* Glow */}

      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl transition-all duration-500 group-hover:bg-blue-500/20" />

      <div className="relative">

        {/* Header */}

        <div className="mb-10 flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-bold text-white">
              Recent Activities
            </h2>

            <p className="mt-2 text-slate-400">
              Latest events happening across ORIVEX
            </p>

          </div>

          <div className="rounded-2xl bg-blue-500/10 px-5 py-3">

            <span className="text-sm font-semibold text-blue-400">
              Live Feed
            </span>

          </div>

        </div>

        {/* Empty State */}

        {activities.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-slate-700 py-16 text-center">

            <Activity
              size={42}
              className="mx-auto mb-4 text-slate-600"
            />

            <p className="text-lg font-semibold text-white">
              No Recent Activities
            </p>

            <p className="mt-2 text-slate-500">
              Platform activities will appear here.
            </p>

          </div>

        ) : (

          <div className="space-y-7">

            {activities.map((activity, index) => (

              <div
                key={index}
                className="group/item flex gap-5 rounded-2xl border border-transparent p-4 transition-all duration-300 hover:border-slate-700 hover:bg-slate-800/40"
              >

                {/* Timeline */}

                <div className="flex flex-col items-center">

                  {getIcon(activity.type)}

                  {index !== activities.length - 1 && (

                    <div className="mt-3 h-full w-[2px] rounded-full bg-gradient-to-b from-slate-600 to-transparent" />

                  )}

                </div>

                {/* Content */}

                <div className="flex-1">

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <h3 className="text-lg font-semibold text-white transition-colors duration-300 group-hover/item:text-blue-400">
                        {activity.title}
                      </h3>

                      <p className="mt-2 leading-7 text-slate-400">
                        {activity.description}
                      </p>

                    </div>

                    <span className="whitespace-nowrap rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">

                      {formatDistanceToNow(
                        new Date(activity.createdAt),
                        {
                          addSuffix: true,
                        }
                      )}

                    </span>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default RecentActivities;