import { useEffect, useRef } from "react";

import {
  Circle,
  MoreVertical,
  ArrowLeft,
} from "lucide-react";

import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

function ChatWindow({
  conversation,
  messages,
  currentUserId,
  loadingMessages,
  onSend,
  sending,
  onOpenSidebar,
}) {

  const bottomRef = useRef(null);

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);

  /* ================= EMPTY STATE ================= */

  if (!conversation) {

    return (

      <div className="flex h-full flex-col items-center justify-center px-6 text-center">

        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-500/10">

          💬

        </div>

        <h2 className="mt-8 text-3xl font-black text-white">

          Welcome to ORIVEX Chat

        </h2>

        <p className="mt-4 max-w-md leading-8 text-slate-400">

          Select a conversation from the left to start
          collaborating with your client or freelancer
          in real time.

        </p>

      </div>

    );

  }

  return (

    <div className="flex h-full min-h-0 flex-1 flex-col">

      {/* ================= HEADER ================= */}

      <div className="sticky top-0 z-20 border-b border-slate-800 bg-slate-900/95 backdrop-blur">

        <div className="flex items-center justify-between px-3 py-3 sm:px-6 sm:py-4">

          {/* LEFT */}

          <div className="flex min-w-0 flex-1 items-center gap-3">

            <button
              onClick={onOpenSidebar}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-white lg:hidden"
            >
              <ArrowLeft size={18} />
            </button>

            {/* Avatar */}

            <div className="relative shrink-0">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-base font-bold text-white sm:h-14 sm:w-14 sm:text-lg">

                {conversation.otherUserName
                  ?.split(" ")
                  .map((name) => name[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}

              </div>

              <Circle
                size={10}
                className="absolute bottom-1 right-1 fill-emerald-400 text-emerald-400"
              />

            </div>

            {/* USER DETAILS */}

            <div className="min-w-0 flex-1">

              <h2 className="truncate text-lg font-bold text-white sm:text-xl">

                {conversation.otherUserName}

              </h2>

              <p className="truncate text-sm text-slate-400">

                {conversation.projectTitle}

              </p>

              <p className="text-xs text-emerald-400">

                Online

              </p>

            </div>

          </div>

          {/* RIGHT */}

          <button
            className="ml-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-300 transition hover:border-slate-500 hover:text-white"
          >

            <MoreVertical size={18} />

          </button>

        </div>

      </div>

      {/* ================= MESSAGES ================= */}

      <div className="min-h-0 flex-1 overflow-y-auto bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-4 sm:p-6">

        {loadingMessages ? (

          <div className="flex h-full items-center justify-center text-slate-400">

            Loading messages...

          </div>

        ) : (

          <>
                        <MessageList
              messages={messages}
              currentUserId={currentUserId}
            />

            <div ref={bottomRef} />

          </>

        )}

      </div>

      {/* ================= INPUT ================= */}

      <div className="shrink-0 border-t border-slate-800 bg-slate-900">

        <MessageInput
          onSend={onSend}
          loading={sending}
        />

      </div>

    </div>

  );

}

export default ChatWindow;