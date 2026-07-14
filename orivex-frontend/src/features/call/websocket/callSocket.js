import {
  publish,
  subscribe,
} from "@/features/chat/websocket/socketManager";

/* ==========================
   Subscribe Incoming Calls
========================== */

export function subscribeIncomingCall(callback) {

  console.log("📞 Registering Incoming Call Subscription");

  subscribe("/user/queue/call", (message) => {

    console.log("📞 Incoming Signal Received:", message);

    callback(message);

  });

}

/* ==========================
   Send Signal
========================== */

export function sendCallSignal(signal) {

  console.log("📤 Sending Signal:", signal);

  publish("/app/call", signal);

}

/* ==========================
   Call APIs
========================== */

export function startVideoCall(conversation, user) {

  sendCallSignal({

    type: "CALL_REQUEST",

    callType: "VIDEO",

    conversationId: conversation.id,

    senderId: user.id,

    senderName: user.name,

    receiverId: conversation.otherUserId,

  });

}

export function startAudioCall(conversation, user) {

  sendCallSignal({

    type: "CALL_REQUEST",

    callType: "AUDIO",

    conversationId: conversation.id,

    senderId: user.id,

    senderName: user.name,

    receiverId: conversation.otherUserId,

  });

}

export function acceptCall(call) {

  sendCallSignal({

    ...call,

    type: "CALL_ACCEPT",

  });

}

export function rejectCall(call) {

  sendCallSignal({

    ...call,

    type: "CALL_REJECT",

  });

}

export function endCall(call) {

  sendCallSignal({

    ...call,

    type: "END_CALL",

  });

}