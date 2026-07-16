import {
  Circle,
  Pin,
} from "lucide-react";

function ConversationItem({
  conversation,
  selected,
  onClick,
}) {
  const initials = conversation.otherUserName
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const formattedTime = conversation.lastMessageAt
    ? new Date(
        conversation.lastMessageAt
      ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <button
      onClick={() => onClick(conversation)}
      className={`group relative w-full overflow-hidden rounded-3xl border p-4 sm:p-5 text-left transition-all duration-300 ${
        selected
          ? "border-blue-500 bg-gradient-to-r from-blue-600/20 to-cyan-500/10 shadow-xl shadow-blue-500/10"
          : "border-slate-800 bg-slate-900 hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-800"
      }`}
    >
      {/* Glow */}

      {selected && (
        <div className="absolute inset-y-0 left-0 w-1 rounded-full bg-blue-500" />
      )}

      <div className="flex items-start gap-4">

        {/* Avatar */}

        <div className="relative shrink-0">

          <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-cyan-500 to-indigo-500 text-sm font-bold text-white shadow-lg">

            {initials}

          </div>

          <Circle
            size={12}
            className="absolute bottom-1 right-1 fill-emerald-400 text-emerald-400"
          />

        </div>

        {/* Content */}

        <div className="min-w-0 flex-1">

          <div className="flex items-start justify-between gap-3">

            <div className="min-w-0">

              <h3 className="truncate text-sm sm:text-base font-bold text-white">

                {conversation.otherUserName}

              </h3>

              <p className="mt-1 truncate text-sm font-medium text-blue-400">

                {conversation.projectTitle}

              </p>

            </div>

            <div className="flex flex-col items-end gap-2">

              <span className="text-xs text-slate-500">

                {formattedTime}

              </span>

              {selected && (
                <Pin
                  size={14}
                  className="text-blue-400"
                />
              )}

            </div>

          </div>

          <p className="mt-2 line-clamp-2 text-xs leading-5 sm:mt-3 sm:text-sm sm:leading-6 text-slate-400">

            {conversation.lastMessage ||
              "Start your conversation..."}

          </p>

        </div>

      </div>
    </button>
  );
}

export default ConversationItem;