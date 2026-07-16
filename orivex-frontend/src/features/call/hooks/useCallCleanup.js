import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { RoomEvent } from "livekit-client";

import { useCall } from "./useCall";

export default function useCallCleanup(room) {

  const navigate = useNavigate();

  const {

    setIncomingCall,
    setOutgoingCall,
    setActiveCall,

  } = useCall();

  useEffect(() => {

    if (!room) return;

 function cleanup() {

  console.log("🧹 Cleaning Call");

  room.removeAllListeners();

  setIncomingCall(null);
  setOutgoingCall(null);
  setActiveCall(null);

  navigate("/dashboard/chat", {
    replace: true,
  });

}

    room.on(RoomEvent.Disconnected, cleanup);

    return () => {

      room.off(RoomEvent.Disconnected, cleanup);

    };

  }, [room]);

}