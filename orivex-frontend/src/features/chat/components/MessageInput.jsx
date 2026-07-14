import { useState } from "react";
import {
  SendHorizontal,
  Smile,
  Paperclip,
} from "lucide-react";

function MessageInput({
  onSend,
  loading,
}) {
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!message.trim()) return;

    onSend(message.trim());

    setMessage("");
  }

  function handleKeyDown(e) {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();

      handleSubmit(e);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-4 p-5"
    >
      {/* Attachment */}

      <button
        type="button"
        disabled
        title="Coming Soon"
        className="rounded-2xl border border-slate-700 bg-slate-800 p-3 text-slate-500 transition hover:border-slate-600 hover:text-white disabled:cursor-not-allowed"
      >
        <Paperclip size={20} />
      </button>

      {/* Input */}

      <div className="flex-1 rounded-3xl border border-slate-700 bg-slate-900 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">

        <textarea
          rows={1}
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="max-h-40 min-h-[56px] w-full resize-none rounded-3xl bg-transparent px-6 py-4 text-white outline-none placeholder:text-slate-500"
        />

      </div>

      {/* Emoji */}

      <button
        type="button"
        disabled
        title="Coming Soon"
        className="rounded-2xl border border-slate-700 bg-slate-800 p-3 text-slate-500 transition hover:border-slate-600 hover:text-white disabled:cursor-not-allowed"
      >
        <Smile size={20} />
      </button>

      {/* Send */}

      <button
        type="submit"
        disabled={
          loading ||
          !message.trim()
        }
        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:scale-105 hover:from-blue-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <SendHorizontal size={22} />
        )}
      </button>

    </form>
  );
}

export default MessageInput;