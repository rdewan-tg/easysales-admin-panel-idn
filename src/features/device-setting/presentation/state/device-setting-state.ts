import { CreateDeviceSettingForm } from "@/common/types";
import { DeviceSetting, User } from "../../data";
import { Company } from "@/common/dtos";
import { UpdateDeviceSettingForm } from "@/common/types/update-device-setting-form";

export type DeviceSettingState = {
  devices: DeviceSetting[];
  device?: DeviceSetting;
  companies: Company[];
  users: User[];
  isLoading: boolean;
  error: string | null;
  isDeviceSettingCreated: boolean | null;
  isDeviceSettingUpdated: boolean | null;
  isDeviceSettingDeleted: boolean | null;
  createDeviceSetting: (data: CreateDeviceSettingForm) => Promise<void>;
  updateDeviceSetting: (data: UpdateDeviceSettingForm) => Promise<void>;
  findAll: () => Promise<void>;
  findById: (id: number) => Promise<void>;
  findByDeviceId: (deviceId: String) => Promise<void>;
  deleteDeviceSetting: (id: number) => Promise<void>;
  getCompanies: () => Promise<void>;
  getUsers: () => Promise<void>;
};
