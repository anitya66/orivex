import NotificationCard from "./NotificationCard";

function NotificationList({ notifications }) {
  if (!notifications.length) {
    return (
      <div className="rounded-2xl bg-slate-900 p-8 text-center text-slate-400">
        No notifications found.
      </div>
    );
  }

  return (
    <div className="space-y-5">

      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
        />
      ))}

    </div>
  );
}

export default NotificationList;