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
import { CreateCountryForm, createCountrySchema } from "../../domain";
import { mapCreateCountryFormToDto } from "../../domain/map-create-country-form-to-dto";
import { useCountryStore } from "..";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { AddLocationAltOutlined } from "@mui/icons-material";
import { DevTool } from "@hookform/devtools";
import { useEffect, useState } from "react";
import { BaseSnackBarComponent } from "@/common/components";

const CreateCountryPage = () => {
  const [open, setOpen] = useState(false);
  const [openCountryCreatedSnackBar, setCountryCreatedSnackBar] =
    useState(false);
  const createCountry = useCountryStore.use.createCountry();
  const errorMessage = useCountryStore((state) => state.error);
  const isCountryCreated = useCountryStore((state) => state.isCountryCreated);

  // observe error state and display error message
  useEffect(() => {
    if (errorMessage) {
      handleErrorSnackbarClick();
    }
  }, [errorMessage]);

  // observe user created state and display  message
  useEffect(() => {
    if (isCountryCreated) {
      handleUserCreatedSnackbarClick();
    }
  }, [isCountryCreated]);

  const form = useForm<CreateCountryForm>({
    resolver: zodResolver(createCountrySchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      countryCode: "",
      currencyCode: "",
    },
  });
  // destructure form
  const { handleSubmit, formState, control } = form;
  // destructure formState
  const { errors, isSubmitting } = formState;

  const handleErrorSnackbarClick = () => {
    setOpen(true);
  };

  const handleUserCreatedSnackbarClick = () => {
    setCountryCreatedSnackBar(true);
  };

  const handleErrorSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    // do not close the snackbar if the reason is 'clickaway'
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleCreateCountrySnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    // do not close the snackbar if the reason is 'clickaway'
    if (reason === "clickaway") {
      return;
    }

    setCountryCreatedSnackBar(false);
  };

  const onSubmit: SubmitHandler<CreateCountryForm> = async (
    formData: CreateCountryForm,
  ) => {
    const data = mapCreateCountryFormToDto(formData);
    createCountry(data);
  };
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
      <Typography variant="h3">Create Country</Typography>

      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <TextField
            {...field}
            id="name"
            label="Name"
            type="name"
            variant="outlined"
            required={true}
            error={!!errors.name} // Set error state
            helperText={errors.name ? errors.name.message : "e.g. Singapore"} // Display error message
            sx={{ width: "100%", maxWidth: 400 }}
          />
        )}
      />

      <Controller
        control={control}
        name="countryCode"
        render={({ field }) => (
          <TextField
            {...field}
            id="country-code"
            label="Country Code"
            type="text"
            variant="outlined"
            required={true}
            error={!!errors.countryCode} // Set error state
            helperText={
              errors.countryCode ? errors.countryCode.message : "e.g. SG"
            } // Display error message
            sx={{ width: "100%", maxWidth: 400 }}
          />
        )}
      />      

      <Controller
        control={control}
        name="currencyCode"
        render={({ field }) => (
          <TextField
            {...field}
            id="currency-code"
            label="Currency Code"
            type="text"
            variant="outlined"
            required={true}
            error={!!errors.currencyCode} // Set error state
            helperText={
              errors.currencyCode ? errors.currencyCode.message : "e.g. SGD"
            } // Display error message
            sx={{ width: "100%", maxWidth: 400 }}
          />
        )}
      />

      
      <LoadingButton
        loading={isSubmitting}
        loadingPosition="center"
        startIcon={<AddLocationAltOutlined />}
        variant={"contained"}
        disabled={isSubmitting}
        type="submit"
        sx={{
          width: "100%",
          maxWidth: 180,
          marginTop: 2,
          backgroundColor: "primary.main",
          "&:hover": {
            backgroundColor: "secondary.main",
          },
        }}
      >
        Create
      </LoadingButton>
      <DevTool control={control} />

      {/* Display global error */}
      {errorMessage && (
        <Snackbar
          open={open}
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

      {isCountryCreated && (
        <BaseSnackBarComponent
          message={"Country created successfully."}
          autoHideDuration={6000}
          severity="success"
          open={openCountryCreatedSnackBar}
          onClose={handleCreateCountrySnackbarClose}
        />
      )}
    </Box>
  );
};

export default CreateCountryPage;
