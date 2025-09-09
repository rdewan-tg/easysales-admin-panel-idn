export interface ActivityLogDto {
  status: string;
  data: ActivityLog[];
  meta?: PaginationMetadata;
}

export interface ActivityLog {
  id?: number;
  userId?: string;
  action: string;
  details: string;
  level: string;
  timestamp?: Date;
}

export interface PaginationMetadata {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
