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
import { useOrderStore } from "../..";
import {
  GetOrderCreatedDatesForm,
  getOrderCreatedDatesSchema,
} from "@/common/types/get-order-created-date-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { startOfDay, endOfDay, formatISO } from "date-fns";

const OrderFilterByDate = ({
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
  const getOrderCreatedDates = useOrderStore.use.getOrderCreatedDates();
  const getSalesHeaderByCompanyDateRange =
    useOrderStore.use.getSalesHeaderByCompanyDateRange();

  useEffect(() => {
    async function fetchCreatedDates() {
      await getOrderCreatedDates();
    }
    fetchCreatedDates();
  }, []);

  const form = useForm<GetOrderCreatedDatesForm>({
    resolver: zodResolver(getOrderCreatedDatesSchema),
  });

  const { control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit: SubmitHandler<GetOrderCreatedDatesForm> = async (
    data: GetOrderCreatedDatesForm,
  ) => {
    const payload = {
      startDate: formatISO(startOfDay(new Date(data.startDate)).toISOString(), {
        representation: "complete",
      }).replace(/\+\d{2}:\d{2}$/, "Z"),
      endDate: formatISO(endOfDay(new Date(data.endDate)).toISOString(), {
        representation: "complete",
      }).replace(/\+\d{2}:\d{2}$/, "Z"),
    };
    getSalesHeaderByCompanyDateRange(payload);
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
            name="startDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="From Date"
                format="dd/MM/yyyy"
                slotProps={{
                  textField: {
                    size: "small",
                    error: !!errors.startDate,
                    helperText: errors.startDate?.message,
                    sx: { width: "100%", maxWidth: 200, margin: 1 },
                  },
                }}
              />
            )}
          />

          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="To Date"
                format="dd/MM/yyyy"
                slotProps={{
                  textField: {
                    size: "small",
                    error: !!errors.endDate,
                    helperText: errors.endDate?.message,
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

export default OrderFilterByDate;
