import { axiosAdminInstance, getItemsEndpoint, importItemsFromAzureDbEndpoint } from "@/core/data";
import { ItemDto } from "../../..";
import { ImportDataFromAzureDbDto } from "@/common/dtos";

export const getItems = async (dataAreaId: string) => {
  const response = await axiosAdminInstance.get<ItemDto>(
    `${getItemsEndpoint}/${dataAreaId}`,
  );
  return response.data;
};

export const importItemsFromAzureDb = async () => {
  const response = await axiosAdminInstance.get<ImportDataFromAzureDbDto>(
    importItemsFromAzureDbEndpoint,
  );
  return response.data;
};

