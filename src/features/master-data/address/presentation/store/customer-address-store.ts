import { create } from "zustand";
import { CustomerAddressState } from "../index";
import { getCustomerAddress, importAddressesFromAzureDb } from "../../data";
import { createSelectors } from "@/core/data";

const useCustomerAddressStore = create<CustomerAddressState>((set) => ({
  isLoading: false,
  addresses: [],
  error: null,
  getCustomerAddress: async (dataAreaId: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await getCustomerAddress(dataAreaId);
      set({ addresses: response.data, isLoading: false, error: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
  importFromAzureDb: async () => {
    try {
      set({ isLoading: true, error: null });
      await importAddressesFromAzureDb();
      set({ isLoading: false, error: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  }
}));

export default createSelectors(useCustomerAddressStore);
