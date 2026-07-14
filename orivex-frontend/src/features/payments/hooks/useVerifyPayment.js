import { useMutation } from "@tanstack/react-query";

import { verifyPayment } from "../api/paymentApi";

export function useVerifyPayment() {
  return useMutation({
    mutationFn: verifyPayment,
  });
}