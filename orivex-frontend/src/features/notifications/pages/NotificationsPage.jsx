import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import NotificationList from "../components/NotificationList";

import { useNotifications } from "../hooks/useNotifications";
import { useReadAllNotifications } from "../hooks/useReadAllNotifications";

function NotificationsPage() {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
  } = useNotifications();

  const {
    mutate: readAll,
    isPending,
  } = useReadAllNotifications();

  function handleReadAll() {
    readAll(undefined, {
      onSuccess: () => {
        toast.success("All notifications marked as read.");

        queryClient.invalidateQueries({
          queryKey: ["notifications"],
        });

        queryClient.invalidateQueries({
          queryKey: ["notification-count"],
        });
      },

      onError: () => {
        toast.error("Failed.");
      },
    });
  }

  if (isLoading) {
    return (
      <div className="p-8 text-white">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-red-500">
        Failed to load notifications.
      </div>
    );
  }

  const notifications = data.data;

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Notifications
          </h1>

          <p className="mt-2 text-slate-400">
            Stay updated with your account.
          </p>

        </div>

        <button
          onClick={handleReadAll}
          disabled={isPending}
          className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          Mark All Read
        </button>

      </div>

      <NotificationList
        notifications={notifications}
      />

    </div>
  );
}

export default NotificationsPage;