import api from "@/config/axios";

export async function createPayment(contractId) {
  const { data } = await api.post("/payments", {
    contractId,
  });

  return data.data;
}

export async function createOrder(paymentId) {
  const { data } = await api.post(
    `/payments/${paymentId}/order`
  );

  return data.data;
}

export async function verifyPayment(payload) {
  const { data } = await api.post(
    "/payments/verify",
    payload
  );

  return data.data;
}