import { SignupForm, signupSchema } from "@/common/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Box,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slide,
  Snackbar,
  SnackbarCloseReason,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import PasswordFieldComponent from "./components/PasswordFieldComponent";
import { PersonAdd } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useUserStore } from "..";
import { useEffect, useState } from "react";
import PasswordConfirmFieldComponent from "./components/PasswordConfirmFieldComponent";
import { BaseSnackBarComponent } from "@/common/components";
//import { DevTool } from "@hookform/devtools";

const CreateUserPage = () => {
  const [open, setOpen] = useState(false);
  const [openUserCreatedSnackBar, setOpenUserCreatedSnackBar] = useState(false);

  const companies = useUserStore((state) => state.companies);
  const isLoading = useUserStore((state) => state.isLoading);
  const isUserCreated = useUserStore((state) => state.isUserCreated);
  const errorMessage = useUserStore((state) => state.error);
  const getCompanies = useUserStore.use.getCompanies();
  const createUser = useUserStore.use.createUser();

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
    if (isUserCreated) {
      handleUserCreatedSnackbarClick();
    }
  }, [isUserCreated]);

  // fetch companies
  useEffect(() => {
    // fetch companies when the component mounts
    const fetchCompanies = async () => {
      if (!isLoading && companies.length === 0) {
        // Check if it's already loading or data exists
        await getCompanies();
      }
    };
    fetchCompanies();
  }, [isLoading, companies.length, getCompanies]);

  const form = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        companyId: 0,        
    }
  });

  // destructure form
  const { handleSubmit, formState, control } = form;
  // destructure formState
  const { errors, isSubmitting, isValid } = formState;

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    // Convert companyId from string to number before sending to API
    const formattedData = {
      ...data,
      companyId: data.companyId ? parseInt(data.companyId, 10) : undefined,
    };
    await createUser(formattedData);
  };

  const variant = isSubmitting ? "outlined" : "contained";

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Create User
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <Stack spacing={2}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
            <PasswordFieldComponent
              control={control}
              errors={errors}
              id="password"
              lable="Password"
            />
            <PasswordConfirmFieldComponent
              control={control}
              errors={errors}
              id="confirm_password"
              lable="Confirm Password"
            />
            <Controller
              name="companyId"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.companyId}>
                  <InputLabel id="company-label">Company</InputLabel>
                  <Select
                    labelId="company-label"
                    id="companyId"
                    label="Company"
                    {...field}
                  >
                    <MenuItem value="">
                      <em>Please select a company</em>
                    </MenuItem>
                    {companies.map((opt) => (
                      <MenuItem key={opt.id} value={opt.id}>
                        {opt.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.companyId && (
                    <FormHelperText>{errors.companyId.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Stack>
          <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
            <LoadingButton
              loading={isSubmitting}
              startIcon={<PersonAdd />}
              variant={variant}
              disabled={!isValid || isSubmitting}
              type="submit"
            >
              Create User
            </LoadingButton>
          </Stack>
        </Box>
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
            >
              {errorMessage}
            </Alert>
          </Snackbar>
        )}
        {isUserCreated && (
          <BaseSnackBarComponent
            message="User is added successfully."
            autoHideDuration={6000}
            severity="success"
            open={openUserCreatedSnackBar}
            onClose={handleUserCreatedSnackbarClose}
          />
        )}
      </Paper>
    </Container>
  );
};

export default CreateUserPage;
