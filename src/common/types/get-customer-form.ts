import { z } from "zod";

export const getCustomerSchema = z.object({
  companyCode: z.string(),
});

export type GetCustomerForm = z.infer<typeof getCustomerSchema>;
