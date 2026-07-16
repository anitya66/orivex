import { useMutation, useQueryClient } from "@tanstack/react-query";

import { sendMessage } from "../api/chatApi";

export function useSendMessage() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: sendMessage,

    onSuccess: (_, variables) => {

     

      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });

    },

  });

}