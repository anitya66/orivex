import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  connectSocket,
} from "@/features/chat/websocket/socketManager";

import {
  subscribeIncomingCall,
} from "../websocket/callSocket";

import IncomingCallModal from "../components/IncomingCallModal";

const CallContext = createContext(null);

export function CallProvider({ children }) {
  const [incomingCall, setIncomingCall] = useState(null);
  const [outgoingCall, setOutgoingCall] = useState(null);
  const [activeCall, setActiveCall] = useState(null);

  const [callState, setCallState] = useState("IDLE");

  useEffect(() => {

    connectSocket();

    console.log("📞 CallProvider Mounted");

    subscribeIncomingCall((signal) => {

        console.log("📞 CallContext Received :", signal);

        switch (signal.type) {

            case "CALL_REQUEST":

                console.log("📞 Incoming Call");

                setIncomingCall(signal);

                setCallState("INCOMING");

                break;

            case "CALL_ACCEPT":

                console.log("📞 Call Accepted");

                setActiveCall(signal);

                setOutgoingCall(null);

                setCallState("CONNECTED");

                break;

            case "CALL_REJECT":

                console.log("📞 Call Rejected");

                setOutgoingCall(null);

                setActiveCall(null);

                setCallState("IDLE");

                break;

            case "END_CALL":

                console.log("📞 Call Ended");

                setIncomingCall(null);

                setOutgoingCall(null);

                setActiveCall(null);

                setCallState("IDLE");

                break;

            default:
                break;

        }

    });

}, []);

  function acceptCall() {
    setActiveCall(incomingCall);
    setIncomingCall(null);
    setCallState("CONNECTED");
  }

  function rejectCall() {
    setIncomingCall(null);
    setCallState("IDLE");
  }

  return (
    <CallContext.Provider
      value={{
        incomingCall,
        setIncomingCall,

        outgoingCall,
        setOutgoingCall,

        activeCall,
        setActiveCall,

        callState,
        setCallState,

        acceptCall,
        rejectCall,
      }}
    >
      {children}

      <IncomingCallModal
        caller={incomingCall}
        onAccept={acceptCall}
        onReject={rejectCall}
      />
    </CallContext.Provider>
  );
}

export function useCall() {
  return useContext(CallContext);
}