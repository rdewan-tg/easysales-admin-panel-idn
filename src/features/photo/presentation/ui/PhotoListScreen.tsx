import { Avatar, Box, Typography } from "@mui/material";
import { usePhotoStore } from "..";
import { useEffect } from "react";
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
} from "@syncfusion/ej2-react-grids";

const PhotoListScreen = () => {
  const pageSettings: PageSettingsModel = { pageSize: 6 };
  const toolbar: ToolbarItems[] = ["Add", "Edit", "Delete", "Update", "Cancel"];

  const getAllPhotos = usePhotoStore.use.getPhotos();
  const photos = usePhotoStore((state) => state.photos);

  useEffect(() => {
    async function fetchPhotos() {
      await getAllPhotos();
    }
    fetchPhotos();
  }, []);

  function gridTemplate(props: {
    photo: string | undefined;
    fileName: string | undefined;
  }): any {
    return (
      <Avatar
        alt={props.fileName}
        src={props.photo}
        sx={{ width: 72, height: 72 }}
      />
    );
  }

  const template: any = gridTemplate;

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
      <Typography variant="h3">Photo List</Typography>

      <GridComponent
        dataSource={photos}
        allowResizing={true}
        autoFit={true}
        allowPaging={true}
        pageSettings={pageSettings}
        toolbar={toolbar}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="deviceId"
            headerText="DeviceId"
            minWidth="100"
            width="150"
            maxWidth="200"
            textAlign="Left"
          />
          <ColumnDirective
            field="salesPersonCode"
            headerText="SalesPersonCode"
            minWidth="100"
            width="150"
            maxWidth="200"
            textAlign="Left"
          />
          <ColumnDirective
            field="userName"
            headerText="UserName"
            minWidth="100"
            width="150"
            maxWidth="200"
            textAlign="Right"
          />
          <ColumnDirective
            field="customerId"
            headerText="CustomerId"
            minWidth="100"
            width="150"
            maxWidth="200"
            format="C2"
            textAlign="Right"
          />
          <ColumnDirective
            field="photo"
            headerText="Photo"
            template={template}
            textAlign="Center"
          />
        </ColumnsDirective>
        <Inject services={[Page, Sort, Filter, Group, Resize, Toolbar]} />
      </GridComponent>
    </Box>
  );
};

export default PhotoListScreen;
