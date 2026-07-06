import api from "@/config/axios";

/* -------------------- Create Proposal -------------------- */

export async function createProposal(data) {
  const response = await api.post(
    "/proposals",
    data
  );

  return response.data;
}

/* -------------------- My Proposals -------------------- */

export async function getMyProposals() {
  const response = await api.get(
    "/proposals/my"
  );

  return response.data;
}

/* -------------------- Project Proposals -------------------- */

export async function getProjectProposals(projectId) {
  const response = await api.get(
    `/projects/${projectId}/proposals`
  );

  return response.data;
}

export async function acceptProposal(proposalId) {
  const response = await api.put(
    `/proposals/${proposalId}/accept`
  );

  return response.data;
}

export async function rejectProposal(proposalId) {
  const response = await api.put(
    `/proposals/${proposalId}/reject`
  );

  return response.data;
}