import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createReview } from "../api/reviewApi";

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["freelancer-reviews"],
      });

      queryClient.invalidateQueries({
        queryKey: ["client-reviews"],
      });

      queryClient.invalidateQueries({
        queryKey: ["freelancer-rating"],
      });
        
      queryClient.invalidateQueries({
        queryKey: ["review-status"],
      });
        
    },
  });
}