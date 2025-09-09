import {
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useCompanyStore } from "@/features/company/presentation/index";
import { useEffect, useRef } from "react";
import { AddBusinessOutlined, RefreshOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { routeName } from "@/core/route";
import { NotificationSnackbar } from "@/common/components";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
  Page,
  Toolbar,
  Edit,
  CommandColumn,
  ToolbarItems,
} from "@syncfusion/ej2-react-grids";

const CompanyListPage = () => {
  const navigate = useNavigate();
  const gridRef = useRef<GridComponent | null>(null);
  const isLoading = useCompanyStore((state) => state.isLoading);
  const companies = useCompanyStore((state) => state.companies);
  const getCompanies = useCompanyStore.use.getCompanies();
  const updateCompany = useCompanyStore.use.updateCompany();
  const deleteCompany = useCompanyStore.use.deleteCompany();
  const isUpdated = useCompanyStore((state) => state.isUpdated);
  const isDeleted = useCompanyStore((state) => state.isDeleted);
  const error = useCompanyStore((state) => state.error);

  const toolbar: ToolbarItems[] = [
    "Edit",
    "Delete",
    "Update",
    "Cancel",
    "Search",
  ];

  useEffect(() => {
    getCompanies();
  }, []);

  const navigateToCreateCompany = () => {
    navigate(
      `/${routeName.dashboard}/${routeName.companies}/${routeName.createCompany}`
    );
  };

  const handleRefresh = () => {
    getCompanies();
  };

  const toolbarClick = (args: any) => {
    if (gridRef.current && args.item.id.includes("edit")) {
      const selectedRecords = gridRef.current.getSelectedRecords();
      if (selectedRecords.length > 0) {
        gridRef.current.startEdit();
      }
    }
  };

  const actionComplete = (args: any) => {
    if (args.requestType === "save") {
      updateCompany(args.data);
    } else if (args.requestType === "delete") {
      deleteCompany(args.data[0].id);
    }
  };

  return (
    <Box
      component={"main"}
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
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
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4">Companies</Typography>
        <Box>
          <Tooltip title="Add Company">
            <IconButton
              color="primary"
              onClick={navigateToCreateCompany}
              sx={{ mr: 1 }}
            >
              <AddBusinessOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh">
            <IconButton color="primary" onClick={handleRefresh}>
              <RefreshOutlined />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        <GridComponent
          ref={gridRef}
          dataSource={companies}
          allowPaging={true}
          pageSettings={{ pageSize: 10 }}
          editSettings={{
            allowEditing: true,
            allowDeleting: true,
            mode: "Normal",
            showDeleteConfirmDialog: true,
          }}
          toolbar={toolbar}
          toolbarClick={toolbarClick}
          actionComplete={actionComplete}
          allowSorting={true}
          allowResizing={true}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="id"
              headerText="ID"
              width="80"
              isPrimaryKey={true}
              isIdentity={true}
              visible={true}
            />
            <ColumnDirective
              field="name"
              headerText="Name"
              width="150"
              validationRules={{ required: true }}
            />
            <ColumnDirective
              field="email"
              headerText="Email"
              width="200"
              validationRules={{ required: true, email: true }}
            />
            <ColumnDirective field="phone" headerText="Phone" width="150" />
            <ColumnDirective field="address" headerText="Address" width="200" />
            <ColumnDirective field="companyCode" headerText="Company Code" width="150" />
            <ColumnDirective field="companySetting.timeZone" headerText="Time Zone" width="150" />
            <ColumnDirective field="companySetting.currencyCode" headerText="Currency" width="150" />
            <ColumnDirective
              field="companySetting.isSiteVisitEnabled"
              headerText="Site Visit"
              width="150"
              type="boolean"
              displayAsCheckBox={true}
              editType="booleanedit"
            />
          </ColumnsDirective>
          <Inject services={[Page, Toolbar, Edit, CommandColumn]} />
        </GridComponent>
      </Box>
      <NotificationSnackbar
        isUpdated={!!isUpdated}
        isDeleted={!!isDeleted}
        updateMessage="Company updated successfully"
        deleteMessage="Company deleted successfully"
        error={error || undefined}
      />
    </Box>
  );
};

export default CompanyListPage;
