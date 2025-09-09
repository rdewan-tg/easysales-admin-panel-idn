export interface CustomerDto {
  status: string;
  total: number;
  data: Customer[];
}

export interface Customer {
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
