import { getMCustomer } from "../repo/merchandiser.repo";
import { MCustomer } from "../dtos/mcustomer.dto";

export const getMCustomerService = async () : Promise<MCustomer[]> => {
  const response = await getMCustomer();
  return response.data;
};