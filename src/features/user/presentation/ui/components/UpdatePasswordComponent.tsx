import { UpdatePasswordForm, updatePasswordSchema } from "@/common/types";
import UpdatePasswordFieldComponent from "@/features/auth/login/presentation/ui/components/UpdatePasswordFieldComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { Update } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUserStore } from "../..";
import { useEffect, useState } from "react";
import BaseSnackBarComponent from "@/common/components/BaseSnackBar";

const UpdatePasswordComponent = (props: any) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const form = useForm<UpdatePasswordForm>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      userId: props.userId,
      password: "",
    },
  });

  const updatePassword = useUserStore.use.updatePassword();
  const isPasswordUpdated = useUserStore((state) => state.isPasswordUpdated);

  // observe error state and display dialog message
  useEffect(() => {
    if (isPasswordUpdated) {
      handleClickOpen();
    }
  }, [isPasswordUpdated]);

  // destructure form methods
  const { control, handleSubmit, formState } = form;
  // destructure formState
  const { errors } = formState;

  const onSubmit: SubmitHandler<UpdatePasswordForm> = async (
    data: UpdatePasswordForm,
  ) => {
    updatePassword(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={2} sx={{ mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          Update Password
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Password must contain at least one digit, one lowercase letter, one
          uppercase letter, one special character, and be 8-20 characters long
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <UpdatePasswordFieldComponent control={control} errors={errors} />

          <Button
            variant="contained"
            color="primary"
            startIcon={<Update />}
            type="submit"
            sx={{ alignSelf: "flex-start" }} // Optional: aligns button to left
          >
            Update
          </Button>
        </Box>
      </Stack>

      {isPasswordUpdated && (
        <BaseSnackBarComponent
          message={"Password updated successfully!"}
          autoHideDuration={5000}
          severity="success"
          open={open}
          onClose={handleClose}
        />
      )}
    </Box>
  );
};

export default UpdatePasswordComponent;
