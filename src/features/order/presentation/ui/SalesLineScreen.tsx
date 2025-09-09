import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";


const SalesLineScreen = () => {
    return (
        <Box>
            <Outlet />
        </Box>
    );
};

export default SalesLineScreen;