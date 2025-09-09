import {
  axiosAdminInstance,
  createActivityLogEndpoint,
  getActivityLogsEndpoint,
} from "@/core/data";
import { ActivityLog, ActivityLogDto } from "../../..";

export const getActivityLogs = async (
  page: number = 1,
  pageSize: number = 100
) => {
  const response = await axiosAdminInstance.get<ActivityLogDto>(
    `${getActivityLogsEndpoint}?page=${page}&pageSize=${pageSize}`
  );
  return response.data;
};

export const createActivityLog = async (data: ActivityLog) => {
  const response = await axiosAdminInstance.post<ActivityLogDto>(
    createActivityLogEndpoint,
    data
  );
  return response.data;
};
