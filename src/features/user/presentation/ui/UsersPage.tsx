import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const UsersPage = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default UsersPage;
