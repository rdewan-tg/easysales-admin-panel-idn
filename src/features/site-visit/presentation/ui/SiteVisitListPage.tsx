import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Inject,
  Sort,
  Filter,
  Toolbar,
  GroupSettingsModel,
  Resize,
  Group,
} from "@syncfusion/ej2-react-grids";
import { useSiteVisitStore } from "../index";
import { useEffect, useRef, useState, MouseEvent } from "react";
import { NotificationSnackbar } from "@/common/components";
import { format } from "date-fns";
import {
  CalendarMonth,
  DownloadOutlined,
  FilterAlt,
  LocationOnOutlined,
  RefreshOutlined,
} from "@mui/icons-material";
import * as XLSX from "xlsx";
import FilterByDate from "./components/FilterByDate";

const SiteVisitListPage = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDateFilter, setOpenDateFilter] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  const gridRef = useRef<GridComponent | null>(null);
  const isLoading = useSiteVisitStore((state) => state.isLoading);
  const error = useSiteVisitStore((state) => state.error);
  const siteVisits = useSiteVisitStore((state) => state.siteVisits);
  const getSiteVisits = useSiteVisitStore.use.getSiteVisits();

  async function fetchSiteVisits() {
    const fromDate = format(new Date(), "yyyy-MM-dd");
    const toDate = format(new Date(), "yyyy-MM-dd");
    await getSiteVisits(fromDate, toDate);
  }

  useEffect(() => {
    fetchSiteVisits();
  }, []);

  // Setup search functionality when grid is created
  const handleGridCreated = () => {
    if (gridRef.current && gridRef.current.element) {
      const searchElement = document.getElementById(
        gridRef.current.element.id + "_searchbar"
      ) as HTMLElement;

      if (searchElement) {
        searchElement.addEventListener("keyup", (event) => {
          (gridRef.current as GridComponent).search(
            (event.target as HTMLInputElement).value
          );
        });
      }
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

  // Template for map link
  const mapTemplate = (props: any) => (
    <IconButton
      size="small"
      color="error"
      onClick={(e) => {
        e.stopPropagation();
        // open Google Maps with marker and zoom
        const zoom = 20;
        window.open(
          `https://www.google.com/maps?q=${props.customerLatitude},${props.customerLongitude}&z=${zoom}`,
          "_blank"
        );
      }}
    >
      <LocationOnOutlined fontSize="small" />
    </IconButton>
  );

  const groupOptions: GroupSettingsModel = {
    columns: ["salesPersonName"],
  };

  
  // Function to export data to Excel
  const exportToExcel = () => {
    if (!siteVisits || siteVisits.length === 0) {
      // You could show a notification here that there's no data to export
      return;
    }

    try {
      // Prepare the data for export - remove any fields you don't want to include
      const exportData = siteVisits.map(visit => ({
        ID: visit.id,
        'Device ID': visit.deviceId,
        'Sales Person': visit.salesPersonName,
        'Sales Person Code': visit.salesPersonCode,
        'Customer Name': visit.customerName,
        'Address': visit.customerAddress,
        'Customer Chain': visit.customerChain,
        'Time In': visit.timeIn,
        'Time Out': visit.timeOut,
        'Duration (min)': visit.durationInOutlet,
        'Latitude': visit.customerLatitude,
        'Longitude': visit.customerLongitude,
        // Add any other fields you want to include
      }));

      // Create a worksheet
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      
      // Create a workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Site Visits');
      
      // Generate file name with current date
      const fileName = `site_visits_${format(new Date(), 'yyyy-MM-dd')}.xlsx`;
      
      // Write the file and trigger download
      XLSX.writeFile(workbook, fileName);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      // You could show an error notification here
    }
  };

  return (
    <Box
      component={"main"}
      sx={{
        position: "relative",
        height: "100%", // Changed from 100vh to 100%
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        width: "100%",
        m: 0,
        p: 0,
        overflow: "hidden",
        minHeight: 0, // Prevent flex items from expanding beyond container
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

      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "flex-end", md: "flex-end" },
          alignItems: "center",
          flexWrap: "wrap",
          gap: { xs: 1, sm: 1.5 },
          p: { xs: 1, sm: 1.5 },
          width: "100%",
          mb: 1,
          position: "relative",
          maxWidth: "100%",
          overflow: "visible",
        }}
      >
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
                await fetchSiteVisits();
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

        {/* Refresh button at the end */}
        <Tooltip title="Export To Excel">
          <IconButton
            color="primary"
            onClick={exportToExcel}
            sx={{
              backgroundColor: "rgba(25, 118, 210, 0.08)",
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: "rgba(25, 118, 210, 0.12)",
              },
            }}
            title="Export To Excel"
          >
            <DownloadOutlined />
          </IconButton>
        </Tooltip>

        {/* Refresh button at the end */}
        <Tooltip title="Refresh">
          <IconButton
            color="primary"
            onClick={async () => {
              await fetchSiteVisits();
              setIsFiltered(false);
            }}
            sx={{
              backgroundColor: "rgba(25, 118, 210, 0.08)",
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: "rgba(25, 118, 210, 0.12)",
              },
            }}
            title="Refresh"
          >
            <RefreshOutlined />
          </IconButton>
        </Tooltip>

        {/* Date Filter Dialog */}
        <FilterByDate
          open={openDateFilter}
          close={handleCloseDateFilter}
          title="Filter Attendance by Date"
          description=""
          onFilter={async (fromDate, toDate) => {
            await getSiteVisits(fromDate, toDate);
            setIsFiltered(true);
          }}
        />
      </Box>

      {/* Site Visits Grid */}
      <Box sx={{ flex: 1, width: "100%", overflow: "auto" }}>
        <GridComponent
          id="siteVisitsGrid"
          dataSource={siteVisits}
          allowPaging={true}
          pageSettings={{ pageSize: 100 }}
          allowSorting={true}
          allowFiltering={true}
          filterSettings={{ type: "Excel" }}
          toolbar={["Search"]}
          allowGrouping={true}
          groupSettings={groupOptions}
          allowResizing={true}
          created={handleGridCreated}
          sortSettings={{
            columns: [
              { field: "id", direction: "Descending" },
              { field: "salesPersonName", direction: "Ascending" },
              { field: "customerName", direction: "Ascending" },
            ],
          }}
          ref={(g: GridComponent | null) => {
            gridRef.current = g;
          }}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="id"
              headerText="ID"
              width="70"
              textAlign="Right"
            />
            <ColumnDirective
              field="salesPersonName"
              headerText="Sales Person"
              width="150"
            />
            <ColumnDirective
              field="customerName"
              headerText="Customer Name"
              width="150"
            />
            <ColumnDirective
              field="customerAddress"
              headerText="Address"
              width="200"
            />
            <ColumnDirective
              field="timeIn"
              headerText="Time In"
              width="200"
              type="string"
            />
            <ColumnDirective
              field="timeOut"
              headerText="Time Out"
              width="200"
              type="string"
            />
            <ColumnDirective
              field="durationInOutlet"
              headerText="Duration (min)"
              width="120"
              textAlign="Right"
            />
            <ColumnDirective
              headerText="Location"
              width={130}
              template={mapTemplate}
            />
          </ColumnsDirective>
          <Inject services={[Page, Sort, Filter, Toolbar, Group, Resize]} />
        </GridComponent>
      </Box>
    </Box>
  );
};

export default SiteVisitListPage;
