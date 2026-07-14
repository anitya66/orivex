import {
    useEffect,
    useState
} from "react";

import {
    useSearchParams
} from "react-router-dom";

import {
  MessageCircle,
  Search,
} from "lucide-react";


import ChatWindow from "../components/ChatWindow";
import ConversationList from "../components/ConversationList";

import { useAuth } from "@/contexts/AuthContext";

import { useConversations } from "../hooks/useConversations";
import { useMessages } from "../hooks/useMessages";
import { useSendMessage } from "../hooks/useSendMessage";


import { subscribeConversation } from "../websocket/websocket";

function ChatPage() {
  const { user } = useAuth();

  

  const [searchParams] = useSearchParams();

const conversationId =
    searchParams.get("conversationId");

  const [selectedConversation, setSelectedConversation] =
    useState(null);

  const [search, setSearch] = useState("");

  const {
    data,
    isLoading,
    isError,
  } = useConversations();

  const conversations = data ?? [];

  useEffect(() => {

    if (!conversations.length) return;

    // Open conversation coming from Freelancer Profile

    if (conversationId) {

        const conversation =
            conversations.find(
                c =>
                    c.id === Number(conversationId)
            );

        if (conversation) {

            setSelectedConversation(
                conversation
            );

            return;

        }

    }

    // Fallback to last opened conversation

    const savedConversationId =
        localStorage.getItem(
            "selectedConversationId"
        );

    if (!savedConversationId) return;

    const conversation =
        conversations.find(
            c =>
                c.id === Number(savedConversationId)
        );

    if (conversation) {

        setSelectedConversation(
            conversation
        );

    }

}, [
    conversations,
    conversationId
]);

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

  

  useEffect(() => {

    if (!selectedConversation) return;

    subscribeConversation(
        selectedConversation.id,
        (newMessage) => {

            setMessages(prev => {

                if (
                    prev.some(
                        m => m.id === newMessage.id
                    )
                ) {
                    return prev;
                }

                return [
                    ...prev,
                    newMessage
                ];

            });

        }

    );

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
    conversations.filter((conversation) => {
      const keyword = search.toLowerCase();

      return (
        conversation.otherUserName
          ?.toLowerCase()
          .includes(keyword) ||
        conversation.projectTitle
          ?.toLowerCase()
          .includes(keyword)
      );
    });

  return (
    <div className="grid h-[82vh] grid-cols-[360px_1fr] gap-6">

      {/* LEFT */}

      <div className="flex flex-col overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">

        {/* Header */}

        <div className="border-b border-slate-800 p-6">

          <div className="flex items-center gap-3">

            <div className="rounded-2xl bg-blue-500/10 p-3">

              <MessageCircle
                size={24}
                className="text-blue-400"
              />

            </div>

            <div>

              <h1 className="text-2xl font-black text-white">
                Messages
              </h1>

              <p className="text-sm text-slate-400">
                {filteredConversations.length} Conversations
              </p>

            </div>

          </div>

          {/* Search */}

          <div className="relative mt-6">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search conversation..."
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 py-3 pl-11 pr-4 text-white outline-none transition focus:border-blue-500"
            />

          </div>

        </div>

        {/* Conversations */}

        <div className="flex-1 overflow-y-auto p-4">

          <ConversationList
            conversations={
              filteredConversations
            }
            selectedConversation={
              selectedConversation
            }
            onSelect={
              setSelectedConversation
            }
          />

        </div>

      </div>

      {/* RIGHT */}

      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 shadow-xl">

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
        />

      </div>

    </div>
  );
}

export default ChatPage;