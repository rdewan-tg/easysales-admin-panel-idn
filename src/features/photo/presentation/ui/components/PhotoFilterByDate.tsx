import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  GetPhotoByDatesForm,
  getPhotoByDatesSchema,
} from "@/common/types/get-photo-by-date-form";
import { usePhotoStore } from "../..";
import { formatISO } from "date-fns";

const PhotoFilterByDate = ({
  open,
  close,
  title,
  description,
}: {
  open: boolean;
  close: () => void;
  title: string;
  description: string;
}) => {
  const findPhotosByFromToDate = usePhotoStore.use.findPhotosByFromToDate();

  const form = useForm<GetPhotoByDatesForm>({
    resolver: zodResolver(getPhotoByDatesSchema),
  });

  const { control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit: SubmitHandler<GetPhotoByDatesForm> = async (
    data: GetPhotoByDatesForm,
  ) => {
    const payload = {
      fromDate: formatISO(new Date(data.fromDate), { representation: "date" })
        .split("-")
        .reverse()
        .join("-"),
      toDate: formatISO(new Date(data.toDate), { representation: "date" })
        .split("-")
        .reverse()
        .join("-"),
    };
    findPhotosByFromToDate(payload.fromDate, payload.toDate);
    // close the dialog
    close();
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Dialog open={open} onClose={close}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>

          <Controller
            name="fromDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="From Date"
                format="dd/MM/yyyy"
                slotProps={{
                  textField: {
                    size: "small",
                    error: !!errors.fromDate,
                    helperText: errors.fromDate?.message,
                    sx: { width: "100%", maxWidth: 200, margin: 1 },
                  },
                }}
              />
            )}
          />

          <Controller
            name="toDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="To Date"
                format="dd/MM/yyyy"
                slotProps={{
                  textField: {
                    size: "small",
                    error: !!errors.toDate,
                    helperText: errors.toDate?.message,
                    sx: { width: "100%", maxWidth: 200, margin: 1 },
                  },
                }}
              />
            )}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={close}>Close</Button>
          <Button type="submit" onClick={() => handleSubmit(onSubmit)()}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PhotoFilterByDate;
