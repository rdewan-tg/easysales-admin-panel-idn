import {
  axiosAdminInstance,
  getPhotoReportByDateRangeEndpoint,
} from "@/core/data";
import { PhotoReportByDateRangeDto } from "../dto/site-visit-report-by-date-range.dto";

export const getPhotoReportByDateRange = async (
  start: string,
  end: string,
) => {
  const response = await axiosAdminInstance.get<PhotoReportByDateRangeDto>(
    `${getPhotoReportByDateRangeEndpoint}?fromDate=${start}&toDate=${end}`,
  );

  return response.data;
};

