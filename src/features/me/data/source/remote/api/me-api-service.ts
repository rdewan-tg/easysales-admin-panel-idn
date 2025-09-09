import {
  axiosAdminInstance,
  changeCompanyEndpoint,
  getMeEndpoint,
} from "@/core/data";
import { ChangeCompanyDto, MeDto } from "@/features/me/data";

export const getMe = async () => {
  const response = await axiosAdminInstance.get<MeDto>(getMeEndpoint);
  return response.data;
};

export const changeCompany = async (data: ChangeCompanyDto) => {
  const response = await axiosAdminInstance.post<MeDto>(
    changeCompanyEndpoint,
    data,
  );
  return response.data;
};
