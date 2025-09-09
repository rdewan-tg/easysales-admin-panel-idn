import { create } from "zustand";
import { ActivityLogState } from "../state/activity-log-state";
import { createSelectors } from "@/core/data";
import { ActivityLog, createActivityLog, getActivityLogs } from "../../data";

const useActivityLogStore = create<ActivityLogState>((set) => ({
  logs: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  pageSize: 100,
  totalRecords: 0,
  totalPages: 0,
  getActivityLogs: async (page = 1, pageSize = 100) => {
    try {
      set({ isLoading: true, error: null });
      const response = await getActivityLogs(page, pageSize);

      // Update state with the response data and pagination metadata
      set({
        logs: response.data,
        isLoading: false,
        error: null,
        currentPage: response.meta?.page || page,
        pageSize: response.meta?.pageSize || pageSize,
        totalRecords: response.meta?.total || 0,
        totalPages: response.meta?.totalPages || 0,
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
  createActivityLog: async (data: ActivityLog) => {
    try {
      set({ isLoading: true, error: null });
      await createActivityLog(data);
      set({ isLoading: false, error: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
}));

export default createSelectors(useActivityLogStore);
