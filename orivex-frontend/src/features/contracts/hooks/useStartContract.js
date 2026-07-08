import { useMutation } from "@tanstack/react-query";
import { startContract } from "../api/contractApi";

export function useStartContract() {
  return useMutation({
    mutationFn: startContract,
  });
}