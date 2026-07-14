import { useEffect } from "react";

import { useCall } from "../context/CallContext";

import {
  subscribeIncomingCall,
} from "../websocket/callSocket";

export function useIncomingCall() {

  const {

    setIncomingCall,

  } = useCall();

  useEffect(() => {

    subscribeIncomingCall(

      (signal) => {

        if (

          signal.type ===

          "CALL_REQUEST"

        ) {

          setIncomingCall(

            signal

          );

        }

      }

    );

  }, []);

}