import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const CountryPage = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default CountryPage;
