import { useEffect, useRef } from "react";
import {
  Circle,
  Phone,
  Video,
  MoreVertical,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";

import {
  startAudioCall,
  startVideoCall,
} from "@/features/call/websocket/callSocket";

import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

function ChatWindow({
  conversation,
  messages,
  currentUserId,
  loadingMessages,
  onSend,
  sending,
}) {
  const bottomRef = useRef(null);

  const { user } = useAuth();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  if (!conversation) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-8 text-center">
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-blue-500/10">
          💬
        </div>

        <h2 className="mt-8 text-3xl font-black text-white">
          Welcome to ORIVEX Chat
        </h2>

        <p className="mt-4 max-w-md leading-8 text-slate-400">
          Select a conversation from the left to start
          collaborating with your client or freelancer in
          real time.
        </p>
      </div>
    );
  }

  function handleAudioCall() {

  startAudioCall(conversation, user);

}

  function handleVideoCall() {

  startVideoCall(conversation, user);

}

  return (
    <div className="flex h-full flex-col">

      {/* ================= HEADER ================= */}

      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/70 px-7 py-5 backdrop-blur">

        <div className="flex items-center gap-4">

          {/* Avatar */}

          <div className="relative">

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-lg font-bold text-white">

              {conversation.otherUserName
                ?.split(" ")
                .map((name) => name[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}

            </div>

            <Circle
              size={12}
              className="absolute bottom-1 right-1 fill-emerald-400 text-emerald-400"
            />

          </div>

          <div>

            <h2 className="text-xl font-bold text-white">
              {conversation.otherUserName}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {conversation.projectTitle}
            </p>

            <p className="mt-1 text-xs text-emerald-400">
              Online
            </p>

          </div>

        </div>

        {/* ================= ACTIONS ================= */}

        <div className="flex items-center gap-3">

          {/* AUDIO */}

          <button
            onClick={handleAudioCall}
            className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-slate-300 transition hover:border-green-500 hover:bg-green-500/10 hover:text-green-400"
          >
            <Phone size={18} />
          </button>

          {/* VIDEO */}

          <button
            onClick={handleVideoCall}
            className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-slate-300 transition hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-400"
          >
            <Video size={18} />
          </button>

          {/* MORE */}

          <button
            className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-slate-300 transition hover:border-slate-500 hover:text-white"
          >
            <MoreVertical size={18} />
          </button>

        </div>

      </div>

      {/* ================= MESSAGES ================= */}

      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-6">

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

      <div className="border-t border-slate-800 bg-slate-900">

        <MessageInput
          onSend={onSend}
          loading={sending}
        />

      </div>

    </div>
  );
}

export default ChatWindow;