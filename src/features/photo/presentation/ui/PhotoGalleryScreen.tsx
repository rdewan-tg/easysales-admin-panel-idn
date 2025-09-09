import { useCallback, useEffect, useState } from "react";
import { usePhotoStore } from "..";
import {
  Box,
  Backdrop,
  CircularProgress,
  Chip,
  Typography,
} from "@mui/material";
import LightGallery from "lightgallery/react";

// LIGHT GALLERY
// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import FilterPhotoDialogForm from "./components/FilterPhotoDialogForm";
import { PhotoFilterEnum } from "@/common/enum/photo-filter-enum";
import PhotoFilterByDate from "./components/PhotoFilterByDate";

const PhotoGalleryScreen = () => {
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [openFilterByDateDialog, setOpenFilterByDateDialog] = useState(false);
  const [filterType, setFilterType] = useState(PhotoFilterEnum.byDeviceAndDate);

  const getDevices = usePhotoStore.use.getDevices();
  const getCustomerChains = usePhotoStore.use.getCustomerChains();
  const photos = usePhotoStore((state) => state.photos);

  const isLoading = usePhotoStore((state) => state.isLoading);

  useEffect(() => {
    // fetch devices when the component mounts
    async function fetchDevices() {
      getDevices();
    }
    // fetch the customer chains
    async function fetchCustomerChains() {
      getCustomerChains();
    }

    fetchDevices();
    fetchCustomerChains();
  }, []);

  const handleClickOpen = (type: PhotoFilterEnum) => {
    setOpenFilterDialog(true);
    setFilterType(type);
  };

  const handleClose = () => {
    setOpenFilterDialog(false);
  };

  const handleClickOpenFilterByDate = () => {
    setOpenFilterByDateDialog(true);
  };

  const handleCloseFilterByDate = () => {
    setOpenFilterByDateDialog(false);
  };

  const renderPhotos = useCallback(() => {
    return photos.map((item) => {
      return (
        <Box
          key={item.id}
          className="gallery-item"
          data-src={item.photo}
          data-sub-html={`<div class='lightGallery-captions'>
                            <h4>${item.deviceId}-${item.customerName}</h4> 
                            <p>${item.customerAddress}</p>
                            <p>${item.transDate}</p>
                        </div>
                        `}
        >
          <img
            src={item.photo}
            style={{
              width: "100%",
              height: "auto",
              alignItems: "center",
              justifyContent: "center",
            }}
          />

          <Box sx={{ padding: 1, textAlign: "center" }}>
            <Typography variant="subtitle1" component="div">
              {item.deviceId} : {item.transDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.customerName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {item.customerAddress}
            </Typography>
          </Box>
        </Box>
      );
    });
  }, [photos]);

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
      {/* open a filter dialog */}
      <PhotoFilterByDate
        open={openFilterByDateDialog}
        close={handleCloseFilterByDate}
        title=""
        description=""
      />
      {/* open a filter dialog */}
      <FilterPhotoDialogForm
        open={openFilterDialog}
        close={handleClose}
        title="Select Filters"
        description="Choose the filter options to filter the photos"
        type={filterType}
      />
      {/* show a loading indicator if the data is still loading */}
      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}

      <Box sx={{ marginLeft: 1, marginTop: 1 }}>
        <Typography variant="body1">Filter Option:</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <Chip
          label="Device & Date"
          color="secondary"
          size="small"
          sx={{ margin: 1 }}
          onClick={() => handleClickOpen(PhotoFilterEnum.byDeviceAndDate)}
        />
        <Chip
          label="From & To Date"
          color="secondary"
          size="small"
          sx={{ margin: 1 }}
          onClick={handleClickOpenFilterByDate}
        />
        <Chip
          label="Customer Chain"
          color="secondary"
          size="small"
          sx={{ margin: 1 }}
          onClick={() =>
            handleClickOpen(PhotoFilterEnum.byCustomerChainAndDate)
          }
        />
      </Box>

      <LightGallery
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
        zoom={true}
        rotate={true}
        thumbnail={true}
        elementClassNames="gallery-container"
        appendSubHtmlTo={".lg-item"}
        slideDelay={400}
        thumbWidth={130}
        thumbHeight={"100px"}
        mobileSettings={{
          controls: false,
          showCloseIcon: false,
          download: false,
          rotate: false,
        }}
      >
        {renderPhotos()}
      </LightGallery>
    </Box>
  );
};

export default PhotoGalleryScreen;
