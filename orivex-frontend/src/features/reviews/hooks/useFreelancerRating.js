import { useQuery } from "@tanstack/react-query";

import { getFreelancerRating } from "../api/reviewApi";

export function useFreelancerRating(
  freelancerId
) {
  return useQuery({
    queryKey: [
      "freelancer-rating",
      freelancerId,
    ],

    queryFn: () =>
      getFreelancerRating(freelancerId),

    enabled: !!freelancerId,
  });
}