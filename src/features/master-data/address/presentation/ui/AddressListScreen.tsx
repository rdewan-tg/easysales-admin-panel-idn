import Box from "@mui/material/Box";
import { useCustomerAddressStore } from "..";
import { useEffect, useRef, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SendOutlined, CloudDownload } from "@mui/icons-material";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetCustomerForm, getCustomerSchema } from "@/common/types";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import { Slide, Alert, Button, MenuItem } from "@mui/material";
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
import { useCompanyStore } from "@/features/company/presentation";
import { ClickEventArgs } from "@syncfusion/ej2-react-navigations";

const AddressListScreen = () => {
  const [openErrorSnackbar, setOpenErrorSnackBar] = useState(false);
  const pageSettings: PageSettingsModel = { pageSize: 20 };
  const gridRef = useRef<GridComponent | null>(null);
  const toolbar: ToolbarItems[] = ["ExcelExport", "Search"];

  const isLoading = useCustomerAddressStore((state) => state.isLoading);
  const addresses = useCustomerAddressStore((state) => state.addresses);
  const errorMessage = useCustomerAddressStore((state) => state.error);
  const getCustomerAddress = useCustomerAddressStore.use.getCustomerAddress();
  const importFromAzureDb = useCustomerAddressStore.use.importFromAzureDb();

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
      gridRef.current.excelExport({ fileName: "Addresses.xlsx" });
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
  // destructure the form object
  const {
    control,
    formState: { errors, isSubmitting, isValid }, // destructure formState
    handleSubmit,
  } = form;

  // when the form is submitted- get the customer address
  const onSubmit: SubmitHandler<GetCustomerForm> = async (
    data: GetCustomerForm,
  ) => {
    await getCustomerAddress(data.companyCode);
  };

  // when the component mounts- get the companies
  useEffect(() => {
    async function fetchCompanies() {
      await getCompanies();
    }

    fetchCompanies();
  }, []);

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

      {/* Display addresses in a table */}
      <Box
        sx={{
          marginTop: "16px",
        }}
      >
        <GridComponent
          id="Grid"
          dataSource={addresses}
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
              field="customerId"
              headerText="CustomerId"
              minWidth="100"
              width="150"
              maxWidth="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="address"
              headerText="Address"
              minWidth="100"
              width="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="salesPersonId"
              headerText="SalesPersonId"
              format="C2"
              textAlign="Left"
            />
            <ColumnDirective
              field="latitude"
              headerText="Latitude"
              minWidth="100"
              width="150"
              maxWidth="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="longitude"
              headerText="longitude"
              minWidth="100"
              width="150"
              maxWidth="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="deliveryName"
              headerText="DeliveryName"
              minWidth="100"
              width="150"
              maxWidth="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="postalAddress"
              headerText="PostalAddress"
              minWidth="100"
              width="150"
              maxWidth="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="location"
              headerText="Location"
              minWidth="100"
              width="150"
              maxWidth="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="isPrimary"
              headerText="Primary"
              minWidth="100"
              width="150"
              maxWidth="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="companyId"
              headerText="CompanyId"
              minWidth="50"
              width="70"
              maxWidth="100"
              textAlign="Left"
            />
            <ColumnDirective
              field="companyCode"
              headerText="CompanyCode"
              minWidth="50"
              width="80"
              textAlign="Left"
            />
            <ColumnDirective
              field="createAt"
              headerText="CreateAt"
              textAlign="Left"
            />
            <ColumnDirective
              field="updatedAt"
              headerText="UpdatedAt"
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

export default AddressListScreen;
