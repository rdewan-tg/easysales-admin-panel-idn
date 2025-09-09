import { z } from "zod";

export const updatePasswordSchema = z.object({
  userId: z.number(),
  password: z
    .string()
    .min(8)
    .max(20)
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one digit")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character",
    ),
});

export type UpdatePasswordForm = z.infer<typeof updatePasswordSchema>;
