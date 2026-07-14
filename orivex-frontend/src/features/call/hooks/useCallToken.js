import { useQuery } from "@tanstack/react-query";

import { getCallToken } from "../api/callApi";

export function useCallToken(
  roomName,
  enabled = true
) {

  return useQuery({

    queryKey: [

      "call-token",

      roomName,

    ],

    queryFn: () =>

      getCallToken(roomName),

    enabled:
      enabled &&
      !!roomName,

  });

}