import { z } from "zod";

export const filterByDatesSchema = z.object({
  fromDate: z
    .union([z.date(), z.string()])
    .refine((val) => !isNaN(new Date(val).getTime())),
  toDate: z
    .union([z.date(), z.string()])
    .refine((val) => !isNaN(new Date(val).getTime())),
});

export type FilterByDatesForm = z.infer<typeof filterByDatesSchema>;
