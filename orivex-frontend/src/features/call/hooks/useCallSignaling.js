import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";
import { useCall } from "./useCall";

import {
  subscribeIncomingCall,
} from "../websocket/callSocket";

export default function useCallSignaling() {

  const navigate = useNavigate();

  const { user } = useAuth();

  const {

    setIncomingCall,
    setOutgoingCall,
    setActiveCall,

  } = useCall();

  useEffect(() => {

    if (!user) return;

    console.log("📞 Call Signaling Started");

    subscribeIncomingCall(

      user.id,

      (signal) => {

        console.log("📨 SIGNAL:", signal);

        switch (signal.type) {

          /* =========================
             Incoming
          ========================= */

          case "CALL_REQUEST": {

            setIncomingCall(signal);

            break;

          }

          /* =========================
             Accepted
          ========================= */

          case "CALL_ACCEPTED": {

            setIncomingCall(null);

            setOutgoingCall(null);

            setActiveCall(signal);

            navigate(
              `/dashboard/call/${signal.roomName}`,
              {
                replace: true,
              }
            );

            break;

          }

          /* =========================
             Busy
          ========================= */

          case "CALL_BUSY": {

            setIncomingCall(null);

            setOutgoingCall(null);

            setActiveCall(null);

            alert("User is already in another call.");

            break;

          }

          /* =========================
             Rejected
          ========================= */

          case "CALL_REJECTED": {

            setIncomingCall(null);

            setOutgoingCall(null);

            setActiveCall(null);

            alert("Call Rejected");

            break;

          }

          /* =========================
             Cancelled
          ========================= */

          case "CALL_CANCELLED": {

            setIncomingCall(null);

            setOutgoingCall(null);

            setActiveCall(null);

            navigate("/dashboard/chat", {
              replace: true,
            });

            break;

          }

          /* =========================
             Ended
          ========================= */

          case "CALL_ENDED": {

            setIncomingCall(null);

            setOutgoingCall(null);

            setActiveCall(null);

            navigate("/dashboard/chat", {
              replace: true,
            });

            break;

          }

          default:

            console.log("Unknown Signal", signal);

        }

      }

    );

  }, [

    user,
    navigate,
    setIncomingCall,
    setOutgoingCall,
    setActiveCall,

  ]);

}