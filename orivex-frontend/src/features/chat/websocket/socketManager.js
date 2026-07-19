import SockJS from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";

import { STORAGE_KEYS } from "@/constants/storageKeys";

let stompClient = null;
let connecting = false;

const subscriptions = new Map();
const pendingSubscriptions = new Map();
const pendingPublishes = [];




/* =========================================
   Internal
========================================= */

function flushSubscriptions() {

  console.log("========== FLUSH SUBSCRIPTIONS ==========");

  pendingSubscriptions.forEach((callback, destination) => {

    console.log("Subscribing ->", destination);

    internalSubscribe(destination, callback);

  });

}

function flushPublishes() {
  while (pendingPublishes.length > 0) {
    const { destination, body } = pendingPublishes.shift();

    stompClient.publish({
      destination,
      body: JSON.stringify(body),
    });
  }
}

function internalSubscribe(destination, callback) {

  console.log("internalSubscribe ->", destination);

  if (!stompClient?.connected) {
    return;
  }

  if (subscriptions.has(destination)) {
    subscriptions.get(destination).unsubscribe();
  }

  const subscription = stompClient.subscribe(
  destination,
  (message) => {

    console.log("========== EVENT ==========");
    console.log(destination);
    console.log(message.body);
    console.log("===========================");

    callback(JSON.parse(message.body));
  }
);

console.log("SUBSCRIBED SUCCESS:", destination);

}

/* =========================================
   Connection
========================================= */

export function connectSocket(onConnected) {
  
 
  
  if (stompClient?.connected) {
    onConnected?.();
    return;
  }

  if (connecting) {
    return;
  }

  connecting = true;

  const token = localStorage.getItem(
    STORAGE_KEYS.ACCESS_TOKEN
  );

  stompClient = new Client({
   webSocketFactory: () => {
  const API_BASE =
    import.meta.env.VITE_API_BASE_URL.replace("/api/v1", "");

  return new SockJS(`${API_BASE}/ws`);
},

    reconnectDelay: 5000,

    connectHeaders: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},

    debug: () => {},

    onConnect: () => {
      console.log("✅ ORIVEX Socket Connected");

      connecting = false;

      flushSubscriptions();

      flushPublishes();

      onConnected?.();
    },

    onDisconnect: () => {
      console.log("🔌 Socket Disconnected");
    },

    onWebSocketClose: () => {
      console.log("⚠️ WebSocket Closed");
    },

    onStompError: (frame) => {
      console.error("STOMP Error", frame);

      connecting = false;
    },
  });

  stompClient.activate();
}

/* =========================================
   Disconnect
========================================= */

export function disconnectSocket() {

  console.trace("disconnectSocket CALLED");

  subscriptions.forEach((subscription) =>
    subscription.unsubscribe()
  );

  pendingPublishes.length = 0;

  stompClient?.deactivate();

  stompClient = null;

  connecting = false;
}

/* =========================================
   Subscribe
========================================= */

export function subscribe(destination, callback) {

  console.log("Pending Subscribe ->", destination);

  pendingSubscriptions.set(destination, callback);

  if (!stompClient?.connected) {
    return;
  }

  internalSubscribe(destination, callback);

}

/* =========================================
   Unsubscribe
========================================= */

export function unsubscribe(destination) {
  pendingSubscriptions.delete(destination);

  const subscription = subscriptions.get(destination);

  if (subscription) {
    subscription.unsubscribe();

    subscriptions.delete(destination);
  }
}

/* =========================================
   Publish
========================================= */

export function publish(destination, body) {

  
  
  console.log("WINDOW PATH =", window.location.pathname);
  
  
  console.trace("publish called");
  console.log("==============");
  console.log("PUBLISH");
  console.log(destination);
  console.log(body);
  console.log("CLIENT =", stompClient);
  console.log("CONNECTED =", stompClient?.connected);

  if (!stompClient) {
    console.log("NO CLIENT");
    return;
  }

  if (!stompClient.connected) {
    console.log("NOT CONNECTED");
    return;
  }

  try {

    stompClient.publish({
      destination,
      body: JSON.stringify(body),
    });

    console.log("PUBLISH SUCCESS");

  } catch (e) {

    console.error("PUBLISH FAILED", e);

  }

  console.log("==============");
}

/* =========================================
   Status
========================================= */

export function isConnected() {
  return stompClient?.connected ?? false;
}