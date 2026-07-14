import { Bell, CheckCheck } from "lucide-react";
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
        toast.success(
          "All notifications marked as read."
        );

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
      <div className="flex h-80 items-center justify-center text-lg text-slate-400">
        Loading notifications...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-80 items-center justify-center text-red-500">
        Failed to load notifications.
      </div>
    );
  }

  const notifications = data.data;

  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  return (
    <div className="space-y-8">

      {/* Hero */}

      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-blue-600/20 via-slate-900 to-slate-900 p-8">

        <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-blue-400">

              <Bell size={18} />

              Notifications

            </div>

            <h1 className="mt-5 text-4xl font-black text-white lg:text-5xl">

              Stay Updated

            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">

              Track proposals, contracts, messages,
              payments and platform activities.

            </p>

          </div>

          <div className="flex flex-col items-start gap-4 lg:items-end">

            <div className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-4">

              <p className="text-sm text-slate-400">

                Unread Notifications

              </p>

              <h2 className="mt-2 text-4xl font-black text-blue-400">

                {unreadCount}

              </h2>

            </div>

            <button
              onClick={handleReadAll}
              disabled={
                isPending ||
                unreadCount === 0
              }
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CheckCheck size={18} />

              {isPending
                ? "Updating..."
                : "Mark All Read"}

            </button>

          </div>

        </div>

      </div>

      {/* List */}

      <NotificationList
        notifications={notifications}
      />

    </div>
  );
}

export default NotificationsPage;