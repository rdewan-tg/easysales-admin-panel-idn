import { Item } from "../../data";

export type ItemState = {
  items: Item[];
  isLoading: boolean;
  error: string | null;
  getItems: (dataAreaId: string) => Promise<void>;
  importFromAzureDb: () => Promise<void>;
};
