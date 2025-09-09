export interface SalesLineDto {
  status: string;
  data: SalesLineData[];
}

export interface SalesLineData {
  id: number;
  salesId: string;
  lineId: number;
  itemId: string;
  productId: string;
  productName: string;
  productDescription: string;
  packSize: string;
  quantity: string;
  salesUnit: string;
  salesPrice: string;
  taxAmount: string;
  lineAmount: string;
  inventDimId: string;
  transactionDate: string;
  deviceId: string;
  syncStatus: number;
  companyId: number;
  createAt: Date;
  updatedAt: Date;
}
