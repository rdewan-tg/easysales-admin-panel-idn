import { axiosAdminInstance, getCustomersEndpoint, importCustomersFromAzureDbEndpoint } from "@/core/data";
import { CustomerDto } from "../../..";
import { ImportDataFromAzureDbDto } from "@/common/dtos";

export const getCustomers = async (dataAreaId: string) => {
  const response = await axiosAdminInstance.get<CustomerDto>(
    `${getCustomersEndpoint}/${dataAreaId}`,
  );
  return response.data;
};

export const importCustomersFromAzureDb = async () => {
  const response = await axiosAdminInstance.get<ImportDataFromAzureDbDto>(importCustomersFromAzureDbEndpoint);
  return response.data;
};
