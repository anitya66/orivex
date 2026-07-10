function UserStatusBadge({ status }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        status === "ACTIVE"
          ? "bg-green-500/20 text-green-400"
          : "bg-yellow-500/20 text-yellow-300"
      }`}
    >
      {status}
    </span>
  );
}

export default UserStatusBadge;