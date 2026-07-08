function MessageBubble({
  message,
  currentUserId,
}) {
  const mine = message.senderId === currentUserId;

  return (
    <div
      className={`flex ${
        mine ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-3 ${
          mine
            ? "bg-blue-600 text-white"
            : "bg-slate-800 text-white"
        }`}
      >
        <p>{message.message}</p>

        <p className="mt-2 text-right text-xs opacity-70">
          {message.senderName}
        </p>
      </div>
    </div>
  );
}

export default MessageBubble;