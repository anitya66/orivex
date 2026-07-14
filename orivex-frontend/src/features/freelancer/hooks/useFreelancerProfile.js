import { useQuery } from "@tanstack/react-query";

import { getFreelancerProfile } from "../services/freelancerService";

export function useFreelancerProfile(id) {
  return useQuery({
    queryKey: ["freelancer-profile", id],
    queryFn: () => getFreelancerProfile(id),
    enabled: !!id,
  });
}