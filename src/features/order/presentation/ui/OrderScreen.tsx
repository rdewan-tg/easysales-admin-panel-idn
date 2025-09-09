import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const OrderScreen = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default OrderScreen;
