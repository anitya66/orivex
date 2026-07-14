import { BellOff } from "lucide-react";
import NotificationCard from "./NotificationCard";

function NotificationList({
  notifications,
}) {
  if (!notifications?.length) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-16">

        <div className="flex flex-col items-center text-center">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-800">

            <BellOff
              size={40}
              className="text-slate-500"
            />

          </div>

          <h2 className="mt-8 text-3xl font-bold text-white">
            You're All Caught Up
          </h2>

          <p className="mt-4 max-w-md leading-8 text-slate-400">
            There are no notifications at the
            moment. New messages, proposals,
            contracts and platform updates will
            appear here.
          </p>

        </div>

      </div>
    );
  }

  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  return (
    <div className="space-y-8">

      {/* Summary */}

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900 px-6 py-5">

        <div>

          <h2 className="text-xl font-bold text-white">

            Recent Notifications

          </h2>

          <p className="mt-1 text-slate-400">

            {notifications.length} Total Notifications

          </p>

        </div>

        <div className="rounded-full bg-blue-500/10 px-5 py-2 font-semibold text-blue-400">

          {unreadCount} Unread

        </div>

      </div>

      {/* Notification Cards */}

      <div className="space-y-5">

        {notifications.map((notification) => (

          <NotificationCard
            key={notification.id}
            notification={notification}
          />

        ))}

      </div>

    </div>
  );
}

export default NotificationList;