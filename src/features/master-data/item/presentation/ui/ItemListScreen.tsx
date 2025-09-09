import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  Slide,
  Snackbar,
  SnackbarCloseReason,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useItemStore } from "..";
import {
  ColumnDirective,
  ColumnsDirective,
  Resize,
  Toolbar,
  Filter,
  GridComponent,
  Group,
  Inject,
  Page,
  PageSettingsModel,
  Sort,
  ToolbarItems,
  ExcelExport,
  Search,
} from "@syncfusion/ej2-react-grids";
import { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetCustomerForm, getCustomerSchema } from "@/common/types";
import LoadingButton from "@mui/lab/LoadingButton";
import { SendOutlined, CloudDownload } from "@mui/icons-material";
import { useCompanyStore } from "@/features/company/presentation";
import { ClickEventArgs } from "@syncfusion/ej2-react-navigations";
//import { DevTool } from "@hookform/devtools";

const ItemListScreen = () => {
  const [openErrorSnackbar, setOpenErrorSnackBar] = useState(false);
  const pageSettings: PageSettingsModel = { pageSize: 15 };
  const gridRef = useRef<GridComponent | null>(null);
  const toolbar: ToolbarItems[] = ["ExcelExport", "Search"];

  const isLoading = useItemStore((state) => state.isLoading);
  const errorMessage = useItemStore((state) => state.error);
  const items = useItemStore((state) => state.items);
  const getItems = useItemStore.use.getItems();
  const importFromAzureDb = useItemStore.use.importFromAzureDb();

  const companies = useCompanyStore((state) => state.companies);
  const getCompanies = useCompanyStore.use.getCompanies();

  const created = () => {
    (
      document.getElementById(
        (gridRef.current as GridComponent).element.id + "_searchbar",
      ) as HTMLElement
    ).addEventListener("keyup", (event) => {
      (gridRef.current as GridComponent).search(
        (event.target as HTMLInputElement).value,
      );
    });
  };

  const toolbarClick = (args: ClickEventArgs) => {
    if (gridRef.current && args.item.id === "Grid_excelexport") {
      gridRef.current.showSpinner();
      gridRef.current.excelExport({ fileName: "Items.xlsx" });
    }
  };

  const excelExportComplete = (): void => {
    if (gridRef.current) {
      gridRef.current.hideSpinner();
    }
  };

  const form = useForm<GetCustomerForm>({
    resolver: zodResolver(getCustomerSchema),
  });

  // destructure form
  const { handleSubmit, formState, control } = form;
  // destructure formState
  const { errors, isSubmitting, isValid } = formState;

  const onSubmit: SubmitHandler<GetCustomerForm> = async (
    data: GetCustomerForm,
  ) => {
    await getItems(data.companyCode);
  };

  // observe error state and display error message
  useEffect(() => {
    if (errorMessage) {
      handleErrorSnackbarClick();
    }
  }, [errorMessage]);

  useEffect(() => {
    async function fetchCompanies() {
      await getCompanies();
    }

    fetchCompanies();
  }, []);

  const handleErrorSnackbarClick = () => {
    setOpenErrorSnackBar(true);
  };

  const handleErrorSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
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

      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "block",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Controller
          name="companyCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="company-code"
              select
              label="Company Code"
              defaultValue=""
              variant="outlined"
              size="small"
              error={!!errors.companyCode}
              helperText={errors.companyCode?.message}
              sx={{ minWidth: 200, marginRight: 2 }}
            >
              {companies.map((company) => (
                <MenuItem
                  key={company.companyCode}
                  value={company.companyCode}
                >
                  {company.companyCode} - {company.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <LoadingButton
          type="submit"
          variant="contained"
          loading={isSubmitting}
          loadingPosition="start"
          startIcon={<SendOutlined />}
          disabled={!isValid}
          sx={{ marginRight: 2 }}
        >
          Submit
        </LoadingButton>
        
        <Button
          variant="contained"
          color="primary"
          startIcon={<CloudDownload />}
          onClick={() => importFromAzureDb()}
          sx={{
            backgroundColor: 'primary.main',
            borderRadius: '8px',
            textTransform: 'none',
            boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
            '&:hover': {
              backgroundColor: 'primary.dark',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
            }
          }}
        >
          Refresh from Azure
        </Button>
      </Box>

      <Box
        sx={{
          marginTop: "16px",
        }}
      >
        <GridComponent
          id="Grid"
          dataSource={items}
          allowResizing={true}
          autoFit={true}
          allowPaging={true}
          pageSettings={pageSettings}
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
              field="id"
              headerText="Id"
              minWidth="50"
              width="70"
              maxWidth="100"
              textAlign="Left"
            />
            <ColumnDirective
              field="productId"
              headerText="ProductId"
              width="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="itemId"
              headerText="ItemId"
              width="150"
              textAlign="Left"
            />
            <ColumnDirective
              field="productName"
              headerText="ProductName"
              width="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="description"
              headerText="Description"
              width="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="category"
              headerText="Category"
              minWidth="100"
              width="150"
              maxWidth="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="barcode"
              headerText="Barcode"
              minWidth="100"
              width="150"
              maxWidth="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="itemGroup"
              headerText="ItemGroup"
              minWidth="100"
              width="150"
              maxWidth="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="packing"
              headerText="Packing"
              minWidth="100"
              width="150"
              maxWidth="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="salesUnit"
              headerText="SalesUnit"
              minWidth="100"
              width="150"
              maxWidth="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="unitPrice"
              headerText="UnitPrice"
              minWidth="100"
              width="150"
              maxWidth="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="image"
              headerText="Image"
              minWidth="100"
              width="150"
              maxWidth="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="itemDiscountGroup"
              headerText="ItemDiscountGroup"
              minWidth="100"
              width="150"
              maxWidth="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="itemFOCGroup"
              headerText="ItemFOCGroup"
              minWidth="100"
              width="150"
              maxWidth="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="inventDimId"
              headerText="InventDimId"
              minWidth="100"
              width="150"
              maxWidth="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="status"
              headerText="Status"
              minWidth="100"
              width="150"
              maxWidth="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="companyCode"
              headerText="CompanyCode"
              minWidth="50"
              width="70"
              maxWidth="100"
              textAlign="Left"
            />
            <ColumnDirective
              field="companyId"
              headerText="companyId"
              minWidth="50"
              width="80"
              textAlign="Left"
            />
            <ColumnDirective
              field="createAt"
              headerText="createAt"
              textAlign="Left"
            />
            <ColumnDirective
              field="updatedAt"
              headerText="updatedAt"
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

export default ItemListScreen;
