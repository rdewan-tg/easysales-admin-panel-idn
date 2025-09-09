import { SignupForm } from "@/common/types";
import { UpdatePasswordDto, UpdateUserDto, UserDto, UsersDto } from "../../..";
import {
  axiosAdminInstance,
  createUserEndpoint,
  deleteUserEndpoint,
  getUserByIdEndpoint,
  getUsersByCompanyEndpoint,
  updatePasswordEndpoint,
  updateUserEndpoint,
} from "@/core/data";
import { DeleteUserDto } from "../dto/delete-user.dto";

export const createUser = async (data: any) => {
  const response = await axiosAdminInstance.post<SignupForm>(
    createUserEndpoint,
    data,
  );
  return response.data;
};

export const getUsersByCompany = async () => {
  const response = await axiosAdminInstance.get<UsersDto>(
    getUsersByCompanyEndpoint,
  );
  return response.data;
};

export const getUserById = async (id: number) => {
  const response = await axiosAdminInstance.get<UserDto>(
    `${getUserByIdEndpoint}/${id}`,
  );
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await axiosAdminInstance.delete<DeleteUserDto>(
    `${deleteUserEndpoint}/${id}`,
  );
  return response.data;
};

export const updatePassword = async (data: any) => {
  const response = await axiosAdminInstance.post<UpdatePasswordDto>(
    `${updatePasswordEndpoint}`,
    data,
  );
  return response.data;
};

export const updateUser = async (data: UpdateUserDto) => {
  const response = await axiosAdminInstance.put<UserDto>(
    updateUserEndpoint,
    data
  );
  return response.data;
};
