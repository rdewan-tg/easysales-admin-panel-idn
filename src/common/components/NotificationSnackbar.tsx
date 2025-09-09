import React, { useState, useEffect } from 'react';
import { SnackbarCloseReason } from '@mui/material';
import BaseSnackBarComponent from './BaseSnackBar';

type NotificationSnackbarProps = {
  isSuccess?: boolean;
  isUpdated?: boolean;
  isDeleted?: boolean;
  successMessage?: string;
  updateMessage?: string;
  deleteMessage?: string;
  error?: string | null;
  autoHideDuration?: number;
};

export const NotificationSnackbar: React.FC<NotificationSnackbarProps> = ({
  isSuccess = false,
  isUpdated = false,
  isDeleted = false,
  successMessage = "Operation completed successfully",
  updateMessage = "Updated successfully",
  deleteMessage = "Deleted successfully",
  error = null,
  autoHideDuration = 6000
}) => {
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "info"
  });

  const handleSnackbarClose = (_event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") return;
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  useEffect(() => {
    if (isSuccess) {
      setSnackbar({
        open: true,
        message: successMessage,
        severity: "success"
      });
    } else if (isUpdated) {
      setSnackbar({
        open: true,
        message: updateMessage,
        severity: "success"
      });
    } else if (isDeleted) {
      setSnackbar({
        open: true,
        message: deleteMessage,
        severity: "success"
      });
    } else if (error) {
      setSnackbar({
        open: true,
        message: `Error: ${error}`,
        severity: "error"
      });
    }
  }, [isSuccess, isUpdated, isDeleted, error, successMessage, updateMessage, deleteMessage]);

  return (
    <BaseSnackBarComponent
      message={snackbar.message}
      autoHideDuration={autoHideDuration}
      severity={snackbar.severity}
      open={snackbar.open}
      onClose={handleSnackbarClose}
    />
  );
};
