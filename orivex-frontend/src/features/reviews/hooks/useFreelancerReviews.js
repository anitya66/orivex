import { useQuery } from "@tanstack/react-query";

import { getFreelancerReviews } from "../api/reviewApi";

export function useFreelancerReviews(freelancerId) {
  return useQuery({
    queryKey: [
      "freelancer-reviews",
      freelancerId,
    ],

    queryFn: () =>
      getFreelancerReviews(freelancerId),

    enabled: !!freelancerId,
  });
}