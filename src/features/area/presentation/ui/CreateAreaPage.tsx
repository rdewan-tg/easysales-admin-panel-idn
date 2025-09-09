import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Paper,
  Container,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateAreaForm,
  createAreaFormSchema,
} from "@/common/types/create-area-form";
import { useCompanyStore } from "@/features/company/presentation";
import { useEffect } from "react";
import { useAreaStore } from "../";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { NotificationSnackbar } from "@/common/components";

const CreateAreaPage = () => {
  const navigate = useNavigate();
  const companies = useCompanyStore((state) => state.companies);
  const getCompanies = useCompanyStore.use.getCompanies();

  const createArea = useAreaStore.use.createArea();
  const isCreated = useAreaStore((state) => state.isCreated);
  const error = useAreaStore((state) => state.error);

  useEffect(() => {
    async function fetchCompanies() {
      await getCompanies();
    }
    fetchCompanies();
  }, []);



  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CreateAreaForm>({
    resolver: zodResolver(createAreaFormSchema),
    defaultValues: {
      name: "",
      code: "",
      companyId: 0,
    },
  });

  const onSubmit: SubmitHandler<CreateAreaForm> = (data) => {
    createArea(data);
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
        <Tooltip title="Back to Areas">
          <IconButton color="primary" onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
        </Tooltip>
      </Box>

      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            Create New Area
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 2 }}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Area Name"
                  fullWidth
                  margin="normal"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />

            <Controller
              name="code"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Area Code"
                  fullWidth
                  margin="normal"
                  error={!!errors.code}
                  helperText={errors.code?.message}
                />
              )}
            />

            <Controller
              name="companyId"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Company"
                  fullWidth
                  margin="normal"
                  error={!!errors.companyId}
                  helperText={errors.companyId?.message}
                >
                  <MenuItem value="" disabled>
                    Select a company
                  </MenuItem>
                  {companies.map((company) => (
                    <MenuItem key={company.id} value={company.id}>
                      {company.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Box
              sx={{
                mt: 3,
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting || !isValid}
              >
                Create Area
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
      <NotificationSnackbar 
        isSuccess={!!isCreated} 
        successMessage="Area is added successfully."
        error={error || undefined}
      />
    </Box>
  );
};

export default CreateAreaPage;
