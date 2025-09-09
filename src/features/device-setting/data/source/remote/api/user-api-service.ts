import { getUsersEndpoint } from "@/core/data";
import { UsersDto } from "../../..";
import { axiosAdminInstance } from "@/core/data/remote/axios-instance";

export const getUsers = async () => {
  const response = await axiosAdminInstance.get<UsersDto>(getUsersEndpoint);
  return response.data;
};
