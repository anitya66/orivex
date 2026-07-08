import { useEffect } from "react";

import {
  connectSocket,
  disconnectSocket,
} from "../websocket/websocket";

export function useChatSocket(onConnected) {

  useEffect(() => {

    connectSocket(onConnected);

    return () => {

      disconnectSocket();

    };

  }, []);

}