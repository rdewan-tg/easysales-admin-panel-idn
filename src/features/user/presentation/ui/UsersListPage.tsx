import {
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  SnackbarCloseReason,
  Tooltip,
  Chip,
  Stack,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import useUserStore from "../store/user-store";
import { PersonAdd, RefreshOutlined, FileDownload } from "@mui/icons-material";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import { BaseSnackBarComponent } from "../../../../common/components";
import { routeName } from "@/core/route";

import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
  Page,
  PageSettingsModel,
  Resize,
  RowSelectEventArgs,
  SelectionSettingsModel,
  Sort,
  SortSettingsModel,
  Toolbar,
  ToolbarItems,
} from "@syncfusion/ej2-react-grids";

// Template function for rendering role chips in the grid
function roleChipsTemplate(props: any) {
  // Based on the actual data structure provided
  const roles = props?.roles || [];

  if (!roles || !Array.isArray(roles) || roles.length === 0) {
    return <span style={{ color: "#666" }}>No roles</span>;
  }

  return (
    <Stack direction="row" spacing={0.5} flexWrap="wrap">
      {roles.map((roleItem, index) => {
        // Extract the role object from the structure
        const role = roleItem.role;
        if (!role) return null;

        return (
          <Chip
            key={role.id || index}
            label={role.name || "Unknown"}
            size="small"
            variant="outlined"
            color="success"
            sx={{
              borderRadius: 3,
              fontSize: "0.7rem",
              height: 22,
              "& .MuiChip-label": {
                px: 1,
              },
            }}
          />
        );
      })}
    </Stack>
  );

}

// Template function for rendering role chips in the grid
function areaChipsTemplate(props: any) {
  // Based on the actual data structure provided
  const areas = props?.userAreas || [];

  if (!areas || !Array.isArray(areas) || areas.length === 0) {
    return <span style={{ color: "#666" }}>-</span>;
  }

  return (
    <Stack direction="row" spacing={0.5} flexWrap="wrap">
      {areas.map((areaItem, index) => {
        // Extract the role object from the structure
        const area = areaItem.area;
        if (!area) return null;

        return (
          <Chip
            key={area.id || index}
            label={area.name || "Unknown"}
            size="small"
            variant="outlined"
            color="success"
            sx={{
              borderRadius: 3,
              fontSize: "0.7rem",
              height: 22,
              "& .MuiChip-label": {
                px: 1,
              },
            }}
          />
        );
      })}
    </Stack>
  );

}

