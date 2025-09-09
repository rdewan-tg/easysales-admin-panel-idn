import {
  axiosAdminInstance,
  getMerchandiserCustomersEndpoint,
  importMerchandiserCustomersFromAzureDbEndpoint,
} from "@/core/data";
import { MerchandiserCustomerDto } from "../dto/merchandiser-customer.dto";
import { ImportDataFromAzureDbDto } from "@/common/dtos";

export const getMerchandiserCustomers = async (dataAreaId: string) => {
  const response = await axiosAdminInstance.get<MerchandiserCustomerDto>(
    `${getMerchandiserCustomersEndpoint}/${dataAreaId}`,
  );
  return response.data;
};

export const importMerchandiserCustomersFromAzureDb = async () => {
  const response = await axiosAdminInstance.get<ImportDataFromAzureDbDto>(importMerchandiserCustomersFromAzureDbEndpoint);
  return response.data;
};
