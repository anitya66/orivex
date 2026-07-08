import api from "@/config/axios";

/* ===============================
   Get All Conversations
================================ */

export async function getConversations() {
  const { data } = await api.get(
    "/conversations"
  );

  return data;
}

/* ===============================
   Get Messages of Conversation
================================ */

export async function getMessages(
  conversationId
) {
  const { data } = await api.get(
    `/chat/${conversationId}`
  );

  return data;
}

/* ===============================
   Send Message (REST)
================================ */

export async function sendMessage(
  messageData
) {
  const { data } = await api.post(
    "/chat/send",
    messageData
  );

  return data;
}