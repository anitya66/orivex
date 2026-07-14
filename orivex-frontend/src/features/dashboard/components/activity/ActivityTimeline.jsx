import ActivityItem from "./ActivityItem";
import EmptyActivity from "./EmptyActivity";

function ActivityTimeline({
  activities,
  actionText,
  onAction,
}) {
  if (!activities?.length) {
    return (
      <EmptyActivity
        actionText={actionText}
        onAction={onAction}
      />
    );
  }

  return (
    <div className="space-y-4">

      {activities.map((activity) => (
        <ActivityItem
          key={activity.id}
          activity={activity}
        />
      ))}

    </div>
  );
}

export default ActivityTimeline;