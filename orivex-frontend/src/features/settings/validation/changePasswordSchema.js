import { z } from "zod";

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, "Current password is required."),

  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(20, "Password cannot exceed 20 characters."),
});