import { CreateDeviceSettingForm } from "@/common/types";
import {
  CreateDeviceSettingDto,
  DeviceSettingDto,
  DeviceSettingsDto,
} from "../../..";
import {
  axiosAdminInstance,
  createDeviceSettingEndpoint,
  deleteDeviceSettingEndpoint,
  findByDeviceIdEndpoint,
  getDeviceSettingByIdEndpoint,
  getDeviceSettingsEndpoint,
  updateDeviceSettingEndpoint,
} from "@/core/data";
import { DeleteDeviceSettingDto } from "../dto/delete-device-setting.dto";
import { UpdateDeviceSettingForm } from "@/common/types/update-device-setting-form";

export const getDeviceSettings = async () => {
  const response = await axiosAdminInstance.get<DeviceSettingsDto>(
    getDeviceSettingsEndpoint,
  );
  return response.data;
};

export const getDeviceSettingById = async (id: number) => {
  const response = await axiosAdminInstance.get<DeviceSettingDto>(
    `${getDeviceSettingByIdEndpoint}/${id}`,
  );
  return response.data;
};

export const findByDeviceId = async (deviceId: String) => {
  const response = await axiosAdminInstance.get<DeviceSettingDto>(
    `${findByDeviceIdEndpoint}/${deviceId}`,
  );
  return response.data;
};

export const createDeviceSetting = async (data: CreateDeviceSettingForm) => {
  const response = await axiosAdminInstance.post<CreateDeviceSettingDto>(
    `${createDeviceSettingEndpoint}`,
    data,
  );
  return response.data;
};

export const updateDeviceSetting = async (data: UpdateDeviceSettingForm) => {
  const response = await axiosAdminInstance.patch<CreateDeviceSettingDto>(
    `${updateDeviceSettingEndpoint}`,
    data,
  );
  return response.data;
};

export const deleteDeviceSetting = async (id: number) => {
  console.log("sending delete request");

  const response = await axiosAdminInstance.delete<DeleteDeviceSettingDto>(
    `${deleteDeviceSettingEndpoint}/${id}`,
  );
  return response.data;
};
