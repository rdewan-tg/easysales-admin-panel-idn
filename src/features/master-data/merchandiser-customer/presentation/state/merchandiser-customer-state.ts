import { MerchandiserCustomer } from "../../data";

export type MerchandiserCustomerState = {
  customers: MerchandiserCustomer[];
  isLoading: boolean;
  error: string | null;
  getMerchandiserCustomers: (dataAreaId: string) => Promise<void>;
  importFromAzureDb: () => Promise<void>;
};
