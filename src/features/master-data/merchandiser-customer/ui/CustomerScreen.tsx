import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const CustomerScreen = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default CustomerScreen;
