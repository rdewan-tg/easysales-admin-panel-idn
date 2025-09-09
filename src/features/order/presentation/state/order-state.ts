import { GetOrderCreatedDatesForm } from "@/common/types/get-order-created-date-form";
import { ExportOrderToCSVDto, OrderCreatedDate, SalesHeaderData, SalesLineData } from "../../data";


export type OrderState = {
  isLoading: boolean;
  error: string | null;
  salesHeaders: SalesHeaderData[];
  filteredSalesHeaders: SalesHeaderData[];
  salesHeader: SalesHeaderData | null;
  salesLines: SalesLineData[];
  filteredSalesLines: SalesLineData[];
  selectedSalesIds: string[];
  orderCreatedDates: OrderCreatedDate[];
  getSalesHeadersByCompany: () => Promise<void>;
  getSalesLinesByCompany: () => Promise<void>;
  getSalesHeaderByCompanyDateRange: (
    data: GetOrderCreatedDatesForm,
  ) => Promise<void>;
  getSalesLinesById: (salesId: string) => Promise<void>;
  setSelectedSalesIds: (salesId: string | string[]) => void;
  exportOrderToCSV: (data: ExportOrderToCSVDto) => Promise<void>;
  getOrderCreatedDates: () => Promise<void>;
  deleteSalesHeader: (id: string) => Promise<void>;
};
