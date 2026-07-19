import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  subscribeConversation,
  unsubscribe,
} from "../websocket/websocket";

import {
  MessageCircle,
  Search,
  Menu,
  X,
} from "lucide-react";

import ChatWindow from "../components/ChatWindow";
import ConversationList from "../components/ConversationList";

import { useAuth } from "@/contexts/AuthContext";
import { useConversations } from "../hooks/useConversations";
import { useMessages } from "../hooks/useMessages";
import { useSendMessage } from "../hooks/useSendMessage";

function ChatPage() {
  const { user } = useAuth();

  const [searchParams] = useSearchParams();

  const conversationId = searchParams.get("conversationId");

  const [selectedConversation, setSelectedConversation] =
    useState(null);

  const [search, setSearch] = useState("");

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const {
    data,
    isLoading,
    isError,
  } = useConversations();

  const conversations = data ?? [];

  useEffect(() => {
    if (!conversations.length) return;

    if (conversationId) {
      const conversation = conversations.find(
        (c) => c.id === Number(conversationId)
      );

      if (conversation) {
        setSelectedConversation(conversation);
        return;
      }
    }

    const savedConversationId =
      localStorage.getItem(
        "selectedConversationId"
      );

    if (!savedConversationId) return;

    const conversation = conversations.find(
      (c) =>
        c.id === Number(savedConversationId)
    );

    if (conversation) {
      setSelectedConversation(conversation);
    }
  }, [
    conversations,
    conversationId,
  ]);

  useEffect(() => {
    if (!selectedConversation) return;

    localStorage.setItem(
      "selectedConversationId",
      selectedConversation.id
    );

    setSidebarOpen(false);
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
    if (!selectedConversation) {
      setMessages([]);
      return;
    }

    setMessages(fetchedMessages);
  }, [
    selectedConversation?.id,
    fetchedMessages,
  ]);

  useEffect(() => {
    if (!selectedConversation) return;

    const destination =
      `/topic/conversations/${selectedConversation.id}`;

    subscribeConversation(
      selectedConversation.id,
      (newMessage) => {
        setMessages((prev) => {
          if (
            prev.some(
              (m) => m.id === newMessage.id
            )
          ) {
            return prev;
          }

          return [
            ...prev,
            newMessage,
          ];
        });
      }
    );

    return () => {
      unsubscribe(destination);
    };
  }, [selectedConversation?.id]);

  function handleSend(message) {
    if (!selectedConversation) return;

    sendMessage({
      conversationId:
        selectedConversation.id,
      message,
    });
  }

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center text-slate-400">
        Loading conversations...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-10 text-center text-red-400">
        Failed to load conversations.
      </div>
    );
  }

  const filteredConversations =
    conversations.filter(
      (conversation) => {
        const keyword =
          search.toLowerCase();

        return (
          conversation.otherUserName
            ?.toLowerCase()
            .includes(keyword) ||
          conversation.projectTitle
            ?.toLowerCase()
            .includes(keyword)
        );
      }
    );

  return (
    <>
      {sidebarOpen && (
        <div
          onClick={() =>
            setSidebarOpen(false)
          }
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <div className="relative flex h-full min-h-0 flex-1 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">

        <button
          onClick={() =>
            setSidebarOpen(true)
          }
          className="absolute left-4 top-4 z-30 rounded-xl border border-slate-700 bg-slate-900 p-2 text-white lg:hidden"
        >
          <Menu size={20} />
        </button>

        <aside
          className={`
            absolute inset-y-0 left-0 z-50
            flex h-full w-full max-w-sm flex-col
            border-r border-slate-800
            bg-slate-950
            transition-transform duration-300
            lg:static
            lg:w-[360px]
            lg:translate-x-0
            ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full"
            }
          `}
        >
          <div className="border-b border-slate-800 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">

                <div className="rounded-2xl bg-blue-500/10 p-3">
                  <MessageCircle
                    size={22}
                    className="text-blue-400"
                  />
                </div>

                <div>
                  <h1 className="text-2xl font-black text-white">
                    Messages
                  </h1>

                  <p className="text-sm text-slate-400">
                    {
                      filteredConversations.length
                    }{" "}
                    Conversations
                  </p>
                </div>

              </div>

              <button
                onClick={() =>
                  setSidebarOpen(false)
                }
                className="rounded-xl border border-slate-700 p-2 text-white lg:hidden"
              >
                <X size={18} />
              </button>

            </div>

            <div className="relative mt-6">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search conversation..."
                className="w-full rounded-2xl border border-slate-700 bg-slate-900 py-3 pl-11 pr-4 text-white outline-none focus:border-blue-500"
              />

            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-4">

            <ConversationList
              conversations={
                filteredConversations
              }
              selectedConversation={
                selectedConversation
              }
              onSelect={(
                conversation
              ) => {
                setSelectedConversation(
                  conversation
                );
                setSidebarOpen(false);
              }}
            />

          </div>
        </aside>

      <div className="min-h-0 flex min-w-0 flex-1 flex-col overflow-hidden">

          <ChatWindow
            conversation={
              selectedConversation
            }
            messages={messages}
            currentUserId={user.id}
            loadingMessages={
              loadingMessages
            }
            onSend={handleSend}
            sending={isPending}
            onOpenSidebar={() =>
              setSidebarOpen(true)
            }
          />

        </div>

      </div>
    </>
  );
}

export default ChatPage;