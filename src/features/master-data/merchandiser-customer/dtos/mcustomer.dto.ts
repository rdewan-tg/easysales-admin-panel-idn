export interface MCustomerDto {
  status: string;
  data: MCustomer[];
}

export interface MCustomer {
  id: number;
  customerId: string;
  smMcId: string;
  outletName: string;
  area: string;
  district: string;
  roadName: string;
  companyId: number;
  createAt: Date;
  updatedAt: Date;
}
