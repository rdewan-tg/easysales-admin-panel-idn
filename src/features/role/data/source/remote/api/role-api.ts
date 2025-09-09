import { RoleDto } from "@/common/dtos";
import {
  axiosAdminInstance,
  deleteUserRoleEndpoint,
  getRolesEndpoint,
  setUserRolesEndpoint,
} from "@/core/data";
import { UpdateUserRoleDto } from "../dto/update-user-role.dto";

export const getRoles = async () => {
  const response = await axiosAdminInstance.get<RoleDto>(getRolesEndpoint);
  return response.data;
};

export const setUserRole = async (data: UpdateUserRoleDto) => {
  const response = await axiosAdminInstance.post<RoleDto>(
    setUserRolesEndpoint,
    data,
  );
  return response.data;
};

export const deleteUserRole = async (data: UpdateUserRoleDto) => {
  const response = await axiosAdminInstance.delete<RoleDto>(
    deleteUserRoleEndpoint,
    { params: data },
  );
  return response.data;
};
