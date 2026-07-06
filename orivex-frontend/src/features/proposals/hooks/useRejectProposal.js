import { useMutation } from "@tanstack/react-query";

import { rejectProposal } from "../api/proposalApi";

export function useRejectProposal() {
  return useMutation({
    mutationFn: rejectProposal,
  });
}