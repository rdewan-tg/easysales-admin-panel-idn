import { z } from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long (max 50)" })
      .max(50),
    email: z.string().email(),
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
    confirm_password: z
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
    companyId: z.number(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"], // This will attach the error to the confirm_password field
  });

export type SignupForm = z.infer<typeof signupSchema>;
