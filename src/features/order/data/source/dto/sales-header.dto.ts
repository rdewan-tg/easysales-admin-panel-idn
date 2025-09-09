export interface SalesHeadersDto {
  status: string;
  data: SalesHeaderData[];
}

export interface SalesHeaderDto {
  status: string;
  data: SalesHeaderData[];
}

export interface SalesHeaderData {
  id: number;
  salesId: string;
  customerId: string;
  customerName: string;
  customerAddress: string;
  salesPersonId: string;
  customerRequisition: string;
  customerPriceGroup: string;
  note: string;
  deliveryAddressLocation: string;
  deliveryDate: string;
  transactionDate: string;
  deviceId: string;
  syncStatus: number;
  companyId: number;
  createAt: Date;
  updatedAt: Date;
}
