import { z } from "zod";

export const getPhotoByDatesSchema = z.object({
  fromDate: z
    .union([z.date(), z.string()])
    .refine((val) => !isNaN(new Date(val).getTime())),
  toDate: z
    .union([z.date(), z.string()])
    .refine((val) => !isNaN(new Date(val).getTime())),
});

export type GetPhotoByDatesForm = z.infer<typeof getPhotoByDatesSchema>;
