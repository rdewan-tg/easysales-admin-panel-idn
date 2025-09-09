import {
  axiosAdminInstance,
  createCompanyEndpoint,
  getCompaniesEndpoint,
  updateCompanyEndpoint,
  deleteCompanyEndpoint,
} from "@/core/data";
import { CompanyDto } from "@/common/dtos";

export const getCompanies = async () => {
  const response =
    await axiosAdminInstance.get<CompanyDto>(getCompaniesEndpoint);
  return response.data;
};

export const createCompany = async (data: any) => {
  const response = await axiosAdminInstance.post<CompanyDto>(
    createCompanyEndpoint,
    data,
  );
  return response.data;
};

export const updateCompany = async (data: any) => {
  const response = await axiosAdminInstance.put<CompanyDto>(
    `${updateCompanyEndpoint}/${data.id}`,
    data,
  );
  return response.data;
};

export const deleteCompany = async (id: number) => {
  const response = await axiosAdminInstance.delete<CompanyDto>(
    `${deleteCompanyEndpoint}/${id}`,
  );
  return response.data;
};
