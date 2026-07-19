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
      className="flex items-end gap-2 border-t border-slate-800 bg-slate-900 px-3 py-3 sm:gap-3 sm:px-5 sm:py-5"
    >

      {/* Attachment */}

      <button
        type="button"
        disabled
        title="Coming Soon"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800 text-slate-500 transition hover:border-slate-600 hover:text-white disabled:cursor-not-allowed sm:h-12 sm:w-12"
      >

        <Paperclip size={20} />

      </button>

      {/* Input */}

      <div className="min-w-0 flex-1 rounded-3xl border border-slate-700 bg-slate-900 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">

        <textarea
          rows={1}
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="
            w-full
            min-h-[48px]
            max-h-40
            resize-none
            rounded-3xl
            bg-transparent
            px-4
            py-3
            text-sm
            text-white
            outline-none
            placeholder:text-slate-500
            sm:min-h-[56px]
            sm:px-6
            sm:py-4
            sm:text-base
          "
        />

      </div>

      {/* Emoji */}

      <button
        type="button"
        disabled
        title="Coming Soon"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800 text-slate-500 transition hover:border-slate-600 hover:text-white disabled:cursor-not-allowed sm:h-12 sm:w-12"
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
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-r
          from-blue-600
          to-indigo-600
          text-white
          shadow-lg
          shadow-blue-600/20
          transition-all
          duration-300
          hover:scale-105
          hover:from-blue-500
          hover:to-indigo-500
          disabled:cursor-not-allowed
          disabled:opacity-50
          sm:h-12
          sm:w-12
        "
      >

        {loading ? (

          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />

        ) : (

          <SendHorizontal size={20} />

        )}

      </button>

    </form>

  );

}

export default MessageInput;