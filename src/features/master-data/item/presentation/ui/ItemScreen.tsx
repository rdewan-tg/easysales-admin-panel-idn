import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const ItemScreen = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default ItemScreen;
