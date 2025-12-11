import { useForm } from "react-hook-form";
import {
  uploadCustomerSchema,
  UploadCustomerSchema,
} from "../../schemas/upload-customer.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
} from "@mui/material";
import { AttachFile } from "@mui/icons-material";
import useMerchandiserCustomerStore from "../../state/merchandiser-customer-store";

const UploadMCustomer = () => {
  const uploadMCustomer = useMerchandiserCustomerStore.use.uploadMCustomer();

  const { handleSubmit, formState, watch, register, setValue } =
    useForm<UploadCustomerSchema>({
      resolver: zodResolver(uploadCustomerSchema),
      mode: "onChange",
      defaultValues: {
        file: undefined,
      },
    });
  // destructure form state
  const { errors, isValid, isSubmitting } = formState;

  const selectedFile = watch("file");

  const onSubmit = async (data: UploadCustomerSchema) => {
    await uploadMCustomer(data);
  };

  return (
    <Box>
      <FormControl fullWidth error={!!errors}>
        <IconButton component="label" color="primary" disableRipple>
          <AttachFile />
          <input
            type="file"
            hidden
            accept=".xlsx, .xls"
            {...register("file")}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setValue("file", file, { shouldValidate: true });
              }
            }}
          />
        </IconButton>

        {selectedFile && (
          <FormHelperText error={false}>{selectedFile.name}</FormHelperText>
        )}

        {errors.file && (
          <FormHelperText error={true}>{errors.file.message}</FormHelperText>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid || isSubmitting}
        >
          Upload
        </Button>
      </FormControl>
      <Box sx={{ mt: 2 }} />
    </Box>
  );
};

export default UploadMCustomer;
