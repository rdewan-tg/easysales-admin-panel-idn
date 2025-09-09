import { z } from "zod";

export const createDeviceSettingSchema = z.object({
  deviceId: z
    .string()
    .min(3, { message: "deviceId must be at least 3 characters long" })
    .max(20),
  userId: z
    .string()
    .transform((value) => {
      return parseInt(value, 10);
    })
    .refine((value) => !isNaN(value), {
      message: "Invalid user ID",
      path: ["userId"],
    }),
  userName: z.string().min(4).max(20),
  salesPersonCode: z.string().min(2).max(20),
  orderNumberFormat: z.string().min(4).max(20),
  companyId: z
    .string()
    .transform((value) => {
      return parseInt(value, 10);
    })
    .refine((value) => !isNaN(value), {
      message: "Invalid company ID",
      path: ["companyId"],
    }),
});

export type CreateDeviceSettingForm = z.infer<typeof createDeviceSettingSchema>;
