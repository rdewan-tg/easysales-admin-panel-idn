import {
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  SnackbarCloseReason,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { UpdateDeviceSettingForm } from "@/common/types";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { BaseSnackBarComponent } from "../../../../common/components";
import { routeName } from "@/core/route";
import { useDeviceSettingStore } from "..";
import {
  ColumnDirective,
  ColumnsDirective,
  Resize,
  Toolbar,
  ToolbarItems,
  Filter,
  GridComponent,
  Group,
  Inject,
  Page,
  PageSettingsModel,
  Sort,
  Edit,
  SaveEventArgs,
  ExcelExport,
  Search,
} from "@syncfusion/ej2-react-grids";
import { L10n } from "@syncfusion/ej2-base";
import { ClickEventArgs } from "@syncfusion/ej2-react-navigations";
import { DeviceSetting } from "../../data";

L10n.load({
  "en-US": {
    grid: {
      OKButton: "YES",
      CancelButton: "Discard",
      ConfirmDelete: "Are you sure you want to delete the selected Record?",
    },
  },
});

const DeviceSettingListPage = () => {
  const navigate = useNavigate();

  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const isLoading = useDeviceSettingStore((state) => state.isLoading);
  const devices = useDeviceSettingStore((state) => state.devices);
  const errorMessage = useDeviceSettingStore((state) => state.error);
  const users = useDeviceSettingStore((state) => state.users);
  const getUsers = useDeviceSettingStore.use.getUsers();
  const findAll = useDeviceSettingStore.use.findAll();
  const deleteDevicesetting = useDeviceSettingStore.use.deleteDeviceSetting();
  const updateDeviceSetting = useDeviceSettingStore.use.updateDeviceSetting();

  const gridRef = useRef<GridComponent | null>(null);
  const editSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    showDeleteConfirmDialog: true,
  };
  const toolbar: ToolbarItems[] = [
    "Edit",
    "Delete",
    "Update",
    "Cancel",
    "ExcelExport",
    "Search",
  ];
  const userRules: Object = { required: true };
  const stringParams = {
    params: {
      showClearButton: true,
    },
  };

  const pageSettings: PageSettingsModel = { pageSize: 50 };

  // fetch userswhen the component mounts
  useEffect(() => {
    async function fetchUsers() {
      if (users.length === 0) {
        getUsers();
      }
    }
    fetchUsers();
  }, []);

  // fetch device setting when the component mounts
  useEffect(() => {
    // fetch members when the component mounts
    const fetchDeviceSettings = async () => {
      if (!isLoading && devices.length === 0) {
        // Check if it's already loading or data exists
        await findAll();
      }
    };
    fetchDeviceSettings();
  }, []);

  const handleErrorSnackbarOpen = () => {
    setOpenErrorSnackbar(true);
  };

  const handleSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    // do not close the snackbar if the reason is 'clickaway'
    if (reason === "clickaway") {
      return;
    }

    setOpenErrorSnackbar(false);
  };

  // observe error state and display error message
  useEffect(() => {
    if (errorMessage) {
      handleErrorSnackbarOpen();
    }
  }, [errorMessage]);

  const navigateToDeviceSetting = () => {
    navigate(
      `/${routeName.dashboard}/${routeName.deviceSetting}/${routeName.createdeviceSetting}`
    );
  };

  const handleDeleteDeviceSetting = (id: number) => {
    deleteDevicesetting(id);
  };

  const toolbarClick = (args: ClickEventArgs) => {
    if ((args.item as any).properties.text === "Delete") {
      const dialogObj = (gridRef.current as GridComponent).editModule.dialogObj;
      dialogObj.header = "Delete Confirmation Dialog";
      dialogObj.showCloseIcon = true;
    }
    if ((args.item as any).properties.text === "ExcelExport") {
      (gridRef.current as GridComponent).excelExport({
        fileName: "DeviceSettingList.xlsx",
      });
    }
  };
  const actionComplete = (args: SaveEventArgs) => {
    // check if the request type is delete
    if (args.requestType === "delete") {
      const data = args.data as DeviceSetting[];
      handleDeleteDeviceSetting(data[0].id);
    }
    // check if the request type is save
    if (args.requestType === "save") {
      const data = args.data as DeviceSetting;

      const setting: UpdateDeviceSettingForm = {
        id: data.id,
        deviceId: data.deviceId,
        userId: data.userId,
        salesPersonCode: data.salesPersonCode,
        orderNumberFormat: data.orderNumberFormat,
        userName: data.userName,
        companyId: data.companyId,
      };

      updateDeviceSetting(setting);
    }
  };

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

  return (
    <Box
      component={"main"}
      sx={{
        height: "100vh", // Full viewport height
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box", // Ensures padding is included in height/width
        m: 0,
        p: 0,
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
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginRight: "16px",
        }}
      >
        <IconButton color="primary" onClick={navigateToDeviceSetting}>
          <AddCircleOutlineOutlined />
        </IconButton>
      </Box>

      <Box
        sx={{
          marginTop: "16px",
        }}
      >
        <GridComponent
          ref={(g: GridComponent | null) => {
            gridRef.current = g;
          }}
          dataSource={devices}
          allowResizing={true}
          autoFit={true}
          toolbar={toolbar}
          editSettings={editSettings}
          allowPaging={true}
          allowSorting={true}
          allowMultiSorting={true}
          pageSettings={pageSettings}
          toolbarClick={toolbarClick}
          actionComplete={actionComplete}
          created={created}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="id"
              headerText="Id"
              width="70"
              textAlign="Left"
              isPrimaryKey={true}
            />
            <ColumnDirective
              field="deviceId"
              headerText="DeviceId"
              width="150"
              textAlign="Left"
              edit={stringParams}
            />
            <ColumnDirective
              field="userId"
              headerText="UserId"
              width="150"
              validationRules={userRules}
              textAlign="Left"
              allowEditing={false}
            />
            <ColumnDirective
              field="userName"
              headerText="UserName"
              textAlign="Left"
              allowEditing={false}
            />
            <ColumnDirective
              field="salesPersonCode"
              headerText="SalesPersonCode"
              width="150"
              textAlign="Left"
              edit={stringParams}
            />
            <ColumnDirective
              field="orderNumberFormat"
              headerText="OrderNumberFormat"
              width="150"
              textAlign="Left"
              edit={stringParams}
            />
            <ColumnDirective
              field="companyId"
              headerText="CompanyId"
              width="150"
              textAlign="Left"
              allowEditing={false}
            />
          </ColumnsDirective>
          <Inject
            services={[
              Edit,
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
        <BaseSnackBarComponent
          message={errorMessage}
          autoHideDuration={6000}
          severity="error"
          open={openErrorSnackbar}
          onClose={handleSnackbarClose}
        />
      )}
    </Box>
  );
};

export default DeviceSettingListPage;
