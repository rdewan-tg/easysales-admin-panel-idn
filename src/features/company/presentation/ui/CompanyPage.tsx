import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const CompanyPage = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default CompanyPage;
