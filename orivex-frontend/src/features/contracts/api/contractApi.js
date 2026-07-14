import api from "@/config/axios";

export async function getMyContracts() {
  const { data } = await api.get("/contracts/my");
  return data;
}

export async function getClientContracts() {
  const { data } = await api.get("/contracts/client");
  return data;
}

export async function getContractById(contractId) {
  const { data } = await api.get(
    `/contracts/${contractId}`
  );

  return data;
}

export async function startContract(contractId) {
  const { data } = await api.put(
    `/contracts/${contractId}/start`
  );

  return data;
}

export async function submitWork({
  contractId,
  submissionData,
}) {
  const { data } = await api.put(
    `/contracts/${contractId}/submit`,
    submissionData
  );

  return data;
}

export async function approveWork(contractId) {
  const { data } = await api.put(
    `/contracts/${contractId}/approve`
  );

  return data;
}