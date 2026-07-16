import {
  Check,
  CheckCheck,
} from "lucide-react";

function MessageBubble({
  message,
  currentUserId,
}) {
  const mine =
    message.senderId === currentUserId;

  const formattedTime = message.createdAt
    ? new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const initials = message.senderName
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`flex items-end gap-3 ${
        mine
          ? "justify-end"
          : "justify-start"
      }`}
    >
      {/* Avatar */}

      {!mine && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-xs font-bold text-white shadow-lg">

          {initials}

        </div>
      )}

      {/* Bubble */}

      <div
        className={`group max-w-[88%] sm:max-w-[78%] lg:max-w-[72%] rounded-3xl px-4 py-3 sm:px-5 sm:py-4 shadow-lg transition-all duration-300 hover:scale-[1.01] ${
          mine
            ? "rounded-br-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
            : "rounded-bl-lg border border-slate-700 bg-slate-800 text-white"
        }`}
      >
        <p className="break-words whitespace-pre-wrap text-sm leading-6 sm:text-base sm:leading-7">

          {message.message}

        </p>

        <div
          className={`mt-3 flex items-center gap-2 text-[11px] ${
            mine
              ? "justify-end text-blue-100"
              : "justify-between text-slate-400"
          }`}
        >
          {!mine && (
            <span className="font-medium">

              {message.senderName}

            </span>
          )}

          <div className="flex items-center gap-1">

            <span>

              {formattedTime}

            </span>

            {mine && (
              <>
                {/* Replace with real read status later */}

                <CheckCheck
                  size={13}
                  className="text-blue-200"
                />
              </>
            )}

          </div>

        </div>
      </div>

      {/* My Avatar */}

      {mine && (
        <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-bold text-white shadow-lg">

          {initials}

        </div>
      )}
    </div>
  );
}

export default MessageBubble;