function ConversationItem({
  conversation,
  selected,
  onClick,
}) {
  return (
    <button
      onClick={() => onClick(conversation)}
      className={`w-full rounded-xl p-4 text-left transition ${
        selected
          ? "bg-blue-600"
          : "bg-slate-900 hover:bg-slate-800"
      }`}
    >
      <h3 className="font-semibold text-white">
        {conversation.otherUserName}
      </h3>

      <p className="mt-2 text-sm text-slate-400">
        {conversation.projectTitle}
      </p>

      <p className="mt-2 truncate text-sm text-slate-500">
        {conversation.lastMessage || "No messages yet"}
      </p>
    </button>
  );
}

export default ConversationItem;