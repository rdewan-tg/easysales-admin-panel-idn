
import { MerchandiserCustomer } from "../dtos";
import { UploadCustomerSchema } from "../schemas/upload-customer.schema";
import { MCustomer } from "../dtos/mcustomer.dto";

export type MerchandiserCustomerState = {
  customers: MerchandiserCustomer[];
  mCustomers: MCustomer[];
  isLoading: boolean;
  error: string | null;
  uploadMCustomer: (data: UploadCustomerSchema) => Promise<void>;
  getMCustomer: () => Promise<void>;
};
