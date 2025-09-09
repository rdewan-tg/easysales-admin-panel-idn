import { z } from "zod";

export const getPhotoSchema = z.object({
  deviceId: z.string().optional(),
  customerChain: z.string().optional(),
  fromDate: z
    .union([z.date(), z.string()])
    .refine((val) => !isNaN(new Date(val).getTime())),
  toDate: z
    .union([z.date(), z.string()])
    .refine((val) => !isNaN(new Date(val).getTime())),
});

export type GetPhotoForm = z.infer<typeof getPhotoSchema>;
