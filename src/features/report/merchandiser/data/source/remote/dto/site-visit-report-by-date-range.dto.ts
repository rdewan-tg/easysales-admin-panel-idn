export interface PhotoReportByDateRangeDto {
  status: string;
  data: PhotoReportByDateRangeData;
}

export interface PhotoReportByDateRangeData {
  totalUniqueVisits: number;
  visitDetails: PhotoReportByDateRangeDetail[];
}

export interface PhotoReportByDateRangeDetail {
  salesPersonCode: string;
  customerId: string;
  customerName: string;
  customerAddress: string;
  transDate: string;
  visitCount: number;
}
