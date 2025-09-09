import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";

const PhotoScreen = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default PhotoScreen;
