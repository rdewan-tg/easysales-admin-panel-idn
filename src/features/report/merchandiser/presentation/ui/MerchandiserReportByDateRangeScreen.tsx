import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Menu,
  MenuItem,
} from "@mui/material";
import { useMerchandiserReportStore } from "..";
import { ClickEventArgs } from "@syncfusion/ej2-navigations";
import {
  ColumnDirective,
  ColumnsDirective,
  Resize,
  Toolbar,
  Filter,
  GridComponent,
  Inject,
  Page,
  PageSettingsModel,
  Sort,
  Group,
  GroupSettingsModel,
  SortDirection,
  ExcelExport,
  ToolbarItems,
  Search,
} from "@syncfusion/ej2-react-grids";
import { MouseEvent, useRef, useState } from "react";
import { CalendarMonth, FilterAlt } from "@mui/icons-material";
import FilterByDate from "./components/FilterByDate";
import { NotificationSnackbar } from "@/common/components";

const MerchandiserReportByDateRangeScreen = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDateFilter, setOpenDateFilter] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  const isLoading = useMerchandiserReportStore((state) => state.isLoading);
  const error = useMerchandiserReportStore((state) => state.error);
  const data = useMerchandiserReportStore(
    (state) => state.photoReportByDateRangeDetail
  );
  const getPhotoReportByDateRange =
    useMerchandiserReportStore.use.getPhotoReportByDateRange();
  const clearFilter = useMerchandiserReportStore.use.clearFilter();

  const gridRef = useRef<GridComponent | null>(null);
  const pageSettings: PageSettingsModel = { pageSize: 50 };
  const toolbar: ToolbarItems[] = ["ExcelExport", "Search"];
  const groupOptions: GroupSettingsModel = {
    columns: ["salesPersonCode"],
  };

  const sortingOptions = {
    columns: [
      { field: "salesPersonCode", direction: "Ascending" as SortDirection },
    ],
  };

  const created = () => {
    (
      document.getElementById(
        (gridRef.current as GridComponent).element.id + "_searchbar"
      ) as HTMLElement
    ).addEventListener("keyup", (event) => {
      (gridRef.current as GridComponent).search(
        (event.target as HTMLInputElement).value
      );
    });
  };

  const toolbarClick = (args: ClickEventArgs) => {
    if (gridRef.current && args.item.id === "Grid_excelexport") {
      gridRef.current.showSpinner();
      gridRef.current.excelExport({ fileName: "MerchandiserReport.xlsx" });
    }
  };

  const excelExportComplete = (): void => {
    if (gridRef.current) {
      gridRef.current.hideSpinner();
    }
  };

  // Filter menu handlers
  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenDateFilter = () => {
    setOpenDateFilter(true);
    handleCloseMenu();
  };

  const handleCloseDateFilter = () => {
    setOpenDateFilter(false);
  };

  

  return (
    <Box
      sx={{
        minHeight: "80vh",
        margin: "16px",
      }}
    >
      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}

      <NotificationSnackbar
        isUpdated={false}
        isDeleted={false}
        updateMessage=""
        deleteMessage=""
        error={error || undefined}
      />

      <Button
        variant="outlined"
        startIcon={<FilterAlt />}
        onClick={handleOpenMenu}
        size="small"
        sx={{
          borderRadius: "20px",
          textTransform: "none",
          fontWeight: 500,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          },
          mr: "auto", // This pushes the button to the left
        }}
      >
        Filters
      </Button>

      {/* Filter Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          elevation: 3,
          sx: {
            borderRadius: "12px",
            minWidth: "200px",
            mt: 1,
            overflow: "visible",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={handleOpenDateFilter}
          sx={{
            borderRadius: "8px",
            mx: 0.5,
            my: 0.5,
            py: 1,
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
        >
          <CalendarMonth
            sx={{ mr: 2, color: "primary.main" }}
            fontSize="small"
          />
          <span>Date</span>
        </MenuItem>
        {isFiltered && (
          <MenuItem
            onClick={async () => {
              // clear filter
              clearFilter();
              // close the filter menu
              setIsFiltered(false);
              handleCloseMenu();
            }}
            sx={{
              borderRadius: "8px",
              mx: 0.5,
              my: 0.5,
              py: 1,
              borderTop: "1px solid",
              borderColor: "divider",
              mt: 1,
              pt: 1.5,
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            <FilterAlt sx={{ mr: 2, color: "success.main" }} fontSize="small" />
            <span>Clear Filters</span>
          </MenuItem>
        )}
      </Menu>

      {/* Date Filter Dialog */}
      <FilterByDate
        open={openDateFilter}
        close={handleCloseDateFilter}
        title="Filter by Date"
        description=""
        onFilter={async (fromDate, toDate) => {
          getPhotoReportByDateRange(fromDate, toDate);
          setIsFiltered(true);
        }}
      />

      <Box
        sx={{
          marginTop: "16px",
        }}
      >
        <GridComponent
          id="Grid"
          dataSource={data}
          allowResizing={true}
          autoFit={true}
          allowPaging={true}
          pageSettings={pageSettings}
          allowSorting={true}
          sortSettings={sortingOptions}
          allowGrouping={true}
          groupSettings={groupOptions}
          toolbar={toolbar}
          allowExcelExport={true}
          toolbarClick={toolbarClick}
          excelExportComplete={excelExportComplete}
          ref={(g: GridComponent | null) => {
            gridRef.current = g;
          }}
          created={created}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="salesPersonCode"
              headerText="SalesPerson"
              width="150"
              textAlign="Left"
            />
            <ColumnDirective
              field="customerId"
              headerText="CustomerId"
              width="150"
              textAlign="Left"
            />
            <ColumnDirective
              field="customerName"
              headerText="CustomerName"
              width="150"
              textAlign="Left"
            />
            <ColumnDirective
              field="customerAddress"
              headerText="Address"
              width="150"
              textAlign="Left"
            />
            <ColumnDirective
              field="transDate"
              headerText="Date"
              width="150"
              textAlign="Left"
            />
          </ColumnsDirective>
          <Inject
            services={[
              Page,
              Sort,
              Filter,
              Group,
              Resize,
              Toolbar,
              ExcelExport,
              Search,
            ]}
          />
        </GridComponent>
      </Box>
    </Box>
  );
};

export default MerchandiserReportByDateRangeScreen;
