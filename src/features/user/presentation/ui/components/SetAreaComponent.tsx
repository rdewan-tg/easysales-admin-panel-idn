import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useUserStore } from "../..";
import {
  NotificationSnackbar,   
} from "@/common/components";
import { useAreaStore } from "@/features/area/presentation";

const SetAreaComponent = () => {
 

  const areas = useAreaStore((state) => state.areas);
  const selectedArea = useAreaStore((state) => state.selectedArea);
  const setUserArea = useAreaStore.use.setUserArea();
  const getAreas = useAreaStore.use.getAreas();
  const user = useUserStore((state) => state.user);
  const isAreaAdded = useAreaStore((state) => state.isUserAreaSet);
  const isAreaDeleted = useAreaStore((state) => state.isUserAreaRemoved);
  const error = useAreaStore((state) => state.error);

  useEffect(() => {
    const fetchAreas = async () => {
      if (areas.length === 0) {
        // call only if areas are empty
        await getAreas();
      }
    };

    fetchAreas();
  });



  const handleAreaChange = (event: SelectChangeEvent) => {
    const newArea = event.target.value;
    setUserArea(Number(user?.id), Number(newArea));
  };


  return (
    <Box>
      <Typography variant="h6" component="div" gutterBottom>
        Set User Area
      </Typography>
      <FormControl
        id="area-form"
        required
        sx={{ m: 1, minWidth: 160 }}
        size="small"
      >
        <InputLabel id="select-area-label">Area</InputLabel>
        <Select
          id="area-select"
          name="area"
          labelId="select-area-label"
          value={selectedArea ? selectedArea : ""}
          label="Area *"
          onChange={handleAreaChange}
        >
          {areas.map((area, index) => (
            <MenuItem key={index} value={area.id}>
              {area.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Snackbar component  when area is added / removed from user */}
      
      <NotificationSnackbar
        isSuccess={!!isAreaAdded}
        isDeleted={!!isAreaDeleted}
        successMessage="Area added successfully"
        deleteMessage="Area deleted successfully"
        error={error || undefined}
      />
    </Box>
  );
};

export default SetAreaComponent;
