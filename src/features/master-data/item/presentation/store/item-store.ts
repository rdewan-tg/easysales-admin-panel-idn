import { create } from "zustand";
import { ItemState } from "../state/item-state";
import { createSelectors } from "@/core/data";
import { getItems, importItemsFromAzureDb } from "../../data";

const useItemStore = create<ItemState>((set) => ({
  items: [],
  isLoading: false,
  error: null,
  getItems: async (dataAreaId: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await getItems(dataAreaId);
      set({ items: response.data, isLoading: false, error: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
  importFromAzureDb: async () => {
    try {
      set({ isLoading: true, error: null });
      await importItemsFromAzureDb();
      set({ isLoading: false, error: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  }
}));

export default createSelectors(useItemStore);
