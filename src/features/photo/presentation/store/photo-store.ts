import { create } from "zustand";
import {
  findPhotosByCustomerChain,
  findPhotosByDeviceId,
  findPhotosByFromToDate,
  getAllPhotos,
  getCustomerChains,
  getDevices,
} from "../../data";
import { PhotoState } from "../state/photo-state";
import { createSelectors } from "@/core/data";

const usePhotoStore = create<PhotoState>((set) => ({
  isLoading: false,
  photos: [],
  devices: [],
  customerChains: [],
  error: null,
  getDevices: async () => {
    try {
      set({ isLoading: true });
      const response = await getDevices();
      set({ devices: response.data, isLoading: false });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
  getCustomerChains: async () => {
    try {
      set({ isLoading: true });
      const response = await getCustomerChains();
      set({ customerChains: response.data, isLoading: false });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
  getPhotos: async () => {
    try {
      set({ isLoading: true });
      const response = await getAllPhotos();
      set({ photos: response.data, isLoading: false });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
  findPhotosByDeviceId: async (
    fromDate: string,
    toDate: string,
    deviceId: string,
  ) => {
    try {
      set({ isLoading: true });
      const response = await findPhotosByDeviceId(fromDate, toDate, deviceId);
      set({ photos: response.data, isLoading: false });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
  findPhotosByFromToDate: async (fromDate: string, toDate: string) => {
    try {
      set({ isLoading: true });
      const response = await findPhotosByFromToDate(fromDate, toDate);
      set({ photos: response.data, isLoading: false });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
  findPhotosByCustomerChain: async (
    fromDate: string,
    toDate: string,
    customerChain: string,
  ) => {
    try {
      set({ isLoading: true });
      const response = await findPhotosByCustomerChain(
        fromDate,
        toDate,
        customerChain,
      );
      set({ photos: response.data, isLoading: false });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
}));

export default createSelectors(usePhotoStore);
