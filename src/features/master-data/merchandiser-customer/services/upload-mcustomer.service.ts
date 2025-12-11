import { UploadCustomerData } from "../dtos/upload-customer.dto";
import { uploadMCustomers } from "../repo/merchandiser.repo";
import { UploadCustomerSchema } from "../schemas/upload-customer.schema";

export const uploadMCustomerService = async (
  data: UploadCustomerSchema
): Promise<UploadCustomerData> => {
  const formData = new FormData();
  formData.append("file", data.file);
  const response = await uploadMCustomers(formData);
  return response.data;
};
