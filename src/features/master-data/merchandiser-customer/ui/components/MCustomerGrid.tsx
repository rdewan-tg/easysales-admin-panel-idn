import { Box } from "@mui/material";
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
  Search,
  SearchSettingsModel,
  Sort,
  ToolbarItems,
  ExcelExport,
} from "@syncfusion/ej2-react-grids";
import { useRef } from "react";

import { ClickEventArgs } from "@syncfusion/ej2-react-navigations";
import useMerchandiserCustomerStore from "../../state/merchandiser-customer-store";

const MCustomerGrid = () => {
  const gridRef = useRef<GridComponent | null>(null);
  const pageSettings: PageSettingsModel = { pageSize: 15 };
  const toolbar: ToolbarItems[] = ["Search", "ExcelExport"];
  const searchSettings: SearchSettingsModel = { ignoreCase: true };
  const customers = useMerchandiserCustomerStore((state) => state.mCustomers);
  

  const toolbarClick = (args: ClickEventArgs) => {
    if (gridRef.current && args.item.id === "Grid_excelexport") {
      gridRef.current.showSpinner();
      gridRef.current.excelExport({ fileName: "MerchandiserCustomers.xlsx" });
    }
  };

  const excelExportComplete = (): void => {
    if (gridRef.current) {
      gridRef.current.hideSpinner();
    }
  };

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

  return (
    <Box
      sx={{
        marginTop: "16px",
      }}
    >
      <GridComponent
        id="Grid"
        dataSource={customers}
        allowResizing={true}
        autoFit={true}
        allowPaging={true}
        pageSettings={pageSettings}
        toolbar={toolbar}
        searchSettings={searchSettings}
        allowExcelExport={true}
        toolbarClick={toolbarClick}
        excelExportComplete={excelExportComplete}
        created={gridCreated}
        ref={(g: GridComponent | null) => {
          gridRef.current = g;
        }}
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
            field="smMcId"
            headerText="smMcId"
            minWidth="100"
            width="200"
            textAlign="Left"
          />
          <ColumnDirective
            field="outletName"
            headerText="outletName"
            format="C2"
            textAlign="Left"
          />
          <ColumnDirective
            field="area"
            headerText="Area"
            minWidth="100"
            width="150"
            maxWidth="200"
            textAlign="Left"
          />
          <ColumnDirective
            field="district"
            headerText="District"
            minWidth="100"
            width="150"
            maxWidth="200"
            textAlign="Left"
          />
          <ColumnDirective
            field="roadName"
            headerText="RoadName"
            minWidth="100"
            width="150"
            maxWidth="200"
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
            Search,
            ExcelExport,
          ]}
        />
      </GridComponent>
    </Box>
  );
};

export default MCustomerGrid;


