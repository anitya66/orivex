import api from "@/config/axios";

/* ===========================
   Create Review
=========================== */

export async function createReview(reviewData) {
  const { data } = await api.post(
    "/reviews",
    reviewData
  );

  return data;
}

/* ===========================
   Freelancer Reviews
=========================== */

export async function getFreelancerReviews(
  freelancerId
) {
  const { data } = await api.get(
    `/reviews/freelancer/${freelancerId}`
  );

  return data;
}

/* ===========================
   Client Reviews
=========================== */

export async function getClientReviews(
  clientId
) {
  const { data } = await api.get(
    `/reviews/client/${clientId}`
  );

  return data;
}

/* ===========================
   Freelancer Rating
=========================== */

export async function getFreelancerRating(
  freelancerId
) {
  const { data } = await api.get(
    `/reviews/freelancer/${freelancerId}/average-rating`
  );

  return data;
}

/* ===========================
   Review Status
=========================== */

export async function getReviewStatus(
  contractId
) {
  const { data } = await api.get(
    `/reviews/contract/${contractId}/status`
  );

  return data;
}