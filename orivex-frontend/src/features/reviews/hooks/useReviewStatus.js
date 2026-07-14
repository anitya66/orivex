import { useQuery } from "@tanstack/react-query";

import { getReviewStatus } from "../api/reviewApi";

export function useReviewStatus(contractId) {
  return useQuery({
    queryKey: [
      "review-status",
      contractId,
    ],

    queryFn: () =>
      getReviewStatus(contractId),

    enabled: !!contractId,
  });
}