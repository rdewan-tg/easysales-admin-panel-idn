import { z } from "zod";

export const getAddressSchema = z.object({
  companyCode: z.string(),
});

export type GetAddressForm = z.infer<typeof getAddressSchema>;
