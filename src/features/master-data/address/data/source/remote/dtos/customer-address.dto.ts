export interface CustomerAddressDto {
  status: string;
  total: number;
  data: CustomerAddress[];
}

export interface CustomerAddress {
  id: number;
  customerId: string;
  address: null | string;
  salesPersonId: string;
  latitude: string;
  longitude: string;
  deliveryName: string;
  postalAddress: string;
  location: string;
  isPrimary: boolean;
  companyId: number;
  companyCode: string;
  createAt: Date;
  updatedAt: Date;
}
