import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import { useReadNotification } from "../hooks/useReadNotification";

function NotificationCard({ notification }) {
  const queryClient = useQueryClient();

  const {
    mutate: markRead,
    isPending,
  } = useReadNotification();

  function handleRead() {
    if (notification.read) return;

    markRead(notification.id, {
      onSuccess: () => {
        toast.success("Notification marked as read.");

        queryClient.invalidateQueries({
          queryKey: ["notifications"],
        });

        queryClient.invalidateQueries({
          queryKey: ["notification-count"],
        });
      },

      onError: () => {
        toast.error("Failed to mark notification.");
      },
    });
  }

  return (
    <div
      onClick={handleRead}
      className={`cursor-pointer rounded-2xl border p-5 transition ${
        notification.read
          ? "border-slate-800 bg-slate-900"
          : "border-blue-500 bg-slate-800"
      }`}
    >
      <div className="flex items-start justify-between">

        <div>

          <p className="font-semibold text-white">
            {notification.title}
          </p>

          <p className="mt-2 text-slate-400">
            {notification.message}
          </p>

        </div>

        {!notification.read && (
          <span className="h-3 w-3 rounded-full bg-blue-500" />
        )}

      </div>

      <p className="mt-4 text-sm text-slate-500">
        {notification.createdAt}
      </p>

    </div>
  );
}

export default NotificationCard;