import {
  createDeviceSettingSchema,
  CreateDeviceSettingForm,
} from "@/common/types/create-device-setting-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Box,
  Slide,
  Snackbar,
  SnackbarCloseReason,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { PersonAdd } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDeviceSettingStore } from "..";
import { useEffect, useState } from "react";
import { BaseSnackBarComponent } from "@/common/components";

const CreateDeviceSettingPage = () => {
  const [open, setOpen] = useState(false);
  const [openUserCreatedSnackBar, setOpenUserCreatedSnackBar] = useState(false);

  const users = useDeviceSettingStore((state) => state.users);
  const companies = useDeviceSettingStore((state) => state.companies);
  const isDeviceSettingCreated = useDeviceSettingStore(
    (state) => state.isDeviceSettingCreated,
  );
  const errorMessage = useDeviceSettingStore((state) => state.error);
  const createDeviceSetting = useDeviceSettingStore.use.createDeviceSetting();
  const getUsers = useDeviceSettingStore.use.getUsers();
  const getCompanies = useDeviceSettingStore.use.getCompanies();

  // fetch users and companies when the component mounts
  useEffect(() => {
    async function fetchUsers() {
      if (users.length === 0) {
        getUsers();
      }
    }

    async function fetchCompanies() {
      if (companies.length === 0) {
        getCompanies();
      }
    }
    fetchUsers();
    fetchCompanies();
  }, []);

  const handleSnackbarClick = () => {
    setOpen(true);
  };

  const handleUserCreatedSnackbarClick = () => {
    setOpenUserCreatedSnackBar(true);
  };
  const handleSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    // do not close the snackbar if the reason is 'clickaway'
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleUserCreatedSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    // do not close the snackbar if the reason is 'clickaway'
    if (reason === "clickaway") {
      return;
    }

    setOpenUserCreatedSnackBar(false);
  };

  // observe error state and display error message
  useEffect(() => {
    if (errorMessage) {
      handleSnackbarClick();
    }
  }, [errorMessage]);

  // observe user created state and display  message
  useEffect(() => {
    if (isDeviceSettingCreated) {
      handleUserCreatedSnackbarClick();
    }
  }, [isDeviceSettingCreated]);

  const form = useForm<
    z.input<typeof createDeviceSettingSchema>,
    any,
    CreateDeviceSettingForm
  >({
    resolver: zodResolver(createDeviceSettingSchema),
    defaultValues: {
      deviceId: "",
      userId: "",
      userName: "",
      salesPersonCode: "",
      orderNumberFormat: "",
      companyId: "",
    },
  });

  // destructure form
  const { handleSubmit, formState, control, setValue } = form;
  // destructure formState
  const { errors, isSubmitting, isValid } = formState;

  const onSubmit: SubmitHandler<CreateDeviceSettingForm> = async (
    data: CreateDeviceSettingForm,
  ) => {
    await createDeviceSetting(data);
  };

  const variant = isSubmitting ? "outlined" : "contained";

  if (users.length === 0 || companies.length === 0) {
    return (
      <Box
        component={"form"}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
          gap: 1.4,
          p: 2,
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Typography variant="h5">Loading...</Typography>
      </Box>
    );
  } else {
    return (
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "start",
          height: "100vh",
          width: "100vw",
          gap: 1.4,
          p: 2,
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Typography variant="h5">Device Setting</Typography>

        <Box sx={{ marginTop: 2 }}></Box>

        <Controller
          name="deviceId"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="deviceId"
              label="DeviceId"
              type="text"
              variant="outlined"
              required={true}
              autoComplete="deviceId"
              error={!!errors.deviceId} // Set error state
              helperText={errors.deviceId ? errors.deviceId.message : null} // Display error message
              sx={{ width: "100%", maxWidth: 400 }}
            />
          )}
        />

        <Controller
          name="userId"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="userId"
              type="text"
              variant="outlined"
              select
              required={true}
              slotProps={{
                select: {
                  native: true,
                },
              }}
              error={!!errors.userId} // Set error state
              helperText={errors.userId ? errors.userId.message : null} // Display error message
              sx={{ width: "100%", maxWidth: 400 }}
              onChange={(e) => {
                const selectedUser = users.find(
                  (user) => user.id === parseInt(e.target.value, 10),
                );
                if (selectedUser) {
                  setValue("userName", selectedUser?.name);
                }
                field.onChange(e);
              }}
            >
              <option aria-label="None" value="">
                Please select a user
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </TextField>
          )}
        />

        <Controller
          name="userName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="userName"
              type="text"
              variant="outlined"
              required={true}
              disabled
              error={!!errors.userName} // Set error state
              helperText={errors.userName ? errors.userName.message : null} // Display error message
              sx={{ width: "100%", maxWidth: 400 }}
            />
          )}
        />

        <Controller
          name="salesPersonCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="salesPersonCode"
              label="Sales Person Code"
              type="text"
              variant="outlined"
              required={true}
              autoComplete="salesPersonCode"
              error={!!errors.salesPersonCode} // Set error state
              helperText={
                errors.salesPersonCode ? errors.salesPersonCode.message : null
              } // Display error message
              sx={{ width: "100%", maxWidth: 400 }}
            />
          )}
        />

        <Controller
          name="orderNumberFormat"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="orderNumberFormat"
              label="Order Number Format"
              type="text"
              variant="outlined"
              required={true}
              autoComplete="orderNumberFormat"
              error={!!errors.orderNumberFormat} // Set error state
              helperText={
                errors.orderNumberFormat
                  ? errors.orderNumberFormat.message
                  : null
              } // Display error message
              sx={{ width: "100%", maxWidth: 400 }}
            />
          )}
        />

        <Controller
          name="companyId"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="companyId"
              type="text"
              select
              slotProps={{
                select: {
                  native: true,
                },
              }}
              helperText={errors.companyId ? errors.companyId.message : null}
              sx={{ width: "100%", maxWidth: 400 }}
            >
              <option aria-label="None" value="">
                Please select a company
              </option>
              {companies.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </TextField>
          )}
        />

        <LoadingButton
          loading={isSubmitting}
          loadingPosition="center"
          startIcon={<PersonAdd />}
          variant={variant}
          disabled={!isValid || isSubmitting}
          type="submit"
          sx={{
            width: "100%",
            maxWidth: 250,
            marginTop: 2,
            backgroundColor: "primary.main",
            "&:hover": {
              backgroundColor: "secondary.main",
            },
          }}
        >
          Create Device Setting
        </LoadingButton>

        {/* Display global error */}
        {errorMessage && (
          <Snackbar
            open={open}
            autoHideDuration={6000}
            TransitionComponent={Slide}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            onClose={handleSnackbarClose}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity="error"
              variant="filled"
              sx={{ width: "100%" }}
            >
              {errorMessage}
            </Alert>
          </Snackbar>
        )}

        {isDeviceSettingCreated && (
          <BaseSnackBarComponent
            message={"Device Setting is added successfully."}
            autoHideDuration={6000}
            severity="success"
            open={openUserCreatedSnackBar}
            onClose={handleUserCreatedSnackbarClose}
          />
        )}
      </Box>
    );
  }
};

export default CreateDeviceSettingPage;
