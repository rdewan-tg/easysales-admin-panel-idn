import { create } from "zustand/react";
import { MerchandiserReportState } from "..";
import { getPhotoReportByDateRange } from "../../data";
import { createSelectors } from "@/core/data";

const useMerchandiserReportStore = create<MerchandiserReportState>((set) => ({
  isLoading: false,
  photoReportByDateRangeDetail: [],
  error: null,
  transDates: [],
  getPhotoReportByDateRange: async (start: string, end: string) => {
    try {
      set({ isLoading: true });
      const response = await getPhotoReportByDateRange(start, end);
      set({
        photoReportByDateRangeDetail: response.data.visitDetails,
        isLoading: false,
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
  clearFilter: async () => {
    set({
      photoReportByDateRangeDetail: [],
      isLoading: false,
      error: null,
    });
  },
}));

export default createSelectors(useMerchandiserReportStore);
