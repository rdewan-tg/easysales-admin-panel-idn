import { Customer } from "../../data";

export type CustomerState = {
  customers: Customer[];
  isLoading: boolean;
  error: string | null;
  getCustomers: (dataAreaId: string) => Promise<void>;
  importFromAzureDb: () => Promise<void>;
};
