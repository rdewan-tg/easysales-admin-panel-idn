import { RoleDto } from "@/common/dtos";
import { LoginForm } from "../../../../../../../common/types";
import {
  axiosAdminInstance,
  checkAuthStateEndpoint,
  getMyRolesEndpoint,
  loginEndpoint,
  logoutEndpoint,
} from "@/core/data";
import { AuthStateResponse, LoginResponse } from "../../../index";

export const login = async (data: LoginForm): Promise<LoginResponse> => {
  const response = await axiosAdminInstance.post<LoginResponse>(
    loginEndpoint,
    data,
  );

  return response.data;
};

export const checkAuthState = async (): Promise<AuthStateResponse> => {
  const response = await axiosAdminInstance.get<AuthStateResponse>(
    checkAuthStateEndpoint,
  );

  return response.data;
};

export const getMyRoles = async () => {
  const response = await axiosAdminInstance.get<RoleDto>(getMyRolesEndpoint);

  return response.data;
};

export const logout = async () => {
  await axiosAdminInstance.post(logoutEndpoint);
};
