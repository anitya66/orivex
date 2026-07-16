import {
  useMemo,
  useState,
  useContext,
} from "react";

import CallContext from "../context/CallContext";

export default function CallProvider({
  children,
}) {

  const [incomingCall, setIncomingCall] =
    useState(null);

  const [activeCall, setActiveCall] =
    useState(null);

  const [outgoingCall, setOutgoingCall] =
    useState(null);

  const value = useMemo(
    () => ({
      incomingCall,
      activeCall,
      outgoingCall,

      setIncomingCall,
      setActiveCall,
      setOutgoingCall,
    }),
    [
      incomingCall,
      activeCall,
      outgoingCall,
    ]
  );

  return (
    <CallContext.Provider value={value}>
      {children}
    </CallContext.Provider>
  );
}

/* ==========================================
   Hook
========================================== */

export function useCall() {

  const context = useContext(CallContext);

  if (!context) {

    throw new Error(
      "useCall must be used inside CallProvider"
    );

  }

  return context;

}