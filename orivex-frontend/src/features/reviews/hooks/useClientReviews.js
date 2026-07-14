import { useQuery } from "@tanstack/react-query";

import { getClientReviews } from "../api/reviewApi";

export function useClientReviews(clientId) {
  return useQuery({
    queryKey: [
      "client-reviews",
      clientId,
    ],

    queryFn: () =>
      getClientReviews(clientId),

    enabled: !!clientId,
  });
}