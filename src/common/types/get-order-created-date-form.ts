import { z } from "zod";

export const getOrderCreatedDatesSchema = z.object({
  startDate: z
    .union([z.date(), z.string()])
    .refine((val) => !isNaN(new Date(val).getTime())),
  endDate: z
    .union([z.date(), z.string()])
    .refine((val) => !isNaN(new Date(val).getTime())),
});

export type GetOrderCreatedDatesForm = z.infer<
  typeof getOrderCreatedDatesSchema
>;
