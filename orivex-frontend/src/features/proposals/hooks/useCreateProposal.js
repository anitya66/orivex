import { useMutation } from "@tanstack/react-query";
import { createProposal } from "../api/proposalApi";

export function useCreateProposal() {
  return useMutation({
    mutationFn: createProposal,
  });
}