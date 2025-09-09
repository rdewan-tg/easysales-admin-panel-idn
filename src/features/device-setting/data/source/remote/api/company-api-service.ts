import { CompanyDto } from "@/common/dtos";
import { axiosAdminInstance, getCompaniesEndpoint } from "@/core/data";

export const getCompanies = async () => {
  const response =
    await axiosAdminInstance.get<CompanyDto>(getCompaniesEndpoint);
  return response.data;
};
