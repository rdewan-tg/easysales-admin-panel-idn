import { z } from "zod";

export const createCountrySchema = z.object({
  name: z
    .string()
    .min(4, { message: "Name must be at least 4 characters long" })
    .max(20),
  countryCode: z
    .string()
    .min(2, { message: "Country code must be at least 4 characters long" })
    .max(2),
  currencyCode: z
    .string()
    .min(3, { message: "Currency code must be at least 4 characters long" })
    .max(3),

});

export type CreateCountryForm = z.infer<typeof createCountrySchema>;
