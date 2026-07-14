import { useMutation } from "@tanstack/react-query";

import { createPayment } from "../api/paymentApi";

export function useCreatePayment() {
  return useMutation({
    mutationFn: createPayment,
  });
}