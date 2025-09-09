import { ActivityLog } from "../../data";

export type ActivityLogState = {
  logs: ActivityLog[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  getActivityLogs: (page?: number, pageSize?: number) => Promise<void>;
  createActivityLog: (activityLog: ActivityLog) => Promise<void>;
};
