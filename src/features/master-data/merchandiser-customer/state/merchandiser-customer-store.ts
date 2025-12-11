import { create } from "zustand";
import { MerchandiserCustomerState } from "./merchandiser-customer-state";
import { createSelectors } from "@/core/data";

import { uploadMCustomerService } from "../services/upload-mcustomer.service";
import { UploadCustomerSchema } from "../schemas/upload-customer.schema";
import { getMCustomerService } from "../services/get-mcustomer.service";

const merchandiserCustomer = create<MerchandiserCustomerState>((set) => ({
  customers: [],
  mCustomers: [],
  isLoading: false,
  error: null,
  uploadMCustomer: async (data: UploadCustomerSchema) => {
    try {
      set({ isLoading: true, error: null });
      await uploadMCustomerService(data);
      set({ isLoading: false, error: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({error: errorMessage });
      setTimeout(() => {
        set({ error: null });
      }, 5000);
    } finally {
      set({ isLoading: false });
    }
  },
  getMCustomer: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await getMCustomerService();
      set({ isLoading: false, error: null, mCustomers: response });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ error: errorMessage });
      setTimeout(() => {
        set({ error: null });
      }, 5000);
    } finally {
      set({ isLoading: false });
    }
  },
}));

const useMerchandiserCustomerStore = createSelectors(merchandiserCustomer);
export default useMerchandiserCustomerStore;
