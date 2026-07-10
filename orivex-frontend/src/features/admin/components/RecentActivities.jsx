import {
  User,
  FolderOpen,
  FileText,
} from "lucide-react";

import { formatDistanceToNow } from "date-fns";

function getIcon(type) {

  switch (type) {

    case "USER":
      return <User size={18} className="text-green-400" />;

    case "PROJECT":
      return <FolderOpen size={18} className="text-blue-400" />;

    case "CONTRACT":
      return <FileText size={18} className="text-yellow-400" />;

    default:
      return null;

  }

}

function RecentActivities({

  activities,

}) {

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-6 text-xl font-bold text-white">

        Recent Activities

      </h2>

      <div className="space-y-5">

        {activities.map((activity, index) => (

          <div

            key={index}

            className="flex items-start gap-4 border-b border-slate-800 pb-4"

          >

            {getIcon(activity.type)}

            <div>

              <h3 className="font-semibold text-white">

                {activity.title}

              </h3>

              <p className="text-slate-400">

                {activity.description}

              </p>

              <span className="text-xs text-slate-500">

                {formatDistanceToNow(

                  new Date(activity.createdAt),

                  {

                    addSuffix: true,

                  }

                )}

              </span>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default RecentActivities;