import { CustomerAddress } from "../../data";

export type CustomerAddressState = {
  isLoading: boolean;
  addresses: CustomerAddress[];
  error: string | null;
  getCustomerAddress: (dataAreaId: string) => Promise<void>;
  importFromAzureDb: () => Promise<void>;
};
