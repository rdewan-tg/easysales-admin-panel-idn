import { axiosAdminInstance, getCustomerAddressEndpoint, importAddressesFromAzureDbEndpoint } from "@/core/data";
import { CustomerAddressDto } from "../../..";
import { ImportDataFromAzureDbDto } from "@/common/dtos";

export async function getCustomerAddress(dataAreaId: string) {
  const response = await axiosAdminInstance.get<CustomerAddressDto>(
    `${getCustomerAddressEndpoint}/${dataAreaId}`,
  );
  return response.data;
}

export const importAddressesFromAzureDb = async () => {
  const response = await axiosAdminInstance.get<ImportDataFromAzureDbDto>(importAddressesFromAzureDbEndpoint);
  return response.data;
};
