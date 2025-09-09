export interface PhotoDto {
  status: string;
  data: Photo[];
}

export interface Photo {
  id: number;
  deviceId: string;
  salesPersonCode: string;
  userName: string;
  customerId: string;
  customerName: string;
  customerAddress: string;
  fileName: string;
  transDate: string;
  transTime: string;
  transDay: number;
  transMonth: number;
  transYear: number;
  companyId: number;
  createAt: Date;
  updatedAt: Date;
  photo: string;
}
