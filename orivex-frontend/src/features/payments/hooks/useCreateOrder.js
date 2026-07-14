import { useMutation } from "@tanstack/react-query";

import { createOrder } from "../api/paymentApi";

export function useCreateOrder() {
  return useMutation({
    mutationFn: createOrder,
  });
}