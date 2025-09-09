import { create } from "zustand";
import { createSelectors } from "../../../../core/data";
import { DeviceSettingState } from "../state/device-setting-state";

import { CreateDeviceSettingForm } from "@/common/types";
import {
  createDeviceSetting,
  deleteDeviceSetting,
  getDeviceSettings,
  findByDeviceId,
  getDeviceSettingById,
  getCompanies,
  getUsers,
  updateDeviceSetting,
} from "@/features/device-setting/data";
import { UpdateDeviceSettingForm } from "@/common/types/update-device-setting-form";

const useDeviceSettingStore = create<DeviceSettingState>((set) => ({
  devices: [],
  device: undefined,
  companies: [],
  users: [],
  isLoading: false,
  isDeviceSettingCreated: null,
  isDeviceSettingUpdated: null,
  isDeviceSettingDeleted: null,
  error: null,
  createDeviceSetting: async (data: CreateDeviceSettingForm): Promise<void> => {
    try {
      set({ isLoading: true, isDeviceSettingCreated: null, error: null });
      await createDeviceSetting(data);
      set({ isLoading: false, isDeviceSettingCreated: true, error: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
  updateDeviceSetting: async (data: UpdateDeviceSettingForm): Promise<void> => {
    try {
      set({ isLoading: true, isDeviceSettingUpdated: null, error: null });
      await updateDeviceSetting(data);
      set({ isLoading: false, isDeviceSettingUpdated: true, error: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
  findAll: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await getDeviceSettings();
      set({ devices: response.data, isLoading: false, error: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
  findById: async (id: number) => {
    try {
      set({ isLoading: true, error: null });
      const response = await getDeviceSettingById(id);
      set({ device: response.data, isLoading: false, error: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
  findByDeviceId: async (deviceId: String) => {
    try {
      set({ isLoading: true, error: null });
      const response = await findByDeviceId(deviceId);
      set({ device: response.data, isLoading: false, error: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
  deleteDeviceSetting: async function (id: number) {
    try {
      set({ isLoading: true, error: null, isDeviceSettingDeleted: null });
      await deleteDeviceSetting(id);
      set({ isDeviceSettingDeleted: true, isLoading: false, error: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
  getCompanies: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await getCompanies();
      set({ companies: response.data, isLoading: false, error: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
  getUsers: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await getUsers();
      set({ users: response.data, isLoading: false, error: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ users: [], isLoading: false, error: errorMessage });
    }
  },
}));

export default createSelectors(useDeviceSettingStore);
