import { useAuth } from "@/contexts/AuthContext";

import { useCall as useCallContext } from "../context/CallContext";

import {

  startAudioCall as sendAudioCall,

  startVideoCall as sendVideoCall,

  sendCallSignal,

} from "../websocket/callSocket";

export function useCall() {

  const { user } = useAuth();

  const {

    incomingCall,

    outgoingCall,

    activeCall,

    callState,

    setOutgoingCall,

    setActiveCall,

    setIncomingCall,

    setCallState,

  } = useCallContext();

  function startAudioCall(conversation) {

    if (!conversation) return;

    sendAudioCall(

      conversation,

      user

    );

    setOutgoingCall({

      ...conversation,

      callType: "AUDIO",

    });

    setCallState("OUTGOING");

  }

  function startVideoCall(conversation) {

    if (!conversation) return;

    sendVideoCall(

      conversation,

      user

    );

    setOutgoingCall({

      ...conversation,

      callType: "VIDEO",

    });

    setCallState("OUTGOING");

  }

  function acceptCall() {

    if (!incomingCall) return;

    sendCallSignal({

      type: "CALL_ACCEPT",

      senderId: user.id,

      receiverId: incomingCall.senderId,

      conversationId: incomingCall.conversationId,

    });

    setActiveCall(incomingCall);

    setIncomingCall(null);

    setCallState("CONNECTED");

  }

  function rejectCall() {

    if (!incomingCall) return;

    sendCallSignal({

      type: "CALL_REJECT",

      senderId: user.id,

      receiverId: incomingCall.senderId,

      conversationId: incomingCall.conversationId,

    });

    setIncomingCall(null);

    setCallState("IDLE");

  }

  function endCall() {

    const call = activeCall || outgoingCall;

    if (!call) return;

    sendCallSignal({

      type: "END_CALL",

      senderId: user.id,

      receiverId: call.senderId || call.otherUserId,

      conversationId: call.conversationId || call.id,

    });

    setActiveCall(null);

    setOutgoingCall(null);

    setCallState("IDLE");

  }

  return {

    incomingCall,

    outgoingCall,

    activeCall,

    callState,

    startAudioCall,

    startVideoCall,

    acceptCall,

    rejectCall,

    endCall,

  };

}