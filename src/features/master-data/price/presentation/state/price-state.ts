import { Price } from "../../data";

export type PriceState = {
  prices: Price[];
  isLoading: boolean;
  error: string | null;
  getprices: (dataAreaId: string) => Promise<void>;
  importFromAzureDb: () => Promise<void>;
};
