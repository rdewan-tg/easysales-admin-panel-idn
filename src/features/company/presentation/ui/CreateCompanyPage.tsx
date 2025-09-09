import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  CreateCompanyForm,
  createCompanySchema,
} from "../../domain/create-company-form";
import { mapCreateCompanyFormToDto } from "../../domain";
import { useCompanyStore } from "..";
import { ArrowBack } from "@mui/icons-material";
import React, { useEffect } from "react";
import { useCountryStore } from "@/features/country/presentation";
import { useNavigate } from "react-router-dom";
import { routeName } from "@/core/route";
import { NotificationSnackbar } from "@/common/components";
// import { DevTool } from "@hookform/devtools";

const CreateCompanyPage = () => {
  const navigate = useNavigate();

  const createCompany = useCompanyStore.use.createCompany();
  const errorMessage = useCompanyStore((state) => state.error);
  const isCreated = useCompanyStore((state) => state.isCreated);

  const countries = useCountryStore((state) => state.countries);
  const getCountries = useCountryStore.use.getCountries();

  useEffect(() => {
    // fetch countries when the component mounts
    const fetchCountries = async () => {
      if (countries.length === 0) {
        // Check if it's already loading or data exists
        await getCountries();
      }
    };
    fetchCountries();
  }, []);

  // Use type assertion to ensure the resolver matches the expected type
  const form = useForm<CreateCompanyForm>({
    resolver: zodResolver(createCompanySchema) as any,
    mode: "onChange",
    defaultValues: {
      name: "",
      address: "",
      email: "",
      phone: "",
      countryId: "",
      companyCode: "",
      companySetting: {
        currencyCode: "",
        timeZone: "",
        isSiteVisitEnabled: false,
      },
    },
  });

  // destructure form
  const { handleSubmit, formState, control, setValue } = form;
  // destructure formState
  const { errors, isSubmitting, isValid } = formState;

  const onSubmit: SubmitHandler<CreateCompanyForm> = async (
    formData: CreateCompanyForm
  ) => {
    const data = mapCreateCompanyFormToDto(formData);
    createCompany(data);
  };

  const handleGoBack = () => {
    navigate(`/${routeName.dashboard}/${routeName.companies}`);
  };

  return (
    <Box component={"main"}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: { xs: "8px", sm: "12px", md: "16px" },
          flexWrap: "wrap",
          gap: 1,
          width: "100%",
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        <Tooltip title="Back to Companies">
          <IconButton color="primary" onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
        </Tooltip>
      </Box>
      <Container maxWidth="md" sx={{ py: 2 }}>
        <Paper
          elevation={2}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              bgcolor: "primary.main",
              color: "primary.contrastText",
            }}
          >
            <Typography variant="h5" component="h1">
              Create Company
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              p: 3,
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Company Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Box>

            <Stack spacing={2.5}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    id="name"
                    label="Company Name"
                    type="text"
                    variant="outlined"
                    required
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
                    fullWidth
                    id="email"
                    label="Email Address"
                    type="email"
                    variant="outlined"
                    required
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    id="phone"
                    label="Phone Number"
                    type="tel"
                    variant="outlined"
                    required
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                )}
              />
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    id="address"
                    label="Address"
                    type="text"
                    variant="outlined"
                    required
                    multiline
                    rows={2}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                )}
              />

              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Location & Settings
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Box>
              <Controller
                name="countryId"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    id="country_id"
                    label="Country"
                    variant="outlined"
                    required
                    error={!!errors.countryId}
                    helperText={errors.countryId?.message}
                    onChange={(e) => {
                      // find the selected country
                      const selectedCountry = countries.find(
                        (country) => country.id.toString() === e.target.value
                      );
                      if (selectedCountry) {
                        setValue("countryId", selectedCountry.id.toString());
                        setValue("companyCode", selectedCountry.companyCode);
                        setValue(
                          "companySetting.currencyCode",
                          selectedCountry.currencyCode
                        );
                        setValue(
                          "companySetting.timeZone",
                          selectedCountry.timeZone
                        );
                      }
                      field.onChange(e);
                    }}
                  >
                    <MenuItem value="">
                      <em>Select a country</em>
                    </MenuItem>
                    {countries.map((country) => (
                      <MenuItem key={country.name} value={country.id.toString()}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />              
              <Controller
                control={control}
                name="companyCode"
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    id="company_code"
                    label="Company Code"
                    variant="outlined"
                    error={!!errors.companyCode}
                    helperText={errors.companyCode?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="companySetting.currencyCode"
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    id="currency_code"
                    label="Currency Code"
                    variant="outlined"
                    disabled
                    error={!!errors.companySetting?.currencyCode}
                    helperText={errors.companySetting?.currencyCode?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="companySetting.timeZone"
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    id="time_zone"
                    label="Time Zone"
                    variant="outlined"
                    error={!!errors.companySetting?.timeZone}
                    helperText={errors.companySetting?.timeZone?.message}
                  />
                )}
              />
              
              <Controller
                control={control}
                name="companySetting.isSiteVisitEnabled"
                render={({ field }) => (
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Typography variant="body1" sx={{ mr: 2 }}>
                      Enable Site Visit
                    </Typography>
                    <Switch
                      {...field}
                      checked={field.value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(e.target.checked)}
                      color="primary"
                    />
                  </Box>
                )}
              />

              <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleGoBack}
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    boxShadow: 2,
                    textTransform: "none",
                  }}
                >
                  Cancel
                </Button>
                <Box sx={{ mr: 2 }} />
                <Button
                  loading={isSubmitting}
                  loadingPosition="start"
                  variant="contained"
                  disabled={isSubmitting || !isValid}
                  type="submit"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    boxShadow: 2,
                    textTransform: "none",
                  }}
                >
                  Create Company
                </Button>
              </Box>
            </Stack>
          </Box>
        </Paper>

        <NotificationSnackbar
          isSuccess={isCreated === true}
          successMessage="Company created successfully"
          error={errorMessage || undefined}
        />
      </Container>
    </Box>
  );
};

export default CreateCompanyPage;
