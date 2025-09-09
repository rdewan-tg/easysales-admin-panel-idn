import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
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
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const SalesHeaderListScreen = () => {
  const [openErrorSnackbar, setOpenErrorSnackBar] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const toolbar: ToolbarItems[] = ["Search"];
  const pageSettings: PageSettingsModel = { pageSize: 50 };
  const searchSettings: SearchSettingsModel = { ignoreCase: true };
  const gridRef = useRef<GridComponent | null>(null);

  const isLoading = useOrderStore((state) => state.isLoading);
  const errorMessage = useOrderStore((state) => state.error);
  const salesHeaders = useOrderStore((state) => state.salesHeaders);
  const getSalesHeadersByCompany = useOrderStore.use.getSalesHeadersByCompany();
  const deleteSalesHeader = useOrderStore.use.deleteSalesHeader();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [salesIdToDelete, setSalesIdToDelete] = useState<string>('');

  useEffect(() => {
    const fetchSalesHeaders = async () => {
      await getSalesHeadersByCompany();
    };
    fetchSalesHeaders();
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

  const handleDeleteClick = (salesId: string) => {
    setSalesIdToDelete(salesId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (salesIdToDelete) {
      await deleteSalesHeader(salesIdToDelete);
      setDeleteDialogOpen(false);
      setSalesIdToDelete('');
      // Show success message
      setSuccessMessage("Sales header deleted successfully");
      setOpenSuccessSnackbar(true);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSalesIdToDelete('');
  };

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

  const handleSuccessSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessSnackbar(false);
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
        id="salesHeaderGrid"
        dataSource={salesHeaders}
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
          <ColumnDirective field="customerName" headerText="Customer Name" width="150" />
          <ColumnDirective field="customerAddress" headerText="Address" width="200" />
          <ColumnDirective field="salesPersonId" headerText="Sales Person" width="120" />
          <ColumnDirective field="customerRequisition" headerText="Requisition" width="120" />
          <ColumnDirective field="deliveryDate" headerText="Delivery Date" width="120" format="yMd" />
          <ColumnDirective field="transactionDate" headerText="Transaction Date" width="120" format="yMd" />
          <ColumnDirective field="note" headerText="Note" width="150" />
          <ColumnDirective headerText="Actions" width="100" template={(props: any) => (
            <IconButton 
              color="error" 
              size="small" 
              onClick={() => handleDeleteClick(props.id)}
              aria-label="delete"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          )} />
        </ColumnsDirective>
        <Inject services={[Page, Sort, Search, Resize, ExcelExport]} />
      </GridComponent>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Delete"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this sales header? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={4000}
        TransitionComponent={Slide}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handleSuccessSnackbarClose}
      >
        <Alert
          onClose={handleSuccessSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>

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

export default SalesHeaderListScreen;
