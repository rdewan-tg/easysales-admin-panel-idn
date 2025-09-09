import { z } from "zod";

// Define the form schema using Zod
export const createAreaFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string().min(1, "Code is required"),
  companyId: z.number().min(1, "Please select a company"),
});

export type CreateAreaForm = z.infer<typeof createAreaFormSchema>;
