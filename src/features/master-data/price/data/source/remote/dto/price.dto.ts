export interface PriceDto {
  status: string;
  total: number;
  data: Price[];
}

export interface Price {
  id: number;
  productId: string;
  itemId: string;
  fromDate: Date;
  toDate: Date;
  unitPrice: string;
  currencyCode: string;
  salesUnit: string;
  priceGroup: string;
  recId: string;
  companyId: number;
  companyCode: string;
  createAt: Date;
  updatedAt: Date;
}
