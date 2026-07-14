import {
  MessageCircle,
} from "lucide-react";

import MessageBubble from "./MessageBubble";

function MessageList({
  messages,
  currentUserId,
}) {
  if (!messages?.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-8 text-center">

        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-500/10">

          <MessageCircle
            size={42}
            className="text-blue-400"
          />

        </div>

        <h2 className="mt-8 text-3xl font-black text-white">
          No Messages Yet
        </h2>

        <p className="mt-4 max-w-md leading-8 text-slate-400">

          This conversation hasn't started yet.

          <br />

          Send the first message and start collaborating.

        </p>

      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Today */}

      <div className="flex items-center justify-center">

        <div className="rounded-full border border-slate-700 bg-slate-900 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">

          Today

        </div>

      </div>

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