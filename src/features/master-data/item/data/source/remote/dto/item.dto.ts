export interface ItemDto {
  status: string;
  total: number;
  data: Item[];
}

export interface Item {
  id: number;
  productId: string;
  itemId: string;
  productName: string;
  description: string;
  category: string;
  barcode: string;
  itemGroup: string;
  packing: string;
  salesUnit: string;
  unitPrice: string;
  image: string;
  itemDiscountGroup: string;
  itemFOCGroup: string;
  inventDimId: string;
  status: string;
  companyCode: string;
  companyId: number;
  createAt: Date;
  updatedAt: Date;
}
