import { z } from "zod";

export const getMerchandiserReportByDateRangeSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
});

export type GetMerchandiserReportByDateRangeForm = z.infer<
  typeof getMerchandiserReportByDateRangeSchema
>;
