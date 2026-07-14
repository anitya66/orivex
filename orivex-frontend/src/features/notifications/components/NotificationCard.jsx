import {
  Bell,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import { useReadNotification } from "../hooks/useReadNotification";

function formatTime(date) {
  if (!date) return "";

  const notificationDate = new Date(date);
  const now = new Date();

  const diff = Math.floor(
    (now - notificationDate) / 1000
  );

  if (diff < 60) return "Just now";

  if (diff < 3600)
    return `${Math.floor(diff / 60)} min ago`;

  if (diff < 86400)
    return `${Math.floor(diff / 3600)} hr ago`;

  if (diff < 172800) return "Yesterday";

  return notificationDate.toLocaleDateString();
}

function NotificationCard({
  notification,
}) {
  const queryClient =
    useQueryClient();

  const {
    mutate: markRead,
    isPending,
  } = useReadNotification();

  function handleRead() {
    if (
      notification.read ||
      isPending
    )
      return;

    markRead(notification.id, {
      onSuccess: () => {
        toast.success(
          "Notification marked as read."
        );

        queryClient.invalidateQueries({
          queryKey: [
            "notifications",
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "notification-count",
          ],
        });
      },

      onError: () => {
        toast.error(
          "Failed to mark notification."
        );
      },
    });
  }

  return (
    <div
      onClick={handleRead}
      className={`group relative cursor-pointer overflow-hidden rounded-3xl border p-6 transition-all duration-300 ${
        notification.read
          ? "border-slate-800 bg-slate-900 hover:border-slate-700"
          : "border-blue-500/40 bg-gradient-to-r from-blue-600/10 via-slate-900 to-slate-900 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10"
      }`}
    >
      {/* unread glow */}

      {!notification.read && (
        <div className="absolute left-0 top-0 h-full w-1 rounded-full bg-blue-500" />
      )}

      <div className="flex gap-5">

        {/* Icon */}

        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
            notification.read
              ? "bg-slate-800"
              : "bg-blue-500/10"
          }`}
        >
          {notification.read ? (
            <CheckCircle2
              size={24}
              className="text-emerald-400"
            />
          ) : (
            <Bell
              size={24}
              className="text-blue-400"
            />
          )}
        </div>

        {/* Content */}

        <div className="min-w-0 flex-1">

          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">

            <div>

              <h3 className="text-xl font-bold text-white">

                {notification.title}

              </h3>

              <p className="mt-3 break-words leading-7 text-slate-400">

                {notification.message}

              </p>

            </div>

            {!notification.read && (
              <span className="h-3 w-3 shrink-0 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
            )}

          </div>

          <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">

            <Clock3 size={15} />

            {formatTime(
              notification.createdAt
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default NotificationCard;