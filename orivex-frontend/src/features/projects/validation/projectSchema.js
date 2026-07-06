import { z } from "zod";

export const projectSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters.")
    .max(200),

  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(5000),

  category: z
    .string()
    .min(1, "Category is required."),

  projectType: z
    .string()
    .min(1, "Project type is required."),

  experienceLevel: z
    .string()
    .min(1, "Experience level is required."),

  budget: z.coerce
    .number()
    .min(1, "Budget must be greater than zero."),

  deadline: z
    .string()
    .min(1, "Deadline is required."),

  requiredSkills: z
    .string()
    .min(2, "Required skills are required.")
    .max(1000),

  minimumExperienceYears: z.coerce
    .number()
    .min(0, "Minimum experience cannot be negative."),
});