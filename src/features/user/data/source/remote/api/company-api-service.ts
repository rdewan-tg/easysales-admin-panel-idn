import { axiosAdminInstance, getCompaniesEndpoint } from "@/core/data";
import { CompanyDto } from "@/features/user/data";

export const getCompanies = async () => {
  const response =
    await axiosAdminInstance.get<CompanyDto>(getCompaniesEndpoint);
  return response.data;
};
