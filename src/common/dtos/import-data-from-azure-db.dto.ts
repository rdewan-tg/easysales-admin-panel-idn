export interface ImportDataFromAzureDbDto {
  status: string;
  data: DataCount;
}

export interface DataCount {
  count: number;
}