const UsersListPage = () => {
  const navigate = useNavigate();
  const gridRef = useRef<GridComponent | null>(null);
  const selectionSettings: SelectionSettingsModel = {
    mode: "Row",
    type: "Single",
  };
  const toolbarOptions: ToolbarItems[] = ["Search"];
  const pageSettings: PageSettingsModel = { pageSize: 100 };
  const sortSettings: SortSettingsModel = {
    columns: [{ field: "name", direction: "Ascending" }],
  };

  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const deleteSnackbarOpen = useUserStore((state) => state.deleteSnackbarOpen);
  const setDeleteMemberSnackbarOpen =
    useUserStore.use.setDeleteUserSnackbarOpen();

  const isLoading = useUserStore((state) => state.isLoading);
  const isUserDeleted = useUserStore((state) => state.isUserDeleted);
  const users = useUserStore((state) => state.users);
  const errorMessage = useUserStore((state) => state.error);

  const getUsersByCompany = useUserStore.use.getUsersByCompany();

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

  useEffect(() => {
    // fetch members when the component mounts
    const fetchMembers = async () => {
      if (!isLoading && users.length === 0) {
        // Check if it's already loading or data exists
        await getUsersByCompany();
      }
    };
    fetchMembers();
  });

  useEffect(() => {
    // check if member is deleted
    if (isUserDeleted) {
      setDeleteMemberSnackbarOpen(true);
    }
  }, [isUserDeleted]);

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
    setDeleteMemberSnackbarOpen(false);
  };

  // observe error state and display error message
  useEffect(() => {
    if (errorMessage) {
      handleErrorSnackbarOpen();
    }
  }, [errorMessage]);

  const rowSelected = (args: RowSelectEventArgs) => {
    console.log(args.data);
    if (!args.data) {
      return;
    }
    navigateToUserDetails((args.data as any)["id"]);
  };

  const navigateToUserDetails = (id: number) => {
    // navigate to the member details page
    navigate(`/${routeName.dashboard}/${routeName.users}/${id}`);
  };

  const navigateToCreateUser = () => {
    navigate(
      `/${routeName.dashboard}/${routeName.users}/${routeName.createUser}`
    );
  };

  // Function to export users data to Excel
  const exportToExcel = () => {
    if (!users || users.length === 0) {
      // Show error if no data to export
      handleErrorSnackbarOpen();
      return;
    }

    // Format the data for Excel export
    const exportData = users.map((user) => {
      // Extract roles from the user object
      const roleNames = user.roles
        ? user.roles
            .map((roleObj: any) => {
              // Based on the actual structure from the sample data
              return roleObj.role?.name || "Unknown";
            })
            .join(", ")
        : "N/A";

      // Get company name and timezone
      const companyId = user.company.id;
      const companyName = user.company?.name || "N/A";
      const timeZone = user.company?.companySetting?.timeZone || "N/A";

      return {
        ID: user.id,
        Name: user.name,
        Email: user.email,
        Phone: user.phoneNumber || "N/A",
        CompanyId: companyId,
        Company: companyName,
        Roles: roleNames,
        TimeZone: timeZone,
      };
    });

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    // Generate Excel file and trigger download
    const currentDate = new Date().toISOString().split("T")[0];
    XLSX.writeFile(workbook, `Users_List_${currentDate}.xlsx`);
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: { xs: "8px", sm: "12px", md: "16px" },
          flexWrap: "wrap",
          gap: 1,
          width: "100%",
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        <Tooltip title="Refresh">
          <IconButton color="primary" onClick={getUsersByCompany}>
            <RefreshOutlined />
          </IconButton>
        </Tooltip>

        <Tooltip title="Export to Excel">
          <IconButton color="primary" onClick={exportToExcel}>
            <FileDownload />
          </IconButton>
        </Tooltip>

        <Tooltip title="Add User">
          <IconButton color="primary" onClick={navigateToCreateUser}>
            <PersonAdd />
          </IconButton>
        </Tooltip>
      </Box>

      <Box
        sx={{
          height: "80vh", // Fixed height for the grid container
          overflow: "auto", // or "scroll"
          p: 2,
        }}
      >
        <GridComponent
          dataSource={users}
          toolbar={toolbarOptions}
          allowPaging={true}
          allowResizing={true}
          selectionSettings={selectionSettings}
          pageSettings={pageSettings}
          allowSorting={true}
          sortSettings={sortSettings}
          rowSelected={rowSelected}
          created={created}
          ref={(g: GridComponent | null) => {
            gridRef.current = g;
          }}
        >
          <ColumnsDirective>
            <ColumnDirective field="id" headerText="Id" width={80} />
            <ColumnDirective field="name" headerText="Name" />
            <ColumnDirective field="email" headerText="Email" />
            <ColumnDirective field="company.name" headerText="Company" />
            <ColumnDirective
              field="roles"
              headerText="Roles"
              width={200}
              template={roleChipsTemplate}
              textAlign="Left"
              clipMode="EllipsisWithTooltip"
            />
            <ColumnDirective
              field="userAreas"
              headerText="Areas"
              width={200}
              template={areaChipsTemplate}
              textAlign="Left"
              clipMode="EllipsisWithTooltip"
            />
          </ColumnsDirective>
          <Inject services={[Page, Sort, Toolbar, Resize]} />
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

      {/* Display member deleted message */}
      {isUserDeleted && (
        <BaseSnackBarComponent
          message="User deleted successfully"
          severity="success"
          open={deleteSnackbarOpen}
          onClose={handleSnackbarClose}
        />
      )}
    </Box>
  );
};

export default UsersListPage;
