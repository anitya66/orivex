import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters.")
    .max(100, "Name cannot exceed 100 characters."),

  email: z
    .string()
    .email("Please enter a valid email."),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(20, "Password cannot exceed 20 characters."),

  role: z.enum(["CLIENT", "FREELANCER"], {
    message: "Please select a role.",
  }),
});