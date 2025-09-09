import { axiosAdminInstance, getPricesEndpoint, importPricesFromAzureDbEndpoint } from "@/core/data";
import { PriceDto } from "../../..";
import { ImportDataFromAzureDbDto } from "@/common/dtos";

export const getPrices = async (dataAreaId: string) => {
  const response = await axiosAdminInstance.get<PriceDto>(
    `${getPricesEndpoint}/${dataAreaId}`,
  );
  return response.data;
};

export const importPricesFromAzureDb = async () => {
  const response = await axiosAdminInstance.get<ImportDataFromAzureDbDto>(importPricesFromAzureDbEndpoint);
  return response.data;
};
