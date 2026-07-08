import MessageBubble from "./MessageBubble";

function MessageList({
  messages,
  currentUserId,
}) {
  if (!messages.length) {
    return (
      <div className="flex h-full items-center justify-center text-slate-500">
        No messages yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          currentUserId={currentUserId}
        />
      ))}
    </div>
  );
}

export default MessageList;