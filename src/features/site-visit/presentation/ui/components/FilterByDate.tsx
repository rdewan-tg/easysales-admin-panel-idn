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

import { format } from "date-fns";
import { FilterByDatesForm, filterByDatesSchema } from "@/common/types";


const FilterByDate = ({
  open,
  close,
  title,
  description,
  onFilter,
}: {
  open: boolean;
  close: () => void;
  title: string;
  description: string;
  onFilter: (fromDate: string, toDate: string) => Promise<void>;
}) => {
  const form = useForm<FilterByDatesForm>({
    resolver: zodResolver(filterByDatesSchema),
    defaultValues: {
      fromDate: new Date(),
      toDate: new Date(),
    },
  });

  const { control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit: SubmitHandler<FilterByDatesForm> = async (
    data: FilterByDatesForm
  ) => {
    // Create date objects
    const startDate = new Date(data.fromDate);
    const endDate = new Date(data.toDate);

    // Set start time to beginning of day (00:00:00)
    startDate.setHours(0, 0, 0, 0);

    // Set end time to end of day (23:59:59)
    endDate.setHours(23, 59, 59, 999);

    const payload = {
      fromDate: format(startDate, "yyyy-MM-dd"),
      toDate: format(endDate, "yyyy-MM-dd"),
    };

    onFilter(payload.fromDate, payload.toDate);
    // close the dialog
    close();
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Dialog
        open={open}
        onClose={close}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontSize: "1.25rem",
            fontWeight: 500,
            pb: 1,
            pt: 2.5,
            px: 3,
          }}
        >
          {title}
        </DialogTitle>
        <DialogContent sx={{ px: 3, py: 2 }}>
          {description && (
            <DialogContentText sx={{ mb: 2 }}>{description}</DialogContentText>
          )}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 1 }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
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
                        size: "medium",
                        error: !!errors.fromDate,
                        helperText: errors.fromDate?.message,
                        sx: {
                          flex: 1,
                          minWidth: "160px",
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                            height: "48px",
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: "primary.main",
                              borderWidth: "1px",
                            },
                          },
                        },
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
                        size: "medium",
                        error: !!errors.toDate,
                        helperText: errors.toDate?.message,
                        sx: {
                          flex: 1,
                          minWidth: "160px",
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                            height: "48px",
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: "primary.main",
                              borderWidth: "1px",
                            },
                          },
                        },
                      },
                    }}
                  />
                )}
              />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
          <Button
            onClick={close}
            sx={{
              borderRadius: "20px",
              textTransform: "none",
              fontWeight: 500,
              px: 3,
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={() => handleSubmit(onSubmit)()}
            sx={{
              borderRadius: "20px",
              textTransform: "none",
              fontWeight: 500,
              px: 3,
              boxShadow: 2,
              "&:hover": {
                boxShadow: 4,
              },
            }}
          >
            Apply Filter
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FilterByDate;
