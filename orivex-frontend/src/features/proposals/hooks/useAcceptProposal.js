import { useMutation } from "@tanstack/react-query";

import { acceptProposal } from "../api/proposalApi";

export function useAcceptProposal() {
  return useMutation({
    mutationFn: acceptProposal,
  });
}