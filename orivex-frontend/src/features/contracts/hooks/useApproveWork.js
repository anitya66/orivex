import { useMutation } from "@tanstack/react-query";
import { approveWork } from "../api/contractApi";

export function useApproveWork() {
  return useMutation({
    mutationFn: approveWork,
  });
}