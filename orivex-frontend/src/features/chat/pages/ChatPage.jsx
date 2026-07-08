import { useEffect, useState } from "react";

import { useAuth } from "@/contexts/AuthContext";

import { useConversations } from "../hooks/useConversations";
import { useMessages } from "../hooks/useMessages";
import { useSendMessage } from "../hooks/useSendMessage";
import { useChatSocket } from "../hooks/useChatSocket";

import { subscribeConversation } from "../websocket/websocket";

import ConversationList from "../components/ConversationList";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";

function ChatPage() {
  const { user } = useAuth();

  const [selectedConversation, setSelectedConversation] = useState(null);

  const {
    data,
    isLoading,
    isError,
  } = useConversations();

  const conversations = data ?? [];

  // Restore selected conversation after conversations are loaded
  useEffect(() => {
    if (!conversations.length) return;

    const savedConversationId = localStorage.getItem(
      "selectedConversationId"
    );

    if (!savedConversationId) return;

    const conversation = conversations.find(
      (c) => c.id === Number(savedConversationId)
    );

    if (conversation) {
      setSelectedConversation(conversation);
    }
  }, [conversations]);

  // Save selected conversation whenever it changes
  useEffect(() => {
    if (selectedConversation) {
      localStorage.setItem(
        "selectedConversationId",
        selectedConversation.id
      );
    }
  }, [selectedConversation]);

  const {
    data: fetchedMessages = [],
    isLoading: loadingMessages,
  } = useMessages(selectedConversation?.id);

  const [messages, setMessages] = useState([]);

  const {
    mutate: sendMessage,
    isPending,
  } = useSendMessage();

  useEffect(() => {
    setMessages(fetchedMessages);
  }, [fetchedMessages]);

  useChatSocket(() => {
    console.log("✅ Socket Connected");
  });

  useEffect(() => {
    if (!selectedConversation) return;

    subscribeConversation(
      selectedConversation.id,
      (newMessage) => {
        setMessages((prev) => [...prev, newMessage]);
      }
    );
  }, [selectedConversation]);

  function handleSend(message) {
    if (!selectedConversation) return;

    sendMessage({
      conversationId: selectedConversation.id,
      message,
    });
  }

  if (isLoading) {
    return (
      <div className="p-8 text-white">
        Loading conversations...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-red-500">
        Failed to load conversations.
      </div>
    );
  }

  return (
    <div className="grid h-[80vh] grid-cols-3 gap-6">
      {/* LEFT */}

      <div className="overflow-y-auto rounded-2xl border border-slate-800 bg-slate-950 p-4">
        <h1 className="mb-5 text-2xl font-bold text-white">
          Chats
        </h1>

        <ConversationList
          conversations={conversations}
          selectedConversation={selectedConversation}
          onSelect={setSelectedConversation}
        />
      </div>

      {/* RIGHT */}

      <div className="col-span-2 flex flex-col rounded-2xl border border-slate-800 bg-slate-900">
        {selectedConversation ? (
          <>
            <div className="border-b border-slate-800 p-5">
              <h2 className="text-2xl font-bold text-white">
                {selectedConversation.otherUserName}
              </h2>

              <p className="text-slate-400">
                {selectedConversation.projectTitle}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {loadingMessages ? (
                <p className="text-slate-400">
                  Loading messages...
                </p>
              ) : (
                <MessageList
                  messages={messages}
                  currentUserId={user.id}
                />
              )}
            </div>

            <MessageInput
              onSend={handleSend}
              loading={isPending}
            />
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-slate-500">
            Select a conversation
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatPage;