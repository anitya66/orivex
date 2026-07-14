import {
  connectSocket,
  disconnectSocket,
  subscribe,
  publish,
} from "./socketManager";

/* ===============================
   Socket Connection
================================ */

export {
  connectSocket,
  disconnectSocket,
};

/* ===============================
   Conversation Subscription
================================ */

export function subscribeConversation(
  conversationId,
  callback
) {
  subscribe(
    `/topic/conversations/${conversationId}`,
    callback
  );
}

/* ===============================
   Send Chat Message
================================ */

export function sendSocketMessage(
  message
) {
  publish(
    "/app/chat.send",
    message
  );
}