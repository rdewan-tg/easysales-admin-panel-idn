import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  Slide,
  Snackbar,
  SnackbarCloseReason,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
} from "@mui/material";


import { useEffect, useState } from "react";

import {
  AttachFile,
  Refresh,
} from "@mui/icons-material";

import UploadMCustomer from "./components/UploadMCustomer";
import MCustomerGrid from "./components/MCustomerGrid";
import useMerchandiserCustomerStore from "../state/merchandiser-customer-store";

const MerchandiserCustomerScreen = () => {
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openImportDialog, setImportDialog] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackBar] = useState(false);

  const isLoading = useMerchandiserCustomerStore((state) => state.isLoading);
  const errorMessage = useMerchandiserCustomerStore((state) => state.error);
  const getMCustomers = useMerchandiserCustomerStore.use.getMCustomer();
  
    async function fetchMCustomer() {
      await getMCustomers()
    }
  
    useEffect(() => {
      fetchMCustomer();
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
    reason?: SnackbarCloseReason
  ) => {
    // do not close the snackbar if the reason is 'clickaway'
    if (reason === "clickaway") {
      return;
    }

    setOpenErrorSnackBar(false);
  };

  const handleImportDialogClick = () => {
    setImportDialog(true);
  };

  const handleImportDialogClose = () => {
    setImportDialog(false);
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
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          width: "100%",
          marginTop: "16px",
        }}
      >
        <IconButton onClick={handleImportDialogClick}>
          <AttachFile />
        </IconButton>
        <IconButton onClick={fetchMCustomer}>
          <Refresh />
        </IconButton>
      </Box>

      <MCustomerGrid />

      <Dialog
        fullScreen={fullScreen}
        maxWidth="md"
        open={openImportDialog}
        onClose={handleImportDialogClose}
        slotProps={{
          paper: {
            sx: {
              width: 400,
              maxWidth: "100%",
            },
          },
        }}
      >
        <DialogTitle>Import Customer</DialogTitle>
        <DialogContent>
          <UploadMCustomer />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleImportDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

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

export default MerchandiserCustomerScreen;
