import { create } from "zustand";
import { MerchandiserCustomerState } from "../state/merchandiser-customer-state";
import { createSelectors } from "@/core/data";
import { getMerchandiserCustomers, importMerchandiserCustomersFromAzureDb } from "../../data";

const userMerchandiserCustomer = create<MerchandiserCustomerState>((set) => ({
  customers: [],
  isLoading: false,
  error: null,
  getMerchandiserCustomers: async (dataAreaId: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await getMerchandiserCustomers(dataAreaId);
      set({ customers: response.data, isLoading: false, error: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
  importFromAzureDb: async () => {
    try {
      set({ isLoading: true, error: null });
      await importMerchandiserCustomersFromAzureDb();
      set({ isLoading: false, error: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  }
}));

export default createSelectors(userMerchandiserCustomer);
