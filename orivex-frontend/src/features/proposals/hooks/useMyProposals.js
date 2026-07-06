import { useQuery } from "@tanstack/react-query";
import { getMyProposals } from "../api/proposalApi";

export function useMyProposals() {
  return useQuery({
    queryKey: ["my-proposals"],
    queryFn: getMyProposals,
  });
}