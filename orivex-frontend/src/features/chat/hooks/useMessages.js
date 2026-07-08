import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../api/chatApi";

export function useMessages(conversationId) {
  return useQuery({
    queryKey: ["messages", conversationId],

    queryFn: () => getMessages(conversationId),

    enabled: !!conversationId,
  });
}