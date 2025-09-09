import {
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useAreaStore } from "../";
import { useEffect, useRef } from "react";
import { AddLocation, RefreshOutlined } from "@mui/icons-material";
import { routeName } from "@/core/route";
import { useNavigate } from "react-router-dom";
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

const AreaListPage = () => {
  const navigate = useNavigate();
  const gridRef = useRef<GridComponent | null>(null);
  const isLoading = useAreaStore((state) => state.loading);
  const areas = useAreaStore((state) => state.areas);
  const getAreas = useAreaStore.use.getAreas();
  const updateArea = useAreaStore.use.updateArea();
  const deleteArea = useAreaStore.use.deleteArea();
  const isUpdated = useAreaStore((state) => state.isUpdated);
  const isDeleted = useAreaStore((state) => state.isDeleted);
  const error = useAreaStore((state) => state.error);

  const toolbar: ToolbarItems[] = [
    "Edit",
    "Delete",
    "Update",
    "Cancel",
    "Search",
  ];

  useEffect(() => {
    fetchAreas();
  }, []);

  async function fetchAreas() {
    getAreas();
  }

  const refreshAreas = () => {
    fetchAreas();
  };

  const toolbarClick = (args: any) => {
    if (gridRef.current && args.item.id === "edit") {
      gridRef.current.startEdit();
    }
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

  const navigateToCreateArea = () => {
    navigate(
      `/${routeName.dashboard}/${routeName.area}/${routeName.createArea}`
    );
  };

  const actionComplete = (args: any) => {
    // check if the request type is delete
    if (args.requestType === "delete") {
      const id = args.data[0].id;
      deleteArea(id);
    }
    if (args.requestType === "save") {
      const updatedData = args.data;
      updateArea(updatedData);
    }
  };


  return (
    <Box>
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
        <Box>
          <Tooltip title="Add Area">
            <IconButton
              color="primary"
              onClick={navigateToCreateArea}
              sx={{ mr: 1 }}
            >
              <AddLocation />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh">
            <IconButton color="primary" onClick={refreshAreas}>
              <RefreshOutlined />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box sx={{ height: "calc(100vh - 200px)", p: 2 }}>
        <GridComponent
          dataSource={areas}
          allowPaging={true}
          pageSettings={{ pageSize: 10 }}
          allowResizing={true}
          editSettings={{
            allowEditing: true,
            allowAdding: false,
            allowDeleting: true,
            showDeleteConfirmDialog: true,
            mode: "Normal",
          }}
          toolbar={toolbar}
          toolbarClick={toolbarClick}
          actionComplete={actionComplete}
          created={created}
          ref={(g: GridComponent | null) => {
            gridRef.current = g;
          }}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="id"
              headerText="ID"
              width="50"
              isPrimaryKey={true}
              textAlign="Right"
            />
            <ColumnDirective
              field="name"
              headerText="Name"
              width="250"
              validationRules={{ required: true }}
            />
            <ColumnDirective
              field="code"
              headerText="Code"
              width="150"
              validationRules={{ required: true }}
            />
          </ColumnsDirective>
          <Inject services={[Page, Toolbar, Edit, CommandColumn]} />
        </GridComponent>
      </Box>
      <NotificationSnackbar
        isUpdated={!!isUpdated}
        isDeleted={!!isDeleted}
        updateMessage="Area updated successfully"
        deleteMessage="Area deleted successfully"
        error={error || undefined}
      />
    </Box>
  );
};

export default AreaListPage;
