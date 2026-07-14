import { useEffect } from "react";

import {

  connectCallSocket,

  disconnectCallSocket,

  subscribeCall

} from "../websocket/callSocket";

export function useCallSocket(

  onSignal

) {

  useEffect(() => {

    connectCallSocket(() => {

      subscribeCall(onSignal);

    });

    return () => {

      disconnectCallSocket();

    };

  }, []);

}