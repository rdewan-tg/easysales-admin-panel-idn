import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  Slide,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
import { useOrderStore } from "..";
import { useEffect, useRef, useState } from "react";
import {
  ColumnDirective,
  ColumnsDirective,
  ExcelExport,
  GridComponent,
  Inject,
  Page,
  PageSettingsModel,
  Resize,
  Search,
  SearchSettingsModel,
  Sort,
  ToolbarItems,
} from "@syncfusion/ej2-react-grids";

const SalesLineListScreen = () => {
  const [openErrorSnackbar, setOpenErrorSnackBar] = useState(false);

  const toolbar: ToolbarItems[] = ["Search"];
  const pageSettings: PageSettingsModel = { pageSize: 50 };
  const searchSettings: SearchSettingsModel = { ignoreCase: true };
  const gridRef = useRef<GridComponent | null>(null);

  const isLoading = useOrderStore((state) => state.isLoading);
  const errorMessage = useOrderStore((state) => state.error);
  const salesLines = useOrderStore((state) => state.salesLines);
  const getSalesLinesByCompany = useOrderStore.use.getSalesLinesByCompany();

  useEffect(() => {
    const fetchSalesLines = async () => {
      await getSalesLinesByCompany();
    };
    fetchSalesLines();
  }, []);

  // Add event listener for automatic search on each keystroke
  const gridCreated = () => {
    if (gridRef.current) {
      // Get the search bar element after a short delay to ensure it's rendered
      setTimeout(() => {
        const searchElement = document.getElementById(
          `${gridRef.current?.element.id}_searchbar`
        ) as HTMLInputElement;
        
        if (searchElement) {
          // Add input event listener to trigger search on each keystroke
          searchElement.addEventListener("input", (event) => {
            if (gridRef.current) {
              const searchValue = (event.target as HTMLInputElement).value;
              gridRef.current.search(searchValue);
            }
          });
        }
      }, 100);
    }
  };

  // observe error state and display error message
  useEffect(() => {
    if (errorMessage) {
      handleErrorSnackbarClick();
    }
  }, [errorMessage]);

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

      <GridComponent
        id="salesLineGrid"
        dataSource={salesLines}
        allowPaging={true}
        allowSorting={true}
        allowFiltering={false}
        allowExcelExport={true}
        allowResizing={true}
        toolbar={toolbar}
        pageSettings={pageSettings}
        searchSettings={searchSettings}
        ref={gridRef}
        created={gridCreated}
      >
        <ColumnsDirective>
          <ColumnDirective field="id" headerText="ID" width="80" />
          <ColumnDirective field="salesId" headerText="Sales ID" width="120" />
          <ColumnDirective field="lineId" headerText="Line ID" width="80" />
          <ColumnDirective field="productId" headerText="Product ID" width="120" />
          <ColumnDirective field="productName" headerText="Product Name" width="150" />
          <ColumnDirective field="productDescription" headerText="Description" width="200" />
          <ColumnDirective field="quantity" headerText="Quantity" width="100" />
          <ColumnDirective field="salesUnit" headerText="Unit" width="80" />
          <ColumnDirective field="salesPrice" headerText="Price" width="100" />
          <ColumnDirective field="lineAmount" headerText="Amount" width="100" />
          <ColumnDirective field="transactionDate" headerText="Transaction Date" width="120" format="yMd" />
        </ColumnsDirective>
        <Inject services={[Page, Sort, Search, Resize, ExcelExport]} />
      </GridComponent>

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

export default SalesLineListScreen;
