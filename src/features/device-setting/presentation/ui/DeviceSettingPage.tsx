import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const DeviceSettingPage = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default DeviceSettingPage;
