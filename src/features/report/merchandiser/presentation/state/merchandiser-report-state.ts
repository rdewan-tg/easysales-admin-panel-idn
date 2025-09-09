import { TransDate } from "@/common/dtos";
import { PhotoReportByDateRangeDetail } from "../../data";

export type MerchandiserReportState = {
  isLoading: boolean;
  photoReportByDateRangeDetail: PhotoReportByDateRangeDetail[];
  error: string | null;
  transDates: TransDate[];
  getPhotoReportByDateRange: (start: string, end: string) => Promise<void>;
  clearFilter: () => Promise<void>;
};
