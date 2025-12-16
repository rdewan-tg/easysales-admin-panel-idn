import {
  axiosAdminInstance,
  getMCustomerEndpoint,
  getMerchandiserCustomersEndpoint,
  importMCustomersEndpoint,
  importMerchandiserCustomersFromAzureDbEndpoint,
} from "@/core/data";
import { MerchandiserCustomerDto } from "../dtos/merchandiser-customer.dto";
import { ImportDataFromAzureDbDto } from "@/common/dtos";
import { UploadCustomerDto } from "../dtos/upload-customer.dto";
import { MCustomerDto } from "../dtos/mcustomer.dto";

export const getMerchandiserCustomers = async (dataAreaId: string) => {
  const response = await axiosAdminInstance.get<MerchandiserCustomerDto>(
    `${getMerchandiserCustomersEndpoint}/${dataAreaId}`
  );
  return response.data;
};

export const importMerchandiserCustomersFromAzureDb = async () => {
  const response = await axiosAdminInstance.get<ImportDataFromAzureDbDto>(
    importMerchandiserCustomersFromAzureDbEndpoint
  );
  return response.data;
};


export const getMCustomer = async () => {
  const response = await axiosAdminInstance.get<MCustomerDto>(
    `${getMCustomerEndpoint}/filter/company-id`
  );
  return response.data;
};

export const uploadMCustomers = async (data: FormData) => {
  const response = await axiosAdminInstance.post<UploadCustomerDto>(
    importMCustomersEndpoint,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
