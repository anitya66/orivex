import { useMutation } from "@tanstack/react-query";
import { submitWork } from "../api/contractApi";

export function useSubmitWork() {
  return useMutation({
    mutationFn: submitWork,
  });
}