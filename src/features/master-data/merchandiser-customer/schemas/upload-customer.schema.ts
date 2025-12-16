import { z } from "zod";

export const uploadCustomerSchema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) =>
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel",
      {
        message: "File must be an Excel file",
      }
    ),
});

export type UploadCustomerSchema = z.infer<typeof uploadCustomerSchema>;
