import { z } from "zod";

export const proposalSchema = z.object({
  projectId: z.number(),

  coverLetter: z
    .string()
    .min(30, "Cover letter must be at least 30 characters.")
    .max(5000),

  proposedBudget: z.coerce
    .number()
    .positive("Budget must be greater than 0."),

  estimatedDays: z.coerce
    .number()
    .min(1, "Estimated days must be at least 1."),
});