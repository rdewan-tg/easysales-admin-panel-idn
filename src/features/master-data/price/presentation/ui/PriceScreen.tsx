import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const PriceScreen = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default PriceScreen;
