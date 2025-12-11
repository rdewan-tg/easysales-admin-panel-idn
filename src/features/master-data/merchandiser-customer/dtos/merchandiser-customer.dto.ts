export interface MerchandiserCustomerDto {
  status: string;
  total: number;
  data: MerchandiserCustomer[];
}

export interface MerchandiserCustomer {
  id: number;
  customerId: string;
  customerName: string;
  address: string;
  salesPersonId: string;
  salesPerson: string;
  merchandiser: string | null;
  countryId: string | null;
  phoneNumber: string | null;
  latitude: string;
  longitude: string;
  creditLimit: null;
  currencyCode: null;
  paymentTerm: null;
  priceGroup: null;
  customreDimension: string;
  status: number;
  companyId: number;
  createAt: Date;
  updatedAt: Date;
}
