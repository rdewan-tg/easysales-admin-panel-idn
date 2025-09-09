import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Typography,
  Backdrop,
  Grid,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { UpdateRounded } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useUserStore } from "..";
import { UpdateUserDto } from "../../data";
import { BaseSnackBarComponent } from "../../../../common/components";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserFormValues, updateUserSchema } from "@/common/types/update-user-form";


const UpdateUserPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const user = useUserStore((state) => state.user);
  const isLoading = useUserStore((state) => state.isLoading);
  const isUserUpdated = useUserStore((state) => state.isUserUpdated);
  const error = useUserStore((state) => state.error);

  const getUserById = useUserStore.use.getUserById();
  const updateUser = useUserStore.use.updateUser();

  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Initialize React Hook Form
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<UpdateUserFormValues>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
    },
  });

  // Fetch user data
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await getUserById(Number(id));
      }
    };
    fetchData();
  }, [id, getUserById]);

  // Reset form with user data when available
  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",       
        phoneNumber: user.phoneNumber || "",
      });
    }
  }, [user, reset]);

  // Show snackbar on update success or error
  useEffect(() => {
    if (isUserUpdated || error) {
      setOpenSnackbar(true);
    }
  }, [isUserUpdated, error]);

  // Form submission handler
  const onSubmit = async (data: UpdateUserFormValues) => {
    // Create the base DTO with required fields
    const updateUserDto: UpdateUserDto = {
      id: Number(id),
      name: data.name,
      email: data.email,
    };
    
    // Only add phoneNumber if it's not empty
    // This way it will be omitted from the request if empty
    if (data.phoneNumber && data.phoneNumber.trim() !== '') {
      updateUserDto.phoneNumber = data.phoneNumber;
    }

    await updateUser(updateUserDto);
  };

  // Snackbar close handler
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);

    if (isUserUpdated) {
      navigate(-1);
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, m: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate(-1)}
          sx={{ 
            textTransform: 'none', 
            borderRadius: 2,
            '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.04)' }
          }}
        >
          Back
        </Button>
      </Box>

      {isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="primary" />
        </Backdrop>
      )}

      <Card 
        sx={{ 
          maxWidth: 600, 
          margin: "auto", 
          p: 4, 
          borderRadius: 3,
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
        }}
      >
        <Typography 
          variant="h5" 
          gutterBottom 
          sx={{ 
            fontWeight: 500, 
            mb: 3,
            color: (theme) => theme.palette.text.primary 
          }}
        >
          Edit User Information
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid size={12}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Name"
                    variant="outlined"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    margin="normal"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderWidth: 2,
                        },
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '0.875rem',
                      },
                    }}
                  />
                )}
              />
            </Grid>

            <Grid size={12}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email"
                    type="email"
                    variant="outlined"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    margin="normal"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderWidth: 2,
                        },
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '0.875rem',
                      },
                    }}
                  />
                )}
              />
            </Grid>

            <Grid size={12}>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Phone Number (Optional)"
                    variant="outlined"
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                    margin="normal"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderWidth: 2,
                        },
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '0.875rem',
                      },
                    }}
                  />
                )}
              />
            </Grid>
            
            <Grid size={12} sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
              <LoadingButton
                variant="contained"
                endIcon={<UpdateRounded />}
                type="submit"
                loading={isLoading}
                loadingPosition="end"
                disabled={!isValid || isLoading}
                sx={{ 
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 500,
                  px: 3,
                  py: 1.2,
                  boxShadow: 2,
                  '&:hover': {
                    boxShadow: 4,
                  },
                }}
              >
                {isLoading ? "Updating..." : "Update User"}
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Card>

      <BaseSnackBarComponent
        message={error || "User updated successfully!"}
        autoHideDuration={6000}
        severity={error ? "error" : "success"}
        open={openSnackbar}
        onClose={handleSnackbarClose}
      />
    </Box>
  );
};

export default UpdateUserPage;
