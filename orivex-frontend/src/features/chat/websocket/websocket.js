import SockJS from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";

let stompClient = null;
let conversationSubscription = null;

export function connectSocket(onConnected) {
  if (stompClient?.connected) {
    onConnected?.();
    return;
  }

  stompClient = new Client({
    webSocketFactory: () =>
      new SockJS("http://localhost:8080/ws"),

    reconnectDelay: 5000,

    debug: () => {},

    onConnect: () => {
      console.log("✅ WebSocket Connected");
      onConnected?.();
    },

    onStompError: (frame) => {
      console.error(frame);
    },
  });

  stompClient.activate();
}

export function disconnectSocket() {
  conversationSubscription?.unsubscribe();
  conversationSubscription = null;

  stompClient?.deactivate();
  stompClient = null;
}

export function subscribeConversation(conversationId, callback) {
  if (!stompClient?.connected) {
    console.warn("Socket not connected yet.");
    return;
  }

  conversationSubscription?.unsubscribe();

  conversationSubscription = stompClient.subscribe(
    `/topic/conversations/${conversationId}`,
    (message) => {
      callback(JSON.parse(message.body));
    }
  );
}