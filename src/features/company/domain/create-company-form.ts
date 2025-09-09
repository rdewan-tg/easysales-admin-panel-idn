import { z } from "zod";

export const createCompanySchema = z.object({
  name: z
    .string()
    .min(4, { message: "Name must be at least 4 characters long" })
    .max(50),
  address: z
    .string()
    .min(4, { message: "Address must be at least 4 characters long" })
    .max(200),
  email: z.string().email(),
  phone: z
    .string()
    .min(10, { message: "Phone must be at least 10 characters long" })
    .max(20),
  countryId: z
    .string()
    .min(1, { message: "Country must be selected" }),
  companyCode: z
    .string()
    .min(4, { message: "Company code must be at least 4 characters long" })
    .max(20),
  companySetting: z.object({
    timeZone: z
      .string()
      .min(4, { message: "Time zone must be at least 4 characters long" })
      .max(20),
    currencyCode: z
      .string()
      .min(3, { message: "Currency code must be at least 4 characters long" })
      .max(3),
    isSiteVisitEnabled: z.boolean().default(false),
  }),
});

export type CreateCompanyForm = z.infer<typeof createCompanySchema>;
