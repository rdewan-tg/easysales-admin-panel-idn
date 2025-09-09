import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  Slide,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
import { useActivityLogStore } from "..";
import {
  ColumnDirective,
  ColumnsDirective,
  Resize,
  Toolbar,
  Inject,
  Page,
  Sort,
  Search,
  SearchSettingsModel,
  ToolbarItems,
  GridComponent,
  PageSettingsModel,
} from "@syncfusion/ej2-react-grids";
import { useEffect, useRef, useState } from "react";

function ActivityLogScreen(this: any) {
  const [openErrorSnackbar, setOpenErrorSnackBar] = useState(false);
  const gridRef = useRef<GridComponent | null>(null);

  const isLoading = useActivityLogStore((state) => state.isLoading);
  const errorMessage = useActivityLogStore((state) => state.error);
  const logs = useActivityLogStore((state) => state.logs);
  const getActivityLogs = useActivityLogStore.use.getActivityLogs();

  const pageSettings: PageSettingsModel = {
    pageSize: 100,
    currentPage: 1,
    pageCount: 4,
    totalRecordsCount: 400,
  };


  // Add created event handler to implement real-time search
  const created = () => {
    const searchElement = document.getElementById(
      (gridRef.current as GridComponent).element.id + "_searchbar"
    ) as HTMLElement;

    if (searchElement) {
      searchElement.addEventListener("keyup", (event) => {
        const searchValue = (event.target as HTMLInputElement).value;
        // Force search even with a single character
        (gridRef.current as GridComponent).search(searchValue);
      });
    }
  };


  // observe error state and display error message
  useEffect(() => {
    if (errorMessage) {
      handleErrorSnackbarClick();
    }
  }, [errorMessage]);

  useEffect(() => {
    async function fetchActivityLogs() {
      await getActivityLogs(1, 100);
    }

    fetchActivityLogs();
  }, []);

  const handleErrorSnackbarClick = () => {
    setOpenErrorSnackBar(true);
  };

  const handleErrorSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    // do not close the snackbar if the reason is 'clickaway'
    if (reason === "clickaway") {
      return;
    }

    setOpenErrorSnackBar(false);
  };

  // Configure search settings
  const searchSettings: SearchSettingsModel = {
    fields: ["id", "userId", "action", "level", "details", "timestamp"],
    operator: "contains",
    ignoreCase: true,
    key: "",
  };

  // Configure toolbar with search
  const toolbarOptions: ToolbarItems[] = ["Search"];

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

      <Box
        sx={{
          height: "80vh", // Fixed height for the grid container
          overflow: "auto", // or "scroll"
          p: 2,
        }}
      >
        <GridComponent
          dataSource={logs}
          toolbar={toolbarOptions}
          allowPaging={true}
          allowResizing={true}
          pageSettings={pageSettings}
          allowSorting={true}
          created={created}
          searchSettings={searchSettings}
          ref={(g: GridComponent | null) => {
            gridRef.current = g;
          }} 
        >
          <ColumnsDirective>
            <ColumnDirective
              field="id"
              headerText="Id"
              width={100}
              allowResizing={true}
            />
            <ColumnDirective
              field="userId"
              headerText="UserId"
              width={100}
              allowResizing={true}
            />
            <ColumnDirective
              field="action"
              headerText="Action"
              width={150}
              allowResizing={true}
            />
            <ColumnDirective
              field="level"
              headerText="Level"
              width={100}
              allowResizing={true}
            />
            <ColumnDirective
              field="details"
              headerText="Details"
              width={300}
              allowResizing={true}
            />
            <ColumnDirective
              field="timestamp"
              headerText="Timestamp"
              width={200}
              allowResizing={true}
            />
          </ColumnsDirective>
          <Inject services={[Page, Sort, Toolbar, Resize, Search]} />
        </GridComponent>
      </Box>

      {/* Display global error */}
      {errorMessage && (
        <Snackbar
          open={openErrorSnackbar}
          autoHideDuration={6000}
          TransitionComponent={Slide}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={handleErrorSnackbarClose}
        >
          <Alert
            onClose={handleErrorSnackbarClose}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default ActivityLogScreen;
